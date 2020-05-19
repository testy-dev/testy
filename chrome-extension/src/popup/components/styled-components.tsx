import styled from "styled-components";

export const Button = styled.button`
  border: 1px solid black;
  background: white;
  padding: 5px 7px;
  cursor: pointer;
  transition: 300ms background-color;

  &:hover {
    background: #c2c2c2;
  }
`;

export const LargeButton = styled(Button)`
  font-size: 110%;
`;
