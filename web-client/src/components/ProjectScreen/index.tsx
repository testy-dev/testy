import React from "react";

import { Box, Button, Heading } from "grommet";
import { Link, useParams } from "react-router-dom";
import firebase from "firebase/app";

import { FailedBlocks } from "./FailedBlocks";
import {
  useLastRunQuery,
  useProjectBySlugQuery,
} from "../../generated/graphql";
import ProjectSettings from "./ProjectSettings";
import ResultsChart from "./ResultsChart";
import TriggerRunButton from "./TriggerRunButton";

const ProjectScreen: React.FC = () => {
  const { orgSlug, projectSlug } = useParams<{
    orgSlug: string;
    projectSlug: string;
  }>();
  const [{ data }] = useProjectBySlugQuery({
    variables: { orgSlug, projectSlug },
  });
  const project = data?.project?.[0];

  return (
    <Box fill>
      <Box
        direction="row"
        background="light-4"
        pad={{ vertical: "xsmall", horizontal: "small" }}
        align="center"
        justify="between"
      >
        <Box gap="small" direction="row" align="center">
          <Heading color="#0B74C2" level={2} margin="none">
            Testy
          </Heading>
          <Heading level={3} margin="none" style={{ fontWeight: "normal" }}>
            <Link to="/">{project?.organization?.name}</Link>
            {" / "}
            {project?.name}
          </Heading>
          <ProjectSettings projectId={project?.id ?? null} />
          <TriggerRunButton projectId={project?.id ?? null} />
        </Box>
        <Button
          primary
          label="Log Out"
          onClick={async () => firebase.auth().signOut()}
        />
      </Box>
      <Box flex={false} align="center" background="light-3" direction="row">
        <ResultsChart orgSlug={orgSlug} projectSlug={projectSlug} />
        <SuccessRate orgSlug={orgSlug} projectSlug={projectSlug} />
      </Box>
      <FailedBlocks orgSlug={orgSlug} projectSlug={projectSlug} />
    </Box>
  );
};

export interface SlugInput {
  orgSlug: string;
  projectSlug: string;
}

const SuccessRate: React.FC<SlugInput> = ({ orgSlug, projectSlug }) => {
  const [{ data }] = useLastRunQuery({ variables: { orgSlug, projectSlug } });
  const success = data?.run?.[0]?.paths?.reduce(
    (acc, path) => acc + (path.blocks_success ?? 0),
    0
  );
  const count = data?.run?.[0]?.paths.reduce(
    (acc, path) => acc + (path.blocks_count ?? 0),
    0
  );
  return (
    <span>
      Last success rate:{" "}
      {success && count && count > 0 ? Math.round((success * 100) / count) : 0}%
    </span>
  );
};

export default ProjectScreen;
