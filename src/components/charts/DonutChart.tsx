import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { colors } from "@/styles/variables";

const data = {
  labels: [
    "Applied/processing",
    "Offered",
    "Accepted",
    "Denied/withdrawn/ghosted",
  ],
  datasets: [
    {
      label: "Applications",
      data: [300, 50, 100, 70],
      backgroundColor: [
        colors.yellow300,
        colors.blue400,
        colors.green500,
        colors.red500,
      ],
      hoverOffset: 5,
    },
  ],
};

const DonutChart = () => {
  return <Doughnut data={data} options={{ responsive: true, spacing: 1 }} />;
};

export default DonutChart;
