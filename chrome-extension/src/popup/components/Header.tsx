import * as React from "react";
import styled from "styled-components";
// import { useEffect, useState } from "react";
// import callGraphql from "../../helpers/callGraphql";

interface IProps {
  activeProject?: string;
}

const Header: React.FC<IProps> = ({ activeProject }) => (
  //   const [projectName, setProjectName] = useState<any>();
  //
  //   useEffect(() => {
  //     // language=graphql
  //     callGraphql(
  //       `
  // query($id: Int!){
  //     project(where: {id: {_eq: $id}}) {
  //         id
  //         name
  //     }
  // }`,
  //       { id: activeProject }
  //     ).then(response => setProjectName(response?.data?.project?.name));
  //   }, [activeProject]);

  <StyledHeader>
    <Title>Testy</Title>
    <Project>Active project: {activeProject}</Project>
  </StyledHeader>
);

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background: #1f1f1f;
  color: white;

  padding: 7px 5px;
`;
const Title = styled.h1`
  margin: 0;
  font-size: 100%;
`;
const Project = styled.span``;

export default Header;
