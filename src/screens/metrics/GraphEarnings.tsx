import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// font icons
import { faEuroSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  graphData: any;
  yearMetrics: any;
}

const GraphEarnings = (props: Props) => {
  const [yearlyEarnings, setYearlyEarnings] = useState(0);
  const calcEarnings = () => {
    let sum = 0;

    if (!isNaN(props.yearMetrics[0].Earnings)) {
      sum += props.yearMetrics[0].Earnings;
    }

    if (!isNaN(props.yearMetrics[1].Earnings)) {
      sum += props.yearMetrics[1].Earnings;
    }

    if (!isNaN(props.yearMetrics[2].Earnings)) {
      sum += props.yearMetrics[2].Earnings;
    }

    if (!isNaN(props.yearMetrics[3].Earnings)) {
      sum += props.yearMetrics[3].Earnings;
    }

    if (!isNaN(props.yearMetrics[4].Earnings)) {
      sum += props.yearMetrics[4].Earnings;
    }

    if (!isNaN(props.yearMetrics[5].Earnings)) {
      sum += props.yearMetrics[5].Earnings;
    }

    if (!isNaN(props.yearMetrics[6].Earnings)) {
      sum += props.yearMetrics[6].Earnings;
    }
    if (!isNaN(props.yearMetrics[7].Earnings)) {
      sum += props.yearMetrics[7].Earnings;
    }
    if (!isNaN(props.yearMetrics[8].Earnings)) {
      sum += props.yearMetrics[8].Earnings;
    }
    if (!isNaN(props.yearMetrics[9].Earnings)) {
      sum += props.yearMetrics[9].Earnings;
    }
    if (!isNaN(props.yearMetrics[10].Earnings)) {
      sum += props.yearMetrics[10].Earnings;
    }
    if (!isNaN(props.yearMetrics[11].Earnings)) {
      sum += props.yearMetrics[11].Earnings;
    }
    setYearlyEarnings(sum);
  };

  useEffect(() => {
    calcEarnings();
  }, []);

  return (
    <div>
      <ResponsiveContainer width="99%" height={400}>
        <BarChart
          data={props.graphData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Earnings" fill="var(--bs-purple)" />
        </BarChart>
      </ResponsiveContainer>
      <hr />
      <div className="mt-3">
        <b>
          Total Earnings:
          {yearlyEarnings}
          <span className="px-1">
            <FontAwesomeIcon
              icon={faEuroSign}
              style={{ color: "var(--bs-dark)" }}
            />
          </span>
        </b>
      </div>
    </div>
  );
};

export default GraphEarnings;
