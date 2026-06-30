import { useState } from "react";
import { Link } from "react-router-dom";
import useExpenseStore from "../store/useExpenseStore";
import { exportToCSV } from "../utils/exportCSV";

export default function Transactions() {
  const transactions = useExpenseStore(
    (state) => state.transactions
  );

  const deleteTransaction =
    useExpenseStore(
      (state) => state.deleteTransaction
    );

  const [search, setSearch] =
    useState("");

  const [monthFilter, setMonthFilter] =
    useState("");

  const [sortBy, setSortBy] =
    useState("latest");

  const [fromDate, setFromDate] =
    useState("");

  const [toDate, setToDate] =
    useState("");

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Transactions
      </h1>

      <button
        onClick={() =>
          exportToCSV(transactions)
        }
        className="bg-green-600 text-white px-4 py-2 rounded mb-4"
      >
        Export CSV
      </button>

      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="border p-3 rounded w-full mb-4"
      />

      <div className="flex gap-3 mb-4">
        <input
          type="date"
          value={fromDate}
          onChange={(e) =>
            setFromDate(e.target.value)
          }
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) =>
            setToDate(e.target.value)
          }
          className="border p-2 rounded"
        />
      </div>

      <select
        value={monthFilter}
        onChange={(e) =>
          setMonthFilter(e.target.value)
        }
        className="border p-2 rounded mb-4"
      >
        <option value="">
          All Months
        </option>

        {[
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ].map((month, index) => (
          <option
            key={index}
            value={index}
          >
            {month}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(e.target.value)
        }
        className="border p-2 rounded ml-3"
      >
        <option value="latest">
          Latest First
        </option>
        <option value="oldest">
          Oldest First
        </option>
        <option value="highest">
          Highest Amount
        </option>
        <option value="lowest">
          Lowest Amount
        </option>
      </select>

      <div className="bg-white rounded-lg shadow p-5 mt-4">
        {transactions
          .filter((item) => {
            const matchesSearch =
              item.category
                .toLowerCase()
                .includes(
                  search.toLowerCase()
                );

            const matchesMonth =
              monthFilter === "" ||
              new Date(
                item.date
              ).getMonth() ===
                Number(monthFilter);

            const matchesDate =
              (!fromDate ||
                item.date >=
                  fromDate) &&
              (!toDate ||
                item.date <= toDate);

            return (
              matchesSearch &&
              matchesMonth &&
              matchesDate
            );
          })
          .sort((a, b) => {
            switch (sortBy) {
              case "oldest":
                return (
                  new Date(a.date) -
                  new Date(b.date)
                );

              case "highest":
                return (
                  b.amount -
                  a.amount
                );

              case "lowest":
                return (
                  a.amount -
                  b.amount
                );

              default:
                return (
                  new Date(b.date) -
                  new Date(a.date)
                );
            }
          })
          .map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <p className="font-semibold">
                  {item.category}
                </p>

                <p className="text-sm text-gray-500">
                  {item.date}
                </p>
              </div>

              <div>
                ₹{item.amount}
              </div>

              <div className="flex gap-2">
                <Link
                  to={`/transactions/${item.id}`}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  View
                </Link>

                <button
                  onClick={() =>
                    deleteTransaction(
                      item.id
                    )
                  }
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}