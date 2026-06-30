import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import useExpenseStore from "../store/useExpenseStore";
import { useState } from "react";
export default function AddTransaction() {
    const [showCategoryModal, setShowCategoryModal] =
  useState(false);

const [newCategory, setNewCategory] =
  useState("");

const addCategory = useExpenseStore(
  (state) => state.addCategory
);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      type: "expense",
      recurring: false,
      frequency: "",
    },
  });

  const transactionType = watch("type");
  const recurring = watch("recurring");

  const addTransaction = useExpenseStore(
    (state) => state.addTransaction
  );

  const categories = useExpenseStore(
    (state) => state.categories
  );

  const onSubmit = (data) => {
    addTransaction({
      id: uuidv4(),
      type: data.type,
      amount: Number(data.amount),
      category: data.category,
      account: data.account,
      date: data.date,
      notes: data.notes,
      recurring: data.recurring,
      frequency: data.frequency,
    });

    reset({
      type: data.type,
      recurring: false,
      frequency: "",
      amount: "",
      category: "",
      account: "bank",
      date: "",
      notes: "",
    });
  };

  return (
    <div className="max-w-3xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        Add Transaction
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-lg p-6 space-y-5"
      >

        {/* Toggle */}

        <div className="flex bg-gray-100 rounded-xl p-1">

          <button
            type="button"
            onClick={() =>
              setValue("type", "income")
            }
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              transactionType === "income"
                ? "bg-green-500 text-white shadow"
                : "text-gray-700"
            }`}
          >
            💰 Income
          </button>

          <button
            type="button"
            onClick={() =>
              setValue("type", "expense")
            }
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              transactionType === "expense"
                ? "bg-red-500 text-white shadow"
                : "text-gray-700"
            }`}
          >
            💸 Expense
          </button>

        </div>

        <input
          type="hidden"
          {...register("type")}
        />

        {/* Amount */}

        <div>
          <label className="font-semibold">
            Amount
          </label>

          <input
            {...register("amount", {
              required: true,
            })}
            type="number"
            placeholder="Enter amount"
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        {/* Category */}


<div>
  <label className="font-semibold">
    Category
  </label>

  <div className="flex gap-2 mt-2">

    <select
      {...register("category")}
      className="flex-1 border rounded-lg p-3"
    >
      <option value="">
        Select Category
      </option>

      {categories.map((category) => (
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      ))}
    </select>

    <button
      type="button"
      onClick={() =>
        setShowCategoryModal(true)
      }
      className="w-12 bg-blue-600 text-white rounded-lg text-2xl"
    >
      +
    </button>

  </div>
  {showCategoryModal && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

    <div className="bg-white rounded-xl p-6 w-96">

      <h2 className="text-xl font-bold mb-4">
        Add Category
      </h2>

      <input
        value={newCategory}
        onChange={(e) =>
          setNewCategory(e.target.value)
        }
        placeholder="Category Name"
        className="w-full border p-3 rounded mb-4"
      />

      <div className="flex justify-end gap-3">

        <button
          onClick={() =>
            setShowCategoryModal(false)
          }
          className="px-4 py-2 rounded bg-gray-300"
        >
          Cancel
        </button>

        <button
          onClick={() => {
            if (!newCategory.trim()) return;

            addCategory(newCategory);

            setShowCategoryModal(false);

            setNewCategory("");
          }}
          className="px-4 py-2 rounded bg-blue-600 text-white"
        >
          Add
        </button>

      </div>

    </div>

  </div>
)}
</div>






          {/* <select
            {...register("category")}
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select> */}
       

        {/* Account */}

        <div>
          <label className="font-semibold">
            Account
          </label>

          <select
            {...register("account")}
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="bank">
              🏦 Bank
            </option>

            <option value="cash">
              💵 Cash
            </option>
          </select>
        </div>

        {/* Date */}

        <div>
          <label className="font-semibold">
            Date
          </label>

          <input
            type="date"
            {...register("date")}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        {/* Notes */}

        <div>
          <label className="font-semibold">
            Notes
          </label>

          <textarea
            {...register("notes")}
            rows={4}
            placeholder="Write notes..."
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        {/* Recurring */}

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register("recurring")}
          />

          Recurring Transaction
        </label>

        {recurring && (
          <div>

            <label className="font-semibold">
              Frequency
            </label>

            <select
              {...register("frequency")}
              className="w-full border rounded-lg p-3 mt-2"
            >
              <option value="">
                Select Frequency
              </option>

              <option value="weekly">
                Weekly
              </option>

              <option value="monthly">
                Monthly
              </option>

              <option value="yearly">
                Yearly
              </option>
            </select>

          </div>
        )}

        <button
          type="submit"
          className={`w-full py-3 rounded-lg text-white text-lg font-bold transition ${
            transactionType === "income"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {transactionType === "income"
            ? "Save Income"
            : "Save Expense"}
        </button>

      </form>

    </div>
  );
}