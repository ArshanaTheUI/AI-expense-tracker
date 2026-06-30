import useExpenseStore from "../store/useExpenseStore";
import SummaryCard from "../components/Dashboard/SummaryCard";
import MonthlyExpenseChart from "../components/Dashboard/MonthlyExpenseChart";
import CategoryPieChart from "../components/Dashboard/CategoryPieChart";

export default function Dashboard() {
  const transactions = useExpenseStore(
    (state) => state.transactions
  );

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance =
    totalIncome - totalExpense;

  const cashBalance = transactions
    .filter(
      (t) => t.account === "cash"
    )
    .reduce(
      (sum, t) =>
        t.type === "income"
          ? sum + t.amount
          : sum - t.amount,
      0
    );

  const bankBalance = transactions
    .filter(
      (t) => t.account === "bank"
    )
    .reduce(
      (sum, t) =>
        t.type === "income"
          ? sum + t.amount
          : sum - t.amount,
      0
    );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <SummaryCard
          title="Income"
          amount={totalIncome}
          bgColor="bg-green-500"
        />

        <SummaryCard
          title="Expense"
          amount={totalExpense}
          bgColor="bg-red-500"
        />

        <SummaryCard
          title="Balance"
          amount={balance}
          bgColor="bg-blue-500"
        />

        <SummaryCard
          title="Cash"
          amount={cashBalance}
          bgColor="bg-purple-500"
        />

        <SummaryCard
          title="Bank"
          amount={bankBalance}
          bgColor="bg-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyExpenseChart />
        <CategoryPieChart />
      </div>
    </div>
  );
}