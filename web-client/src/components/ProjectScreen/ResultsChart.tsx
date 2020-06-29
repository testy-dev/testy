import React from "react";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useProjectRunsSubscription } from "../../generated/graphql";

interface IProps {
  orgSlug: string;
  projectSlug: string;
}

const getPercent = (value: number, total: number) => {
  const ratio = total > 0 ? value / total : 0;
  return toPercent(ratio, 2);
};

const toPercent = (decimal: number, fixed = 0) =>
  (decimal * 100).toFixed(fixed);

const ResultsChart: React.FC<IProps> = ({ orgSlug, projectSlug }) => {
  const [{ data }] = useProjectRunsSubscription({
    variables: { orgSlug, projectSlug },
  });

  const lineProps = {
    type: "monotone",
    strokeWidth: 2,
    unit: "%",
    stackId: "1",
  } as const;

  return (
    <ResponsiveContainer width="50%" minWidth={300} height={300}>
      <AreaChart
        data={data?.project?.[0].run.map(run => {
          const success: number = run.paths.reduce(
            (acc, path) => acc + (path.blocks_success ?? 0),
            0
          );
          const failed: number = run.paths.reduce(
            (acc, path) => acc + (path.blocks_failed ?? 0),
            0
          );
          const runned: number = run.paths
            .filter(path => path.finished_at)
            .reduce((acc, path) => acc + (path.blocks_count ?? 0), 0);
          const count: number = run.paths.reduce(
            (acc, path) => acc + (path.blocks_count ?? 0),
            0
          );
          return {
            name: "#" + run.id,
            success: getPercent(success, count),
            failed: getPercent(failed, count),
            blocked: getPercent(runned - success - failed, count),
            notRun: getPercent(count - runned, count),
          };
        })}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" reversed />
        <YAxis unit="%" ticks={[0, 25, 50, 75, 100]} domain={[0, 100]} />
        <YAxis orientation="right" />
        <Tooltip />
        <Area dataKey="failed" fill="#ff0000" stroke="#ff0000" {...lineProps} />
        <Area
          dataKey="blocked"
          fill="#515552"
          stroke="#515552"
          {...lineProps}
        />
        <Area
          dataKey="success"
          fill="#2edd49"
          stroke="#2edd49"
          {...lineProps}
        />
        <Area dataKey="notRun" fill="#e1e9e3" stroke="#b0b8b2" {...lineProps} />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ResultsChart;
