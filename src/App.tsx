import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import type { ChartData } from "chart.js";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

interface GroupedValue {
  label: string;
  values: number[];
}

export interface ComparisonChartResponse {
  labels: string[];
  groupedIssuesDone: GroupedValue[];
}

export interface StatisticsChartsResponse {
  labels: string[];
  issuesDone: number[];
  minIssuesDone: number[];
  maxIssuesDone: number[];
  averages: number[];
}


export function App() {
  const [flairsTechVsNonChartDate, setFlairsTechVsNonChartDate] = useState<ChartData<
    "bar",
    number[],
    string
  > | null>(null);

  const [statisticsChartsData, setStatisticsChartData] = useState<ChartData<
    "line",
    number[],
    string
  > | null>(null);

  useEffect(() => {
    // fetch("https://localhost:7028/api/Charts/FlairstechVsNonChart")
    //.then((response) => response.json())
    Promise.resolve({
      "labels": [
        "2023-01",
        "2023-02",
        "2023-03",
        "2023-04",
        "2023-05",
        "2023-06",
        "2023-07"
      ],
      "groupedIssuesDone": [
        {
          "label": "Non Flairstech Employee",
          "values": [
            70,
            144,
            119,
            77,
            219,
            138,
            55
          ]
        },
        {
          "label": "Flairstech Employee",
          "values": [
            2,
            1,
            3
          ]
        },
        {
          "label": "UnAssigned",
          "values": [
            11,
            4,
            19,
            5,
            42,
            20,
            3
          ]
        }
      ]
    })
      .then((responseData: ComparisonChartResponse) => {
        const data = {
          labels: responseData.labels,
          datasets: [
            ...responseData.groupedIssuesDone.map((groupedValue) => {
              const color =
                groupedValue.label === "UnAssigned"
                  ? "#C9C9C9"
                  : groupedValue.label === "Flairstech Employee"
                    ? "#D13B27"
                    : "#5AC1CE";
              return {
                type: "bar" as const,
                label: groupedValue.label,
                data: groupedValue.values,
                borderWidth: 2,
                fill: true,
                borderColor: color,
                backgroundColor: color,
              };
            })
          ]
        };

        setFlairsTechVsNonChartDate(data);
      });

    // fetch("https://localhost:7028/api/Charts/StatisticsCharts")
    //   .then((response) => response.json())
    Promise.resolve({
      "labels": [
        "2023-01",
        "2023-02",
        "2023-03",
        "2023-04",
        "2023-05",
        "2023-06",
        "2023-07"
      ],
      "issuesDone": [
        20,
        147,
        135,
        82,
        262,
        150,
        57
      ],
      "minIssuesDone": [
        20,
        38,
        8,
        1,
        2,
        1,
        29
      ],
      "maxIssuesDone": [
        63,
        147,
        135,
        82,
        262,
        150,
        57
      ],
      "averages": [
        39,
        110.66666666666667,
        81,
        60.75,
        170.75,
        90.6,
        47.666666666666664
      ]
    })
      .then((responseData: StatisticsChartsResponse) => {
        console.log(responseData);
        const data = {
          labels: responseData.labels,
          datasets: [
            {
              type: "line" as const,
              label: "Your data",
              data: responseData.issuesDone,
              borderWidth: 2,
              fill: true,
              borderColor: "#5AC1CE",
              backgroundColor: "#5AC1CE"
            },
            {
              type: "line" as const,
              label: "Min",
              data: responseData.minIssuesDone,
              borderWidth: 2,
              fill: true,
              borderColor: "#D13B27",
              backgroundColor: "#D13B27"
            },
            {
              type: "line" as const,
              label: "Max",
              data: responseData.maxIssuesDone,
              borderWidth: 2,
              fill: true,
              borderColor: "#234F1E",
              backgroundColor: "#234F1E"
            },
            {
              type: "line" as const,
              label: "Average",
              data: responseData.averages,
              borderWidth: 2,
              fill: true,
              borderColor: "#C9C9C9",
              backgroundColor: "#C9C9C9"
            }
          ]
        };
        setStatisticsChartData(data);
      });
  }, []);

  return <div>
    {flairsTechVsNonChartDate ? <Chart type="bar" data={flairsTechVsNonChartDate} width={750} height={750} /> : <div>Loading...</div>}
    {statisticsChartsData ? <Chart type="line" data={statisticsChartsData} width={750} height={750} /> : <div>Loading...</div>}

  </div>;
}
