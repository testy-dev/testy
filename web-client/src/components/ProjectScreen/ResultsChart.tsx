import React from "react";

import {
  CartesianGrid,
  Line,
  LineChart,
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
  } as const;

  return (
    <LineChart
      width={600}
      height={300}
      data={data?.project?.[0].run.map(run => {
        const success: number = run.paths.reduce(
          (acc, path) => acc + (path.blocks_success ?? 0),
          0
        );
        const failed: number = run.paths.reduce(
          (acc, path) => acc + (path.blocks_failed ?? 0),
          0
        );
        const count: number = run.paths.reduce(
          (acc, path) => acc + (path.blocks_count ?? 0),
          0
        );
        return {
          name: "#" + run.id,
          success: getPercent(success, count),
          failed: getPercent(failed, count),
          blocked: getPercent(count - success - failed, count),
        };
      })}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" reversed />
      <YAxis unit="%" />
      <YAxis orientation="right" />
      <Tooltip />
      <Line dataKey="success" stroke="#2edd49" {...lineProps} />
      <Line dataKey="failed" stroke="#ff0000" {...lineProps} />
      <Line dataKey="blocked" stroke="#515552" {...lineProps} />
    </LineChart>
  );
};

export default ResultsChart;
