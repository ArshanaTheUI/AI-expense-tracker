import useExpenseStore from "../../store/useExpenseStore";

export default function EditTransactionModal({
  editingTransaction,
  setEditingTransaction,
}) {

const updateTransaction = useExpenseStore(
  (state) => state.updateTransaction
);

const categories = useExpenseStore(
  (state) => state.categories
);
  if (!editingTransaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6">

        <h2 className="text-2xl font-bold mb-5">
          Edit Transaction
        </h2>

        <div className="space-y-4">

          <input
            className="w-full border rounded-lg p-3"
            placeholder="Category"
            value={editingTransaction.category}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                category: e.target.value,
              })
            }
          />

          <input
            type="number"
            className="w-full border rounded-lg p-3"
            placeholder="Amount"
            value={editingTransaction.amount}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                amount: Number(
                  e.target.value
                ),
              })
            }
          />

          <input
            type="date"
            className="w-full border rounded-lg p-3"
            value={editingTransaction.date}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                date: e.target.value,
              })
            }
          />

          <select
            className="w-full border rounded-lg p-3"
            value={editingTransaction.account}
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                account: e.target.value,
              })
            }
          >
            <option value="bank">
              Bank
            </option>

            <option value="cash">
              Cash
            </option>
          </select>

          <textarea
            rows={3}
            className="w-full border rounded-lg p-3"
            placeholder="Notes"
            value={
              editingTransaction.notes || ""
            }
            onChange={(e) =>
              setEditingTransaction({
                ...editingTransaction,
                notes: e.target.value,
              })
            }
          />

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={() =>
              setEditingTransaction(null)
            }
            className="bg-gray-300 px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              updateTransaction(
                editingTransaction
              );
              setEditingTransaction(null);
            }}
            className="bg-green-600 text-white px-5 py-2 rounded-lg"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}