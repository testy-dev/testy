import styled from "styled-components";

export const Button = styled.button`
  border: ${({ disabled }) => `1px solid ${disabled ? "gray" : "black"}`};
  background: ${({ disabled }) => (disabled ? "#e7e7e7" : "#ffffff")};
  padding: 5px 7px;
  cursor: ${({ disabled }) => (disabled ? "initial" : "pointer")};
  transition: 300ms background-color;

  &:hover {
    background: ${({ disabled }) => (disabled ? "#e7e7e7" : "#c2c2c2")};
  }
`;

export const LargeButton = styled(Button)`
  font-size: 110%;
`;
