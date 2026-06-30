import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import useExpenseStore from "../store/useExpenseStore";

export default function Expenses() {
const { register, handleSubmit, reset } = useForm();

const addTransaction = useExpenseStore(
(state) => state.addTransaction
);
const categories = useExpenseStore(
(state) => state.categories
);

const onSubmit = (data) => {
addTransaction({
id: uuidv4(),
type: "expense",
amount: Number(data.amount),
category: data.category,
account: data.account,
date: data.date,
recurring: data.recurring,
frequency: data.frequency
});


reset();


};

return ( <div className="max-w-2xl"> <h1 className="text-3xl font-bold mb-6">
Add Expense </h1>

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="bg-white p-6 rounded-lg shadow space-y-4"
  >
    <input
      {...register("amount")}
      type="number"
      placeholder="Amount"
      className="w-full border p-3 rounded"
    />
{/* 
    <input
      {...register("category")}
      placeholder="Category"
      className="w-full border p-3 rounded"
    /> */}

<select
{...register("category")}
className="w-full border p-3 rounded"

>

{categories.map((category) => ( <option
   key={category}
   value={category}
 >
{category} </option>
))} </select>

    <select
      {...register("account")}
      className="w-full border p-3 rounded"
    >
      <option value="bank">Bank</option>
      <option value="cash">Cash</option>
    </select>

    <input
      {...register("date")}
      type="date"
      className="w-full border p-3 rounded"
    />

    <button
      type="submit"
      className="bg-red-600 text-white px-5 py-3 rounded"
    >
      Save Expense
    </button>
  </form>
</div>


);
}
