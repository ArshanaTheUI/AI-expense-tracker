import { useState } from "react";
import useExpenseStore from "../store/useExpenseStore";

export default function Reports() {
  const transactions = useExpenseStore(
    (state) => state.transactions
  );

  const [selectedMonth, setSelectedMonth] =
    useState("");

  const filteredTransactions =
    selectedMonth === ""
      ? transactions
      : transactions.filter((item) => {
          const month = new Date(
            item.date
          ).getMonth();

          return (
            month + 1 ===
            Number(selectedMonth)
          );
        });

  const totalIncome = filteredTransactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense =
    filteredTransactions
      .filter(
        (t) => t.type === "expense"
      )
      .reduce(
        (sum, t) => sum + t.amount,
        0
      );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Reports
      </h1>

      <select
        value={selectedMonth}
        onChange={(e) =>
          setSelectedMonth(
            e.target.value
          )
        }
        className="border p-3 rounded mb-6"
      >
        <option value="">
          All Months
        </option>

        <option value="1">Jan</option>
        <option value="2">Feb</option>
        <option value="3">Mar</option>
        <option value="4">Apr</option>
        <option value="5">May</option>
        <option value="6">Jun</option>
        <option value="7">Jul</option>
        <option value="8">Aug</option>
        <option value="9">Sep</option>
        <option value="10">Oct</option>
        <option value="11">Nov</option>
        <option value="12">Dec</option>
      </select>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-green-500 text-white p-4 rounded">
          <h3>Income</h3>
          <p className="text-2xl">
            ₹{totalIncome}
          </p>
        </div>

        <div className="bg-red-500 text-white p-4 rounded">
          <h3>Expense</h3>
          <p className="text-2xl">
            ₹{totalExpense}
          </p>
        </div>
      </div>

      <div className="bg-white p-5 rounded shadow">
        {filteredTransactions.map(
          (item) => (
            <div
              key={item.id}
              className="border-b py-3"
            >
              <p>
                {item.category}
              </p>

              <p>
                ₹{item.amount}
              </p>

              <p>
                {item.date}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}