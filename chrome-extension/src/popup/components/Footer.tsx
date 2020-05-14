import * as React from "react";

import { ControlAction } from "../../constants";
import ReplayButton from "./ReplayButton";
import ResetButton from "./ResetButton";
import ToggleButton from "./ToggleButton";

export interface FooterProps {
  isValidTab: boolean;
  recStatus: string;
  handleToggle: (action: ControlAction) => void;
}

const Footer: React.FC<FooterProps> = ({
  isValidTab,
  recStatus,
  handleToggle,
}) => (
  <div id="footer">
    <ToggleButton
      recStatus={recStatus}
      handleToggle={handleToggle}
      isValidTab={isValidTab}
    />
    {recStatus === "paused" && <ResetButton handleToggle={handleToggle} />}
    {recStatus === "paused" && <ReplayButton handleToggle={handleToggle} />}
  </div>
);

export default Footer;
