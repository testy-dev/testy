import * as React from "react";
import { ControlAction } from "@testy/shared";
import styled from "styled-components";

import { LargeButton } from "./styled-components";

export interface ToggleButtonProps {
  isValidTab: boolean;
  recStatus: string;
  handleToggle: (action: ControlAction) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  recStatus,
  handleToggle,
  isValidTab,
}) => {
  const handleClick = (): void => {
    let action: ControlAction = ControlAction.START;
    if (recStatus === "off" || recStatus === "paused")
      action = ControlAction.START;
    else if (recStatus === "on") action = ControlAction.STOP;
    handleToggle(action);
  };

  return (
    <Wrap>
      <LargeButton
        onClick={handleClick}
        disabled={
          !isValidTab && (recStatus === "off" || recStatus === "paused")
        }
      >
        {(recStatus === "off" || recStatus === "paused") &&
          !isValidTab &&
          "This page cannot be recorder"}
        {recStatus === "off" && isValidTab && "Start Recording"}
        {recStatus === "paused" && isValidTab && "Start Recording"}
        {recStatus === "on" && "Stop Recording"}
      </LargeButton>
    </Wrap>
  );
};

const Wrap = styled.div`
  align-self: center;
`;

export default ToggleButton;
