import { useState } from "react";
import useExpenseStore from "../store/useExpenseStore";

export default function Budget() {
    const transactions = useExpenseStore(
  (state) => state.transactions
);
  const [category, setCategory] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const budgets = useExpenseStore(
    (state) => state.budgets
  );

  const addBudget = useExpenseStore(
    (state) => state.addBudget
  );

  const deleteBudget =
    useExpenseStore(
      (state) => state.deleteBudget
    );
const [editingBudget, setEditingBudget] =
  useState(null);

const updateBudget =
  useExpenseStore(
    (state) => state.updateBudget
  );
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Budget Planner
      </h1>

      <div className="bg-white p-5 rounded shadow mb-6">
        <input
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="border p-3 rounded mr-3"
        />

        <input
          type="number"
          placeholder="Budget Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="border p-3 rounded mr-3"
        />

        <button
          onClick={() => {
            addBudget({
              category,
              amount: Number(amount),
            });

            setCategory("");
            setAmount("");
          }}
          className="bg-blue-500 text-white px-4 py-3 rounded"
        >
          Add Budget
        </button>
      </div>
{editingBudget && (
  <div className="bg-white p-5 rounded shadow mb-5">
    <h2 className="font-bold mb-4">
      Edit Budget
    </h2>

    <input
      value={editingBudget.category}
      onChange={(e) =>
        setEditingBudget({
          ...editingBudget,
          category: e.target.value,
        })
      }
      className="border p-3 rounded mr-3"
    />

    <input
      type="number"
      value={editingBudget.amount}
      onChange={(e) =>
        setEditingBudget({
          ...editingBudget,
          amount: Number(
            e.target.value
          ),
        })
      }
      className="border p-3 rounded mr-3"
    />

    <button
      onClick={() => {
        updateBudget(
          editingBudget
        );
        setEditingBudget(null);
      }}
      className="bg-green-500 text-white px-4 py-2 rounded"
    >
      Save
    </button>

    <button
      onClick={() =>
        setEditingBudget(null)
      }
      className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
    >
      Cancel
    </button>
  </div>
)}
     <div className="bg-white p-5 rounded shadow">
  {budgets.map((budget) => {
   

const spent = transactions
  .filter(
    (t) =>
      t.type === "expense" &&
      t.category
        .toLowerCase()
        .trim() ===
      budget.category
        .toLowerCase()
        .trim()
  )
  .reduce(
    (sum, t) => sum + Number(t.amount),
    0
  );

    const percentage = Math.min(
      (spent / budget.amount) * 100,
      100
    );

    return (
      <div
        key={budget.category}
        className="border-b py-4"
      >
        <div className="flex justify-between mb-2">
          <span className="font-semibold">
            {budget.category}
          </span>

          <span>
            ₹{spent} / ₹{budget.amount}
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full ${
              spent > budget.amount
                ? "bg-red-500"
                : "bg-green-500"
            }`}
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <div className="flex justify-between mt-2">
          <span>
            {percentage.toFixed(0)}%
          </span>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setEditingBudget({
                  ...budget,
                  originalCategory:
                    budget.category,
                })
              }
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>

            <button
              onClick={() =>
                deleteBudget(
                  budget.category
                )
              }
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  })}
</div>
    </div>
  );
}