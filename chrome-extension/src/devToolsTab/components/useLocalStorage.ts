import { useEffect, useState } from "react";

import { Block, Edge } from "../../types";

type Data = { blocks: Block[]; edges: Edge[] };

function useLocalStorage() {
  const [data, setData] = useState<Data>({ blocks: [], edges: [] });

  useEffect(() => {
    chrome.storage.local.get(["blocks", "edges"], result =>
      setData(result as Data)
    );

    function listener(state: any, section: any) {
      console.log("Storage updated", state, section);
    }
    chrome.storage.onChanged.addListener(listener);
    return () => chrome.storage.onChanged.removeListener(listener);
  }, []);

  return data;
}
export default useLocalStorage;
