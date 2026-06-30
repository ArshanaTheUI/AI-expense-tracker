import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import useExpenseStore from "../../store/useExpenseStore";

export default function MonthlyExpenseChart() {
  const transactions = useExpenseStore(
    (state) => state.transactions
  );

  const monthlyData = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      const month = new Date(
        t.date
      ).toLocaleString("default", {
        month: "short",
      });

      monthlyData[month] =
        (monthlyData[month] || 0) +
        t.amount;
    });

  const data = Object.keys(
    monthlyData
  ).map((month) => ({
    month,
    amount: monthlyData[month],
  }));

  return (
  <div className="bg-white p-5 rounded-lg shadow">
    <h2 className="text-xl font-bold mb-4 text-black">
      Monthly Expenses
    </h2>

    <div className="bg-white">
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar
            dataKey="amount"
            fill="#3b82f6"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
}