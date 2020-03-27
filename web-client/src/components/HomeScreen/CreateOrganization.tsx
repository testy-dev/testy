import React from "react";

import { Add } from "grommet-icons";
import { Box, Button, Form, FormField, Heading, Layer, Text } from "grommet";

import { fetchQuery } from "../../graphql";
import UserID from "../UserID";

interface IProps {
  onCreate: (id: number) => void;
}

const CreateOrganization: React.FC<IProps> = ({ onCreate }) => {
  const [opened, setOpened] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");
  const handleCreate = React.useCallback(
    async e => {
      // language=graphql
      const query = `
        mutation createOrganization($name: String!, $owner_id: Int!) {
            insert_organization_one(object: {name: $name, owner_id: $owner_id}) {
                id
            }
        }
      `;
      const response = await fetchQuery(query, {
        name: e.value.name,
        owner_id: UserID.getUser(),
      });
      if (response?.errors?.length) {
        setError(response.errors.map((e: any) => e.message).join());
      } else if (response?.data?.insert_organization_one?.id) {
        await onCreate(response?.data?.insert_organization_one?.id);
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
        <Layer>
          <Form onSubmit={handleCreate}>
            <Box pad="medium" gap="medium">
              <Heading level={2}>Create organization</Heading>
              <FormField name="name" label="Organization name" />
              {error && <Text color="status-error">{error}</Text>}
              <Button type="submit" label="Create" />
            </Box>
          </Form>
        </Layer>
      )}
    </>
  );
};

export default CreateOrganization;
