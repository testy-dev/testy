import { Block, BlockResult, JSONparse } from "@testy/shared";

export default function handleOpen(run: any) {
  const counter = run.paths.reduce(
    (
      acc: {
        success: { [blockID: string]: number };
        fail: { [blockID: string]: number };
      },
      path: any
    ) => {
      const edges = JSONparse(path.edges);
      edges.forEach((block: BlockResult) => {
        if (block.status === "success") {
          acc.success[block.id] = acc.success[block.id] + 1 || 1;
        }
        if (block.status === "failed") {
          acc.fail[block.id] = acc.fail[block.id] + 1 || 1;
        }
      });
      return acc;
    },
    { success: {}, fail: {} }
  );

  return {
    edges: run?.graph?.edges ?? [],
    blocks:
      run.graph?.blocks?.map((block: Block) => {
        const success = counter.success?.[block.id] ?? 0;
        const fail = counter.fail?.[block.id] ?? 0;
        // success 0, fail 0 => unknown
        // success > 0, fail 0 => success
        // success 0, fail > 0 => fail
        // success > 0, fail > 0 => warning
        return {
          ...block,
          state:
            success > 0
              ? fail > 0
                ? "warning"
                : "success"
              : fail > 0
              ? "fail"
              : "unknown",
        };
      }) ?? [],
  };
}
