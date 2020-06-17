import React, { useEffect, useState } from "react";

import { Box, Button, Heading, Layer, Text, TextInput } from "grommet";
import { PlayFill, Trash } from "grommet-icons";
import { Resolution, RunSettings } from "@testy/shared";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useLocalStore, useObserver } from "mobx-react-lite";

interface Props {
  projectId: number | null;
}

const TriggerRunButton: React.FC<Props> = ({ projectId }) => {
  const [show, setShow] = useState<boolean>(false);
  const settings = useLocalStore<{
    resolutions: Resolution[];
    addResolution: () => void;
  }>(() => ({
    resolutions: [],
    addResolution() {
      settings.resolutions.push({ width: 800, height: 600 });
    },
  }));

  const { data } = useQuery(
    gql`
      query($id: Int!) {
        project_by_pk(id: $id) {
          settings
        }
      }
    `,
    { variables: { id: projectId }, skip: projectId === null || !show }
  );

  useEffect(() => {
    if (data?.project_by_pk?.settings)
      settings.resolutions = data.project_by_pk.settings?.resolutions ?? [];
  }, [data?.project_by_pk?.settings, settings]);

  const [runProject] = useMutation<
    any,
    { id: number; run_by_user: number; settings: RunSettings }
  >(
    gql`
      mutation($id: Int!, $run_by_user: Int!, $settings: jsonb) {
        insert_run_one(
          object: {
            project_id: $id
            run_by_user: $run_by_user
            settings: $settings
          }
        ) {
          id
        }
      }
    `
  );

  const handleRun = async () => {
    if (projectId) {
      await runProject({
        variables: {
          id: projectId,
          run_by_user: 1,
          settings: settings,
        },
      });
      setShow(false);
    }
  };

  return useObserver(() => (
    <>
      <Button
        icon={<PlayFill color="green" />}
        onClick={() => setShow(!show)}
      />
      {show && (
        <Layer>
          <Box pad="small" direction="column">
            <Heading level={2} margin={{ top: "none", bottom: "medium" }}>
              Run project
            </Heading>
            <Box
              direction="row"
              justify="between"
              align="center"
              margin={{ bottom: "medium" }}
              gap="medium"
            >
              <Text>Browser resolutions:</Text>
              <Button
                label="Add resolution"
                onClick={() => settings.addResolution()}
              />
            </Box>
            <Box gap="small">
              {settings.resolutions.map((r, index) => (
                <Box key={index} direction="row" gap="medium" align="center">
                  {index + 1 + "."}
                  <Box direction="row" align="center" gap="xsmall">
                    Width
                    <TextInput
                      type="number"
                      value={r.width}
                      onChange={e => (r.width = +e.target.value)}
                      style={{ width: "80px", textAlign: "right" }}
                    />
                    px
                  </Box>
                  <Box direction="row" align="center" gap="xsmall">
                    Height
                    <TextInput
                      type="number"
                      value={r.height}
                      onChange={e => (r.height = +e.target.value)}
                      style={{ width: "80px", textAlign: "right" }}
                    />
                    px
                  </Box>
                  <Button
                    icon={<Trash color="red" size="18px" />}
                    onClick={() => {
                      settings.resolutions.splice(index, 1);
                    }}
                  />
                </Box>
              ))}
            </Box>

            <Box
              margin={{ top: "medium" }}
              direction="row"
              gap="medium"
              justify="center"
            >
              <Button label="Run now" primary onClick={handleRun} />
              <Button label="Close" onClick={() => setShow(false)} />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  ));
};

export default TriggerRunButton;
