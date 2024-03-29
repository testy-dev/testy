import React, { useEffect, useState } from "react";

import { Box, Button, Heading, Layer, Text, TextInput } from "grommet";
import { Configure, Trash } from "grommet-icons";
import { Resolution } from "@testy/shared";
import { useLocalStore, useObserver } from "mobx-react-lite";
import {
  useProjectByIdQuery,
  useUpdateProjectMutation,
} from "../../generated/graphql";

const defaultResolution = { width: 800, height: 600 };

interface Props {
  projectId: number | null;
}

const ProjectSettings: React.FC<Props> = ({ projectId }) => {
  const [show, setShow] = useState<boolean>(false);
  const settings = useLocalStore<{
    resolutions: Resolution[];
    addResolution: () => void;
  }>(() => ({
    resolutions: [defaultResolution],
    addResolution() {
      settings.resolutions.push(defaultResolution);
    },
  }));

  const [{ data }] = useProjectByIdQuery({
    variables: { id: projectId as number },
    pause: projectId === null || !show,
  });

  useEffect(() => {
    if (data?.project_by_pk?.settings)
      settings.resolutions = data.project_by_pk.settings?.resolutions ?? [];
  }, [data?.project_by_pk?.settings, settings]);

  const [, updateProject] = useUpdateProjectMutation();
  const handleSave = async () => {
    if (projectId) {
      await updateProject({
        projectId,
        data: { settings },
      });
      setShow(false);
    }
  };

  return useObserver(() => (
    <>
      <Button icon={<Configure />} onClick={() => setShow(!show)} />
      {show && (
        <Layer>
          <Box pad="small" direction="column">
            <Heading level={2} margin={{ top: "none", bottom: "medium" }}>
              Project settings
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
              <Button label="Save" primary onClick={handleSave} />
              <Button label="Close" onClick={() => setShow(false)} />
            </Box>
          </Box>
        </Layer>
      )}
    </>
  ));
};

export default ProjectSettings;
