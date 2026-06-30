import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import useExpenseStore from "../store/useExpenseStore";

export default function Income() {
const { register, handleSubmit, reset } = useForm();
// const [recurring, setRecurring]
// const [frequency, setFrequency]
const addTransaction = useExpenseStore(
(state) => state.addTransaction
);
const categories = useExpenseStore(
(state) => state.categories
);

const onSubmit = (data) => {
    console.log(data);
addTransaction({
id: uuidv4(),
type: "income",
amount: Number(data.amount),
category: data.category,
account: data.account,
date: data.date,
notes: data.notes,
recurring: data.recurring,
frequency: data.frequency
});


reset();

};

return ( <div className="max-w-2xl"> <h1 className="text-3xl font-bold mb-6">
Add Income </h1>

  <form
    onSubmit={handleSubmit(onSubmit)}
    className="space-y-4 bg-white p-6 rounded-lg shadow"
  >
    <input
      {...register("amount")}
      type="number"
      placeholder="Amount"
      className="w-full border p-3 rounded"
    />

    {/* <input
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

    <textarea
      {...register("notes")}
      placeholder="Notes"
      className="w-full border p-3 rounded"
    />
<label className="flex items-center gap-2">
  <input
    type="checkbox"
    {...register("recurring")}
  />
  Recurring Transaction
</label>

<select
  {...register("frequency")}
  className="w-full border p-3 rounded"
>
  <option value="">
    Select Frequency
  </option>

  <option value="monthly">
    Monthly
  </option>

  <option value="weekly">
    Weekly
  </option>

  <option value="yearly">
    Yearly
  </option>
</select>
    <button
      className="bg-green-600 text-white px-5 py-3 rounded"
      type="submit"
    >
      Save Income
    </button>
  </form>
</div>

);
}
