import * as React from "react";

import { ControlAction } from "../../constants";
import ResetButton from "./ResetButton";
import ToggleButton from "./ToggleButton";
import UploadButton from "./UploadButton";

export interface FooterProps {
  isValidTab: boolean;
  recStatus: string;
  handleToggle: (action: ControlAction) => void;
  triggerUpload: () => void;
  countOfCommands: number;
}

const Footer: React.FC<FooterProps> = ({
  isValidTab,
  recStatus,
  handleToggle,
  triggerUpload,
  countOfCommands,
}) => (
  <div id="footer">
    <ToggleButton
      recStatus={recStatus}
      handleToggle={handleToggle}
      isValidTab={isValidTab}
    />
    {recStatus === "paused" && <ResetButton handleToggle={handleToggle} />}
    {recStatus === "paused" && (
      <UploadButton onClick={triggerUpload} countOfCommands={countOfCommands} />
    )}
  </div>
);

export default Footer;
