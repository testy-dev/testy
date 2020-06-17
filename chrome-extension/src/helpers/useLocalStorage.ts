import { useEffect, useState } from "react";

import { Block, Edge, RecState, UUID } from "@testy/shared";

type Data = {
  blocks: Block[];
  edges: Edge[];
  activeBlock: UUID | null;
  status: RecState;
};
type NewOldValue<T> = { newValue: T; oldValue: T };
type DataUpdate = {
  blocks?: NewOldValue<Block[]>;
  edges?: NewOldValue<Edge[]>;
  activeBlock?: NewOldValue<UUID | null>;
  status?: NewOldValue<RecState>;
};

function useLocalStorage() {
  const [data, setData] = useState<Data>({
    blocks: [],
    edges: [],
    activeBlock: null,
    status: "off",
  });

  useEffect(() => {
    chrome.storage.local.get(["blocks", "edges", "active", "status"], result =>
      setData({
        blocks: result?.blocks ?? [],
        edges: result?.edges ?? [],
        activeBlock: result?.active ?? null,
        status: result?.status ?? "off",
      })
    );
  }, []);

  useEffect(() => {
    function listener(state: DataUpdate, section: "local" | string) {
      if (section === "local") {
        setData({
          blocks: state?.blocks?.newValue ?? data.blocks,
          edges: state?.edges?.newValue ?? data.edges,
          activeBlock: state?.activeBlock?.newValue ?? data.activeBlock,
          status: state?.status?.newValue ?? data.status,
        });
      }
    }
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, [data]);

  return data;
}
export default useLocalStorage;
