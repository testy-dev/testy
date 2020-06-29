import React, { Suspense, useEffect, useState } from "react";

import { Block, BlockResult, Graph, JSONparse } from "@testy/shared";
import { Box, Button, Heading, Text } from "grommet";
import { Diagram } from "@testy/diagram";
import { Link, useParams } from "react-router-dom";
import TimeAgo from "react-timeago";
import firebase from "firebase/app";
import styled from "styled-components";

import {
  ProjectRunsSubscription,
  useLastRunQuery,
  useProjectBySlugQuery,
  useProjectRunsSubscription,
} from "../../generated/graphql";
import { usePrevious } from "../../hooks";
import ProjectSettings from "./ProjectSettings";
import ResultsChart from "./ResultsChart";
import TriggerRunButton from "./TriggerRunButton";
import getDiagramBlocksState from "./getDiagramBlocksState";

const ProjectScreen: React.FC = () => {
  const { orgSlug, projectSlug } = useParams<{
    orgSlug: string;
    projectSlug: string;
  }>();
  const [graph, setGraph] = useState<Graph | null>(null);
  const [openedRun, setOpenedRun] = useState<number>(0);
  const [hoverBlock, setHoverBlock] = useState<string | null>(null);
  const [hoverPath, setHoverPath] = useState<string[]>([]);

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
            {project?.organization?.name}
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
      <Box direction="row" fill>
        <Box
          basis="1/3"
          flex={false}
          pad="medium"
          background="light-3"
          overflow={{ vertical: "auto" }}
        >
          <Suspense fallback="Loading ...">
            <ProjectHistory
              orgSlug={orgSlug}
              projectSlug={projectSlug}
              openedRun={openedRun}
              onOpenRun={(id, graph) => {
                setOpenedRun(id);
                setGraph(graph);
              }}
              onHoverPath={setHoverPath}
            />
          </Suspense>
        </Box>

        <Diagram
          blocks={graph?.blocks ?? []}
          edges={graph?.edges ?? []}
          hoverBlock={hoverBlock}
          path={hoverPath}
          setHoverBlock={setHoverBlock}
          selected={null}
          onSelectBlock={() => null}
        />
      </Box>
    </Box>
  );
};

interface SlugInput {
  orgSlug: string;
  projectSlug: string;
}

interface ProjectHistoryProps extends SlugInput {
  openedRun: number | null;
  onOpenRun: (id: number, graph: Graph | null) => void;
  onHoverPath: (path: string[]) => void;
}

const ProjectHistory: React.FC<ProjectHistoryProps> = ({
  orgSlug,
  projectSlug,
  openedRun,
  onOpenRun,
  onHoverPath,
}) => {
  const [{ data }] = useProjectRunsSubscription({
    variables: { orgSlug, projectSlug },
  });
  const previousData = usePrevious(data);

  const project = data?.project?.[0];
  const previousProject = previousData?.project?.[0];

  // Update graph history when subscription update received
  useEffect(() => {
    const run = project?.run?.find((r: any) => r.id === openedRun);
    const previousRun = previousProject?.run?.find(
      (r: any) => r.id === openedRun
    );
    if (run && previousRun && run !== previousRun) {
      console.log("effect update run", run.id);
      onOpenRun(run.id, getDiagramBlocksState(run));
    }
  }, [onOpenRun, openedRun, previousProject, project]);

  const handleOpen = (run: any) => {
    onOpenRun(run.id, getDiagramBlocksState(run));
  };

  useEffect(() => {
    if (openedRun === 0 && previousProject?.graph !== project?.graph) {
      onOpenRun(0, JSONparse(project?.graph));
    }
  }, [onOpenRun, openedRun, previousProject, project]);

  // if (fetching) return <Text>Loading...</Text>;
  if (!project) return <Text>Not found</Text>;

  return (
    <Box flex={false} gap="xsmall">
      <Box
        background="light-1"
        pad="small"
        onClick={() => onOpenRun(0, JSONparse(project.graph))}
        border={{ side: "left", size: "medium", color: "brand" }}
      >
        Actual blocks
      </Box>
      {project.run.map(run => {
        const opened = run.id === openedRun;
        return (
          <Box
            key={run.id}
            background="light-1"
            pad="small"
            onClick={() => handleOpen(run)}
            // border={{
            //   side: "left",
            //   size: "medium",
            //   color: getStatus(
            //     sum.blocks_success,
            //     sum.blocks_failed,
            //     sum.blocks_count
            //   ),
            // }}
          >
            <Box direction="row" justify="between">
              {/*<Text>*/}
              {/*  {Math.round((sum?.blocks_success / sum?.blocks_count) * 100)}% -{" "}*/}
              {/*  {sum?.blocks_failed} fails*/}
              {/*</Text>*/}
              <Text>
                {run.blocks_runned} runned blocks,{" "}
                <TimeAgo date={run.started_at} />
              </Text>
            </Box>
            <Text>
              {/*{sum?.blocks_count} blocks ({sum?.blocks_success} success,{" "}*/}
              {/*, {sum?.blocks_blocked} blocked),{" "}*/}
              {/*{sum?.credits} credits*/}
            </Text>
            {opened && <RunPaths run={run} onHoverPath={onHoverPath} />}
          </Box>
        );
      })}
    </Box>
  );
};

const RunPaths: React.FC<{
  run: ProjectRunsSubscription["project"][0]["run"][0];
  onHoverPath: (path: string[]) => void;
}> = ({ run, onHoverPath }) => {
  const { orgSlug, projectSlug } = useParams<{
    orgSlug: string;
    projectSlug: string;
  }>();

  const blocks: Block[] = run.graph?.blocks ?? [];
  const failingBlocks = run.paths
    .flatMap(path => {
      const edges = JSONparse(path.edges);
      return (
        edges.find((result: BlockResult) => result?.status === "failed") || []
      );
    })
    .map(result => ({
      ...result,
      ...blocks.find(b => b.id === result.id),
    }));
  return (
    <div>
      {failingBlocks.map(result => (
        <Text key={result.id} style={{ display: "block" }}>
          {result.command} {result?.parameter} {result?.selector} {result?.msg}
        </Text>
      ))}
      {run.paths.map(path => {
        const success = path.blocks_success ?? 0;
        const failed = path.blocks_failed ?? 0;
        const count = path.blocks_count ?? 0;
        const executed = success + failed;
        const blocked = count - executed;
        return (
          <Link
            key={path.id + "path"}
            to={`/${orgSlug}/${projectSlug}/${path.id}`}
          >
            <PathLine
              color={getStatus(success, failed, count)}
              onMouseEnter={() =>
                onHoverPath(
                  JSONparse(path.edges).map((result: BlockResult) => result.id)
                )
              }
            >
              path #{path.id} - {path?.blocks_count} blocks ({success} success,{" "}
              {failed} failed, {blocked} blocked), {executed} executed blocks
            </PathLine>
          </Link>
        );
      })}
    </div>
  );
};

const PathLine = styled(Text)`
  display: block;
  &:hover {
    font-weight: bold;
  }
`;

const getStatus = (pass: number, fail: number, total: number) =>
  fail > 0 ? "status-error" : pass === total ? "status-ok" : "status-unknown";

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
