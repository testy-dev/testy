import * as React from "react";

import "firebase/auth";
import * as firebase from "firebase/app";
import styled from "styled-components";

import { ActionWithPayload, RecState } from "../../types";
import { Button } from "./styled-components";
import { ControlAction } from "../../constants";
import { firebaseConfig } from "../config";
import { read } from "../../helpers/model";
import Header from "./Header";
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

  // const authState = useFirebaseAuthState();

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
    chrome.storage.local.get(
      ["status", "codeBlocks", "activeProject"],
      result => {
        if (result?.status === "on") setRecStatus("on");
        else if (result?.status === "paused") setRecStatus("paused");
        if (result?.activeProject) setActiveProject(result.activeProject);
      }
    );
    chrome.tabs.query({ active: true, currentWindow: true }, activeTab => {
      if (activeTab[0].url?.startsWith("chrome://")) setIsValidTab(false);
    });
  }, []);

  // Write active project to storage
  React.useEffect(() => {
    chrome.storage.local.get("activeProject", items => {
      if (items?.activeProject !== activeProject)
        chrome.storage.local.set({ activeProject });
    });
  }, [activeProject]);

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
    <Root>
      <Header activeProject={activeProject} />
      {/*<SelectProject*/}
      {/*  activeProject={activeProject}*/}
      {/*  onChangeProject={setActiveProject}*/}
      {/*/>*/}
      <ToggleButton
        recStatus={recStatus}
        handleToggle={handleToggle}
        isValidTab={isValidTab}
      />
      <Wrap>
        <span>For show all blocks press F12 and open tab "Testy"</span>
      </Wrap>
      <Footer>
        <span>{countOfBlocks} blocks</span>
        <span>{countOfEdges} edges</span>
        <Button onClick={() => handleToggle(ControlAction.RESET)}>Reset</Button>
      </Footer>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 15px;
  font-family: "Roboto", sans-serif;
  min-width: 250px;
  min-height: 250px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding: 5px 7px;
`;

const Wrap = styled.div`
  align-self: center;
  text-align: center;
`;

export default App;
