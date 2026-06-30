import useExpenseStore from "../../store/useExpenseStore";

import AnalyticsCard from "./AnalyticsCard";

import {
  FaMoneyBillWave,
  FaWallet,
  FaArrowTrendUp,
  FaReceipt,
} from "react-icons/fa6";

export default function AnalyticsCards() {
  const transactions = useExpenseStore(
    (state) => state.transactions
  );

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce(
      (sum, t) => sum + t.amount,
      0
    );

  const totalExpense = transactions
    .filter((t) => t.type === "expense")
    .reduce(
      (sum, t) => sum + t.amount,
      0
    );

  const savings =
    totalIncome - totalExpense;

  const transactionCount =
    transactions.length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

      <AnalyticsCard
        title="Income"
        value={`₹${totalIncome}`}
        icon={<FaArrowTrendUp />}
        color="border-green-500"
      />

      <AnalyticsCard
        title="Expense"
        value={`₹${totalExpense}`}
        icon={<FaMoneyBillWave />}
        color="border-red-500"
      />

      <AnalyticsCard
        title="Savings"
        value={`₹${savings}`}
        icon={<FaWallet />}
        color="border-blue-500"
      />

      <AnalyticsCard
        title="Transactions"
        value={transactionCount}
        icon={<FaReceipt />}
        color="border-orange-500"
      />

    </div>
  );
}