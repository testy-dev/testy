import React, { useEffect, useMemo, useRef, useState } from "react";

import { Anchor, Box } from "grommet";
import { Block, BlockResult, JSONparse } from "@testy/shared";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import useComponentSize from "@rehooks/component-size";

import { useGetPathByIdQuery } from "../../generated/graphql";
import BlockDetail from "./BlockDetail";

export interface BlockWithAllData extends Block, BlockResult {
  screenshot: string;
}

const PathResultsScreen: React.FC = () => {
  const params = useParams<{
    orgSlug: string;
    projectSlug: string;
    runPathId: string;
  }>();
  const { hash } = useLocation();
  const pathId = +params.runPathId;
  const [{ data }] = useGetPathByIdQuery({ variables: { id: pathId } });
  const [activeBlock, setActiveBlock] = useState<string>("");
  const imgRef = useRef<HTMLImageElement>(null);
  const { width, height } = useComponentSize(imgRef);
  const widthRatio =
    width / (data?.run_path_by_pk?.settings?.resolution?.width ?? 0);
  const heightRatio =
    height / (data?.run_path_by_pk?.settings?.resolution?.height ?? 0);
  const [imgX, setImgX] = useState<number>(0);
  const [imgY, setImgY] = useState<number>(0);

  const edges: BlockWithAllData[] = useMemo(() => {
    const results = JSONparse(data?.run_path_by_pk?.edges ?? []);
    const blocks = data?.run_path_by_pk?.run?.graph?.blocks;

    return results.map((result: BlockResult) => ({
      ...result,
      ...blocks.find((block: Block) => block.id === result.id),
      screenshot: `https://storage.googleapis.com/testyx.appspot.com/paths/${pathId}/${result.id}.jpg`,
    }));
  }, [
    data?.run_path_by_pk?.edges,
    data?.run_path_by_pk?.run?.graph?.blocks,
    pathId,
  ]);

  useEffect(() => {
    if (!activeBlock && edges.length > 0) {
      setActiveBlock(edges[0].id);
    }
  }, [activeBlock, edges]);

  useEffect(() => {
    setImgX(imgRef.current?.offsetLeft ?? 0);
    setImgY(imgRef.current?.offsetTop ?? 0);
  }, [height, width]);

  useEffect(() => {
    if (hash.startsWith("#block=")) {
      const [, hashBlockId] = hash.split("=");
      setActiveBlock(hashBlockId);
    }
  }, [hash]);

  return (
    <Root>
      <Box flex="shrink">
        <Box
          flex="grow"
          justify="center"
          align="center"
          background="dark-4"
          pad="small"
        >
          <img
            ref={imgRef}
            src={edges?.find(e => e.id === activeBlock)?.screenshot}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
          <div
            style={{
              position: "absolute",
              borderStyle: "solid",
              width:
                (edges?.find(e => e.id === activeBlock)?.dimensions?.width ??
                  0) * widthRatio,
              height:
                (edges?.find(e => e.id === activeBlock)?.dimensions?.height ??
                  0) * heightRatio,
              top:
                imgY +
                (edges?.find(e => e.id === activeBlock)?.dimensions?.y ?? 0) *
                  heightRatio,
              left:
                imgX +
                (edges?.find(e => e.id === activeBlock)?.dimensions?.x ?? 0) *
                  widthRatio,
            }}
          />
        </Box>
        <Box direction="row">
          {edges.map(e => (
            <Box
              key={e.id}
              onClick={() => setActiveBlock(e.id)}
              pad="medium"
              style={{
                color: e.status === "success" ? "green" : "red",
                fontWeight: activeBlock === e.id ? "bold" : "normal",
              }}
            >
              {e.command}
            </Box>
          ))}
        </Box>
      </Box>
      <Column>
        <Link to={`/${params.orgSlug}/${params.projectSlug}`}>
          <Anchor as="span">Back to project overview</Anchor>
        </Link>
        <h1>Testy</h1>
        <Blocks
          blocks={edges}
          active={activeBlock}
          setActive={setActiveBlock}
        />
      </Column>
    </Root>
  );
};

const Blocks: React.FC<{
  blocks: BlockWithAllData[];
  active: string;
  setActive: (value: string) => void;
}> = ({ blocks, active, setActive }) => (
  <Box>
    {blocks.map(block => (
      <BlockDetail
        key={block.id}
        active={active === block.id}
        setActive={setActive}
        block={block}
        hover={false}
        setHover={() => null}
      />
    ))}
  </Box>
);

const Root = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100vh;
  align-items: stretch;
`;

const Column = styled.div`
  flex: 350px 0 0;
  padding: 5px;
  border-left: 1px solid #cccccc;
  background: #f3f3f3;
  color: #444444;
  line-height: 1.5;
  overflow-y: auto;
`;
export default PathResultsScreen;
