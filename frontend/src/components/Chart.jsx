import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ incomeAmt, expenseAmt }) {
  const data = {
    labels: ["Income", "Expense"],
    datasets: [
      {
        label: "Income vs Expense",
        data: [incomeAmt, expenseAmt],
        backgroundColor: ["#fff", "#f97316"],
        borderColor: ["#fff", "#f97316"],
        borderWidth: 2,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false, 
  };

  return (
    <div className="w-80 h-80 mx-auto mt-4">
      <Pie data={data} options={options}/>
    </div>
  );
}

export default Chart;