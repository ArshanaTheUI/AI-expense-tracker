import { useState } from "react";
import useExpenseStore from "../store/useExpenseStore";

export default function Categories() {
const [category, setCategory] =
useState("");

const categories = useExpenseStore(
(state) => state.categories
);

const addCategory = useExpenseStore(
(state) => state.addCategory
);

const deleteCategory = useExpenseStore(
(state) => state.deleteCategory
);

const handleAdd = () => {
if (!category.trim()) return;


addCategory(category);
setCategory("");


};

return ( <div> <h1 className="text-3xl font-bold mb-6">
Categories </h1>


  <div className="bg-white p-5 rounded-lg shadow">
    <div className="flex gap-3 mb-5">
      <input
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
        placeholder="New Category"
        className="border p-3 rounded flex-1"
      />

      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-5 rounded"
      >
        Add
      </button>
    </div>

    {categories.map((item) => (
      <div
        key={item}
        className="flex justify-between border-b py-3"
      >
        <span>{item}</span>

        <button
          onClick={() =>
            deleteCategory(item)
          }
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Delete
        </button>
      </div>
    ))}
  </div>
</div>


);
}
