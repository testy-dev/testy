import React from "react";

import { Add } from "grommet-icons";
import { Box, Button, Form, FormField, Heading, Layer, Text } from "grommet";
import slugify from "slugify";

import { useCreateOrganizationMutation } from "../../generated/graphql";
import UserID from "../UserID";

interface IProps {
  onCreate: (slug: string) => void;
}

const CreateOrganization: React.FC<IProps> = ({ onCreate }) => {
  const [opened, setOpened] = React.useState<boolean>(false);
  const [error, setError] = React.useState("");
  const [, createOrg] = useCreateOrganizationMutation();
  const handleCreate = React.useCallback(
    async e => {
      const slug = slugify(e.value.name);
      const response = await createOrg({
        input: {
          name: e.value.name,
          owner_id: UserID.getUser(),
          slug,
        },
      });
      if (response?.error?.name) {
        setError(response?.error?.name);
      } else if (response?.data?.insert_organization_one?.id) {
        await onCreate(slug);
      }
    },
    [createOrg, onCreate]
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
              <Heading level={2}>Create Organization</Heading>
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
