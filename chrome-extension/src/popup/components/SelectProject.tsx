import * as React from "react";
import { useEffect, useState } from "react";

import callGraphql from "../../helpers/callGraphql";

interface IProps {
  activeProject?: number;
  onChangeProject: (id: number) => void;
}

const SelectProject: React.FC<IProps> = ({
  activeProject,
  onChangeProject,
}) => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>("");

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
    `)
      .then(response =>
        response?.data
          ? setData(response.data)
          : setError(response?.errors?.[0]?.message || "Cannot load projects")
      )
      .catch(console.error);
  }, []);

  if (error) return <div>{error}</div>;
  if (!data) return <div id="body">Loading organizations and projects ...</div>;
  if (data?.organization?.length === 0)
    return (
      <div>
        You don't have any project. Create one in{" "}
        <a
          href="https://app.testy.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          app.testy.dev
        </a>
      </div>
    );

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
