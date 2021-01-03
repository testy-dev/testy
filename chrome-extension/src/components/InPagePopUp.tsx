import React from "react";
import styled from "styled-components";

const AbsolutePosition = styled.div`
  position: fixed;
  width: 500px;
  height: 700px;
  bottom: 0;
  right: 0;
  border: 1px solid black;
`;

const InPagePopUp: React.FC = ({ children }) => (
  <AbsolutePosition>{children}</AbsolutePosition>
);

export default InPagePopUp;
