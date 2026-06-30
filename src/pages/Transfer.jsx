import { useState } from "react";
import useExpenseStore from "../store/useExpenseStore";

export default function Transfer() {
  const accounts = useExpenseStore(
    (state) => state.accounts
  );

  const transferMoney = useExpenseStore(
    (state) => state.transferMoney
  );

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Transfer Money
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">

        <label className="font-semibold">
          From
        </label>

        <select
          value={from}
          onChange={(e) =>
            setFrom(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        >
          <option value="">
            Select Account
          </option>

          {accounts.map((a) => (
            <option
              key={a.id}
              value={a.id}
            >
              {a.name}
            </option>
          ))}
        </select>

        <label className="font-semibold">
          To
        </label>

        <select
          value={to}
          onChange={(e) =>
            setTo(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        >
          <option value="">
            Select Account
          </option>

          {accounts.map((a) => (
            <option
              key={a.id}
              value={a.id}
            >
              {a.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value)
          }
          className="w-full border p-3 rounded mb-4"
        />

        <button
          onClick={() => {
            transferMoney(
              Number(from),
              Number(to),
              Number(amount)
            );

            setFrom("");
            setTo("");
            setAmount("");
          }}
          className="bg-blue-600 text-white px-5 py-3 rounded"
        >
          Transfer
        </button>

      </div>
    </div>
  );
}