import * as React from "react";

import "firebase/auth";
import * as firebase from "firebase/app";

import "../../assets/styles/styles.scss";
import { ActionWithPayload, RecState } from "../../types";
import { ControlAction } from "../../constants";
import { firebaseConfig } from "../config";
import { read } from "../../helpers/model";
import { useFirebaseAuthState } from "../hooks";
import Header from "./Header";
import Login from "./Login";
import SelectProject from "./SelectProject";
import ToggleButton from "./ToggleButton";

firebase.initializeApp(firebaseConfig);

const App: React.FC = () => {
  const [recStatus, setRecStatus] = React.useState<RecState>("off");
  const [isValidTab, setIsValidTab] = React.useState<boolean>(true);
  const [activeProject, setActiveProject] = React.useState<
    string | undefined
  >();
  const [countOfBlocks, setCountOfBlocks] = React.useState<number>(0);
  const [countOfEdges, setCountOfEdges] = React.useState<number>(0);

  React.useEffect(() => {
    read(["blocks", "edges"]).then(data => {
      setCountOfBlocks(data.blocks?.length ?? 0);
      setCountOfEdges(data.edges?.length ?? 0);
    });
  }, []);

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
  };

  React.useEffect((): void => {
    chrome.storage.local.get(["status", "activeProject"], result => {
      if (result.status === "on") setRecStatus("on");
      else if (result.status === "paused") setRecStatus("paused");
      if (result.activeProject) setActiveProject(result.activeProject);
    });
    chrome.tabs.query({ active: true, currentWindow: true }, activeTab => {
      if (activeTab[0].url?.startsWith("chrome://")) setIsValidTab(false);
    });
  }, []);

  React.useEffect((): (() => void) => {
    function handleMessageFromBackground({ type }: ActionWithPayload): void {
      if (type === ControlAction.START && isValidTab) startRecording();
      else if (type === ControlAction.STOP) stopRecording();
      else if (type === ControlAction.RESET) resetRecording();
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
          <div id="body">
            <ToggleButton
              recStatus={recStatus}
              handleToggle={handleToggle}
              isValidTab={isValidTab}
            />
          </div>
        )
      ) : authState === "loading" ? (
        "loading"
      ) : (
        <div id="body">
          <Login />
        </div>
      )}
      <div>
        {countOfBlocks} blocks, {countOfEdges} edges
      </div>
    </div>
  );
};

export default App;
