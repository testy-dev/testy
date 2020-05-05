import * as React from "react";

export interface UploadButtonProps {
  onClick: () => void;
  countOfCommands: number;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  onClick,
  countOfCommands,
}) => {
  if (countOfCommands === 0) return null;
  return (
    <div id="copy-wrap">
      <button type="button" id="copy" className="button" onClick={onClick}>
        Upload {countOfCommands} commands
      </button>
    </div>
  );
};

export default UploadButton;
