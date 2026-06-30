import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import useExpenseStore from "../../store/useExpenseStore";

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A855F7",
  "#EF4444",
];

export default function CategoryPieChart() {
  const transactions = useExpenseStore(
    (state) => state.transactions
  );

  const categoryData = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      categoryData[t.category] =
        (categoryData[t.category] || 0) +
        t.amount;
    });

  const data = Object.keys(categoryData).map(
    (category) => ({
      name: category,
      value: categoryData[category],
    })
  );

  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Expense By Category
      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={
                  COLORS[
                    index % COLORS.length
                  ]
                }
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}