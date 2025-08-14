import { Bar, Line, Pie } from "react-chartjs-2";
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

const RetraitHTGChart = ({ data }) => {
  const chartKey = data.map((item) => item.date).join("-");
  const labels = data.map((item) => format(new Date(item.date), "dd/MM"));
  const totalData = data.map((item) => item.total);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Retrait (HTG)",
        data: totalData,
        borderColor: "#4caf50",
        backgroundColor: "#4caf50",
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

export default RetraitHTGChart;
