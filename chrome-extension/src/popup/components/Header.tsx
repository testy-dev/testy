import * as React from "react";
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

  <div id="header">
    <h1 id="title">Testy Recorder</h1>
    <span style={{ color: "white" }}>Active project: {activeProject}</span>
  </div>
);

export default Header;
