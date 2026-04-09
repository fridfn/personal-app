import { Radar } from "react-chartjs-2";
import { useMood } from "@/hooks/useMood"
import { useCSSVariables } from "@/hooks/useCSSVariables"
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({
  title = "Default Radar Chart",
  description = "default description",
  labels = [],
  datasets = [],
  borderWidth = 3,
}) => {
  const data = { labels, datasets };
  const { primaryColorText, iconColor } = useCSSVariables(["--primary-color-text", "--icon-color"])
  const root = document?.documentElement;
  const options = {
    elements: {
      line: {
        borderWidth,
      },
    },
    plugins: {
      legend: {
       align: "center",
       display: false,
       position: "bottom",
       labels: {
         font: {
           size: 13,
           weight: "normal"
         },
         boxWidth: 0,
         padding: 10,
         usePointStyle: false
       }
      },
      title: {
        display: true,
        text: title,
        font: { size: 16 },
      },
    },
    scales: {
      r: {
        ticks: {
          display: true,
          color: primaryColorText,
          backdropColor: "transparent",
          showLabelBackdrop: false,
        },
        grid: {
          color: iconColor,
        },
        angleLines: {
          color: iconColor,
        },
        pointLabels: {
          color: primaryColorText,
          font: {
            size: 12,
            weight: "bold"
          },
        },
      },
    },
  };
  
  return (
    <div className="chartjs" id="wrapper-mood-picker">
      <Radar data={data} options={options} />
      <div className="box-description">
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default RadarChart;