import * as React from "react";
import { useEffect, useState } from "react";

import callGraphql from "../../helpers/callGraphql";

interface IProps {
  activeProject?: string;
  onChangeProject: (id: string) => void;
}

const SelectProject: React.FC<IProps> = ({
  activeProject,
  onChangeProject,
}) => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    // language=graphql
    callGraphql(`
{
  organization {
    id
    name
    projects {
      id
      name
    }
  }
}
    `).then(response => setData(response?.data));
  });

  if (!data) return <div id="body">Loading organizations and projects ...</div>;

  return (
    <div id="body">
      <ul>
        {data.organization?.map((org: any) => (
          <React.Fragment key={org.id}>
            <li>{org.name}</li>
            {org?.projects?.length ? (
              <li>
                <ul>
                  {org?.projects?.map((project: any) => (
                    <li
                      key={project.id}
                      onClick={() => onChangeProject(project.id)}
                      style={{
                        fontWeight:
                          activeProject === project.id ? "bold" : "normal",
                      }}
                    >
                      {project.name}
                    </li>
                  ))}
                </ul>
              </li>
            ) : null}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default SelectProject;
