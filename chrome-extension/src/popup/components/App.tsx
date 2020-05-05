import * as React from "react";

import "firebase/auth";
import * as firebase from "firebase/app";

import "../../assets/styles/styles.scss";
import { ActionWithPayload, Block, RecState } from "../../types";
import { ControlAction } from "../../constants";
import { firebaseConfig } from "../config";
import { useFirebaseAuthState } from "../hooks";
import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import SelectProject from "./SelectProject";

firebase.initializeApp(firebaseConfig);

const App: React.FC = () => {
  const [recStatus, setRecStatus] = React.useState<RecState>("off");
  const [codeBlocks, setCodeBlocks] = React.useState<Block[]>([]);
  const [isValidTab, setIsValidTab] = React.useState<boolean>(true);
  const [activeProject, setActiveProject] = React.useState<
    string | undefined
  >();

  React.useEffect(() => {
    chrome.storage.local.get("activeProject", items => {
      if (items.activeProject !== activeProject)
        chrome.storage.local.set({ activeProject });
    });
  }, [activeProject]);

  const authState = useFirebaseAuthState();

  const startRecording = (): void => {
    setRecStatus("on");
  };
  const stopRecording = (): void => {
    setRecStatus("paused");
  };
  const resetRecording = (): void => {
    setRecStatus("off");
    setCodeBlocks([]);
  };

  React.useEffect((): void => {
    chrome.storage.local.get(
      ["status", "codeBlocks", "activeProject"],
      result => {
        if (result.codeBlocks) setCodeBlocks(result.codeBlocks);
        if (result.status === "on") setRecStatus("on");
        else if (result.status === "paused") setRecStatus("paused");
        if (result.activeProject) setActiveProject(result.activeProject);
      }
    );
    chrome.tabs.query({ active: true, currentWindow: true }, activeTab => {
      if (activeTab[0].url.startsWith("chrome://")) setIsValidTab(false);
    });
  }, []);

  React.useEffect((): (() => void) => {
    function handleMessageFromBackground({
      type,
      payload,
    }: ActionWithPayload): void {
      if (type === ControlAction.START && isValidTab) startRecording();
      else if (type === ControlAction.STOP) stopRecording();
      else if (type === ControlAction.RESET) resetRecording();
      else if (type === ControlAction.PUSH)
        setCodeBlocks(blocks => [...blocks, payload]);
    }
    chrome.runtime.onMessage.addListener(handleMessageFromBackground);
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessageFromBackground);
    };
  }, []);

  const handleToggle = (action: ControlAction): void => {
    if (action === ControlAction.START) startRecording();
    else if (action === ControlAction.STOP) stopRecording();
    else if (action === ControlAction.RESET) resetRecording();
    chrome.runtime.sendMessage({ type: action });
  };

  const destroyBlock = (index: number): void => {
    setCodeBlocks(prevBlocks => prevBlocks.filter((block, i) => i !== index));
    chrome.runtime.sendMessage({
      type: ControlAction.DELETE,
      payload: index,
    });
  };

  const moveBlock = (dragIdx: number, dropIdx: number): void => {
    const temp = [...codeBlocks];
    const dragged = temp.splice(dragIdx, 1)[0];
    temp.splice(dropIdx, 0, dragged);
    setCodeBlocks(temp);
    chrome.runtime.sendMessage({
      type: ControlAction.MOVE,
      payload: { dragIdx, dropIdx },
    });
  };

  return (
    <div id="App">
      <Header activeProject={activeProject} />
      {authState === "in" ? (
        !activeProject ? (
          <SelectProject
            activeProject={activeProject}
            onChangeProject={setActiveProject}
          />
        ) : (
          <Body
            codeBlocks={codeBlocks}
            recStatus={recStatus}
            isValidTab={isValidTab}
            destroyBlock={destroyBlock}
            moveBlock={moveBlock}
          />
        )
      ) : authState === "loading" ? (
        "loading"
      ) : (
        <div id="body">
          <Login />
        </div>
      )}
      <Footer
        isValidTab={isValidTab}
        recStatus={recStatus}
        handleToggle={handleToggle}
        triggerUpload={() => null}
        countOfCommands={codeBlocks.length}
      />
    </div>
  );
};

export default App;
