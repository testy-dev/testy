import React from "react";

import { Add } from "grommet-icons";
import { Box, Button, Form, FormField, Heading, Layer, Text } from "grommet";
import slugify from "slugify";

import { fetchQuery } from "../../graphql";

interface IProps {
  orgId: number;
  onCreate: (slug: string) => void;
}

const CreateProject: React.FC<IProps> = ({ onCreate, orgId }) => {
  const [opened, setOpened] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");
  const handleCreate = React.useCallback(
    async e => {
      const slug = slugify(e.value.name);
      // language=graphql
      const query = `
        mutation createProject($input: project_insert_input!) {
            insert_project_one(object: $input) {
                id
            }
        }
      `;
      const response = await fetchQuery(query, {
        input: {
          name: e.value.name,
          organization_id: orgId,
          slug,
        },
      });
      if (response?.errors?.length) {
        setError(response.errors.map((e: any) => e.message).join());
      } else if (response?.data?.insert_project_one?.id) {
        await onCreate(slug);
      }
    },
    [onCreate, setError]
  );
  return (
    <>
      <Button
        icon={<Add color="status-ok" />}
        onClick={() => setOpened(true)}
      />
      {opened && (
        <Layer
          onEsc={() => setOpened(false)}
          onClickOutside={() => setOpened(false)}
        >
          <Form onSubmit={handleCreate}>
            <Box pad="medium" gap="medium">
              <Heading level={2}>Create Project</Heading>
              <FormField name="name" label="Project name" />
              {error && <Text color="status-error">{error}</Text>}
              <Button type="submit" label="Create" />
            </Box>
          </Form>
        </Layer>
      )}
    </>
  );
};

export default CreateProject;
