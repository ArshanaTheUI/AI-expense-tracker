import { useState } from "react";

export default function Savings() {
  const [goal, setGoal] = useState(100000);
  const [saved, setSaved] = useState(25000);

  const percentage = Math.min(
    (saved / goal) * 100,
    100
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Savings Goal
      </h1>

      <div className="bg-white p-5 rounded shadow">
        <input
          type="number"
          value={goal}
          onChange={(e) =>
            setGoal(Number(e.target.value))
          }
          className="border p-3 rounded w-full mb-3"
        />

        <input
          type="number"
          value={saved}
          onChange={(e) =>
            setSaved(Number(e.target.value))
          }
          className="border p-3 rounded w-full mb-4"
        />

        <div className="w-full bg-gray-200 rounded-full h-5">
          <div
            className="bg-green-500 h-5 rounded-full"
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>

        <p className="mt-3">
          ₹{saved} / ₹{goal}
        </p>

        <p>
          {percentage.toFixed(0)}%
          Completed
        </p>
      </div>
    </div>
  );
}