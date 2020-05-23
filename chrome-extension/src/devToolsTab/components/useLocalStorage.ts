import { useEffect, useState } from "react";

import { Block, Edge, RecState, UUID } from "../../types";

type Data = {
  blocks: Block[];
  edges: Edge[];
  active: UUID | null;
  status: RecState;
};
type NewOldValue<T> = { newValue: T; oldValue: T };
type DataUpdate = {
  blocks?: NewOldValue<Block[]>;
  edges?: NewOldValue<Edge[]>;
  active?: NewOldValue<UUID | null>;
  status?: NewOldValue<RecState>;
};

function useLocalStorage() {
  const [data, setData] = useState<Data>({
    blocks: [],
    edges: [],
    active: null,
    status: "off",
  });

  useEffect(() => {
    chrome.storage.local.get(["blocks", "edges"], result =>
      setData(result as Data)
    );
  }, []);

  useEffect(() => {
    function listener(state: DataUpdate, section: "local" | string) {
      if (section === "local") {
        setData({
          blocks: state?.blocks?.newValue ?? data.blocks,
          edges: state?.edges?.newValue ?? data.edges,
          active: state?.active?.newValue ?? data.active,
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
