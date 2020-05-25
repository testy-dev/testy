import * as React from "react";

import "firebase/auth";
import * as firebase from "firebase/app";
import styled from "styled-components";

import { ActionWithPayload, RecState } from "../../types";
import { Button } from "./styled-components";
import { ControlAction } from "../../constants";
import { firebaseConfig } from "../config";
import { read, write } from "../../helpers/model";
import { useFirebaseAuthState } from "../hooks";
import Header from "./Header";
import Login from "./Login";
import SelectProject from "./SelectProject";
import ToggleButton from "./ToggleButton";
import callGraphql from "../../helpers/callGraphql";
import useLocalStorage from "../../helpers/useLocalStorage";

firebase.initializeApp(firebaseConfig);

enum Screen {
  home,
  login,
  selectProject,
}

const App: React.FC = () => {
  const [recStatus, setRecStatus] = React.useState<RecState>("off");
  const [isValidTab, setIsValidTab] = React.useState<boolean>(true);
  const [activeProject, setActiveProject] = React.useState<
    number | undefined
  >();
  const [screen, setScreen] = React.useState<Screen>(Screen.home);
  const [graphSaved, setGraphSaved] = React.useState<boolean>(false);

  const storage = useLocalStorage();
  const loginState = useFirebaseAuthState();

  const startRecording = (): void => {
    setRecStatus("on");
  };
  const stopRecording = (): void => {
    setRecStatus("paused");
  };
  const resetRecording = (): void => {
    setRecStatus("off");
  };

  const onLogout = async () => {
    await firebase.auth().signOut();
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

  const handleSave = async () => {
    const data = await read(["blocks", "edges"]);
    // language=graphql
    const result = await callGraphql(
      `
mutation($project: Int!, $graph: jsonb) {
    update_project(where: {id: {_eq: $project}}, _set: {graph: $graph}) {
        affected_rows
    }
}
      `,
      {
        project: activeProject,
        graph: JSON.stringify({
          blocks: data?.blocks ?? [],
          edges: data?.edges ?? [],
        }),
      }
    );
    if (result?.data?.update_project?.affected_rows === 1) {
      // Success
      setGraphSaved(true);
      console.debug("Graph saved", result);
    } else {
      // Fail
      console.error("Cannot save graphl", result);
    }
  };

  const handleLoad = async () => {
    try {
      // language=graphql
      const result = await callGraphql(
        `query($project: Int!) {
                project(where: {id: {_eq: $project}}) {
                    graph
                }
            }`,
        {
          project: activeProject,
        }
      );

      const graph = result?.data?.project?.[0]?.graph;
      const { blocks, edges } = JSON.parse(graph);
      await write({ blocks, edges });
      console.debug("Data loaded", blocks, edges);
    } catch (e) {
      console.error(e);
    }
  };

  let screenContent;
  if (screen === Screen.login && loginState !== "in") {
    screenContent = <Login />;
  } else if (screen === Screen.selectProject && loginState === "in") {
    screenContent = (
      <SelectProject
        activeProject={activeProject}
        onChangeProject={setActiveProject}
      />
    );
  } else {
    screenContent = (
      <>
        <ToggleButton
          recStatus={recStatus}
          handleToggle={handleToggle}
          isValidTab={isValidTab}
        />
        <Wrap>
          <span>For show all blocks press F12 and open tab "Testy"</span>
        </Wrap>
        {loginState === "in" && activeProject && (
          <Wrap>
            <Button onClick={handleLoad}>Load</Button>
            {storage.blocks?.length > 0 && storage.edges?.length > 0 && (
              <Button onClick={handleSave} disabled={graphSaved}>
                {graphSaved ? "Saved" : "Save"}
              </Button>
            )}
          </Wrap>
        )}
      </>
    );
  }

  return (
    <Root>
      <Header
        onLogin={() => setScreen(Screen.login)}
        onLogout={onLogout}
        activeProject={activeProject}
        onSelectProject={() => setScreen(Screen.selectProject)}
      />
      {screen !== Screen.home && (
        <Back
          onClick={() => {
            setScreen(Screen.home);
          }}
        >
          {"< Go Back"}
        </Back>
      )}
      <Content>{screenContent}</Content>
      <Footer>
        <span>{storage?.blocks?.length ?? 0} blocks</span>
        <span>{storage?.edges?.length ?? 0} edges</span>
        <Button onClick={() => handleToggle(ControlAction.RESET)}>Reset</Button>
      </Footer>
    </Root>
  );
};

const Root = styled.div`
  display: flex;
  flex-direction: column;
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

  * {
    margin: 5px;
  }
`;

const Content = styled(Wrap)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Back = styled.div``;

export default App;
