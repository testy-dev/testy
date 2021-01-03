import React from "react";

import { default as Blocks } from "../devToolsTab/components/App";
import { default as Status } from "../popup/components/App";
import InPagePopUp from "./InPagePopUp";

const InPageApp: React.FC = () => (
  <InPagePopUp>
    <Status />
    <Blocks />
  </InPagePopUp>
);

export default InPageApp;
