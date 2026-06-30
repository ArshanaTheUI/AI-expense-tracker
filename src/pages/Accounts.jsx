import { useState } from "react";
import useExpenseStore from "../store/useExpenseStore";

export default function Accounts() {
  const accounts = useExpenseStore(
    (state) => state.accounts
  );

  const addAccount = useExpenseStore(
    (state) => state.addAccount
  );

  const deleteAccount = useExpenseStore(
    (state) => state.deleteAccount
  );

  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Accounts
      </h1>

      <div className="bg-white p-5 rounded-lg shadow mb-6">
        <input
          placeholder="Account Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border p-3 rounded w-full mb-3"
        />

        <input
          type="number"
          placeholder="Opening Balance"
          value={balance}
          onChange={(e) =>
            setBalance(e.target.value)
          }
          className="border p-3 rounded w-full mb-3"
        />

        <button
          onClick={() => {
            addAccount({
              id: Date.now(),
              name,
              balance: Number(balance),
            });

            setName("");
            setBalance("");
          }}
          className="bg-blue-600 text-white px-4 py-3 rounded"
        >
          Add Account
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {accounts.map((account) => (
          <div
            key={account.id}
            className="bg-white rounded-lg shadow p-5"
          >
            <h2 className="text-xl font-bold">
              {account.name}
            </h2>

            <p className="text-2xl text-green-600 mt-2">
              ₹{account.balance}
            </p>

            <button
              onClick={() =>
                deleteAccount(account.id)
              }
              className="bg-red-500 text-white px-4 py-2 rounded mt-4"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}