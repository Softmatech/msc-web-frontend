import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const DepotUSDChart = ({ data }) => {
  const labels = data?.map((item) => format(new Date(item.date), "dd/MM"));
  const totalData = data?.map((item) => item.total);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Depot (USD)",
        data: totalData,
        borderColor: "#4caf50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Les 7 derniers jours</h2>
      <Line data={chartData} />
    </div>
  );
};

export default DepotUSDChart;
