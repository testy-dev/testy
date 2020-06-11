import * as React from "react";
import styled from "styled-components";

import { useFirebaseAuthState } from "../../components/hooks";

interface IProps {
  onLogout: () => void;
  onLogin: () => void;
  activeProject: number | undefined;
  onSelectProject: () => void;
}

const Header: React.FC<IProps> = ({
  onLogout,
  onLogin,
  activeProject,
  onSelectProject,
}) => {
  const authState = useFirebaseAuthState();

  return (
    <StyledHeader>
      <Title>Testy</Title>
      <Project onClick={onSelectProject}>
        {activeProject ? "Project: " + activeProject : "Select project"}
      </Project>
      <User onClick={authState === "in" ? onLogout : onLogin}>
        {authState === "in" ? "Log out" : "Log in"}
      </User>
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background: #1f1f1f;
  color: white;

  padding: 5px 7px;
`;
const Title = styled.h1`
  margin: 0;
  font-size: 100%;
`;
const Project = styled.span`
  cursor: pointer;
`;
const User = styled.span`
  cursor: pointer;
`;

export default Header;
