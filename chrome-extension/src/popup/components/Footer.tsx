import * as React from "react";

import { ControlAction } from "../../constants";
import ResetButton from "./ResetButton";
import ToggleButton from "./ToggleButton";

export interface FooterProps {
  isValidTab: boolean;
  recStatus: string;
  handleToggle: (action: ControlAction) => void;
}

const Footer = ({ isValidTab, recStatus, handleToggle }: FooterProps) => (
  <div id="footer">
    <ToggleButton
      recStatus={recStatus}
      handleToggle={handleToggle}
      isValidTab={isValidTab}
    />
    {recStatus === "paused" && <ResetButton handleToggle={handleToggle} />}
  </div>
);

export default Footer;
