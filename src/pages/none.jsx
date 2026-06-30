import useExpenseStore from "../store/useExpenseStore";
import { useState } from "react";
import SummaryCard from "../components/Dashboard/SummaryCard";
import MonthlyExpenseChart from "../components/Dashboard/MonthlyExpenseChart";
import CategoryPieChart from "../components/Dashboard/CategoryPieChart";
import { exportToCSV } from "../utils/exportCSV";
import { FaMoon } from "react-icons/fa";

export default function Dashboard() {
    const toggleDarkMode = useExpenseStore(
        (state) => state.toggleDarkMode
    );
      const darkMode = useExpenseStore(
        (state) => state.darkMode
    );
    const [sortBy, setSortBy] = useState("latest");
  
    const transactions = useExpenseStore(
        (state) => state.transactions
    );

    const deleteTransaction = useExpenseStore(
        (state) => state.deleteTransaction
    );
    const [editingTransaction, setEditingTransaction] =
        useState(null);

    const updateTransaction =
        useExpenseStore(
            (state) => state.updateTransaction
        );
    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpense;

    const cashIncome = transactions
        .filter(
            (t) =>
                t.type === "income" &&
                t.account === "cash"
        )
        .reduce((sum, t) => sum + t.amount, 0);

    const cashExpense = transactions
        .filter(
            (t) =>
                t.type === "expense" &&
                t.account === "cash"
        )
        .reduce((sum, t) => sum + t.amount, 0);

    const bankIncome = transactions
        .filter(
            (t) =>
                t.type === "income" &&
                t.account === "bank"
        )
        .reduce((sum, t) => sum + t.amount, 0);

    const bankExpense = transactions
        .filter(
            (t) =>
                t.type === "expense" &&
                t.account === "bank"
        )
        .reduce((sum, t) => sum + t.amount, 0);

    const cashBalance = cashIncome - cashExpense;
    const bankBalance = bankIncome - bankExpense;
    const [search, setSearch] = useState("");
    const [monthFilter, setMonthFilter] =
        useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    return (
        <div
            className={
                darkMode
                    ? "bg-slate-900 text-white min-h-screen"
                    : "bg-slate-100 text-black min-h-screen"
            }
        >

            <h1 className="text-3xl font-bold mb-6">
                Dashboard </h1>
            <ul>
                <li>
                    <button
                        onClick={toggleDarkMode}
                        className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-slate-800"
                    >
                        <FaMoon />
                        Dark Mode
                    </button>
                </li>
            </ul>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">  <SummaryCard
                title="Income"
                amount={totalIncome}
                bgColor="bg-green-500"
            />

                <SummaryCard
                    title="Expense"
                    amount={totalExpense}
                    bgColor="bg-red-500"
                />

                <SummaryCard
                    title="Balance"
                    amount={balance}
                    bgColor="bg-blue-500"
                />

                <SummaryCard
                    title="Cash"
                    amount={cashBalance}
                    bgColor="bg-purple-500"
                />

                <SummaryCard
                    title="Bank"
                    amount={bankBalance}
                    bgColor="bg-orange-500"
                />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                <MonthlyExpenseChart />
                <CategoryPieChart />
            </div> 
             <div className="bg-white rounded-lg shadow p-5">
                {
                    editingTransaction && (
                        <div className="bg-white p-5 rounded shadow mb-5">
                            <h2 className="font-bold mb-4">
                                Edit Transaction
                            </h2>

                            <input
                                className="border p-2 w-full mb-3"
                                value={
                                    editingTransaction.category
                                }
                                onChange={(e) =>
                                    setEditingTransaction({
                                        ...editingTransaction,
                                        category: e.target.value,
                                    })
                                }
                            />

                            <input
                                type="number"
                                className="border p-2 w-full mb-3"
                                value={
                                    editingTransaction.amount
                                }
                                onChange={(e) =>
                                    setEditingTransaction({
                                        ...editingTransaction,
                                        amount: Number(
                                            e.target.value
                                        ),
                                    })
                                }
                            />

                            <button
                                onClick={() => {
                                    updateTransaction(
                                        editingTransaction
                                    );

                                    setEditingTransaction(
                                        null
                                    );
                                }}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Save Changes
                            </button>
                        </div>
                    )
                }


                <input
                    type="text"
                    placeholder="Search category..."
                    value={search}
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                    className="border p-3 rounded w-full mb-4"
                />
                <select
                    value={monthFilter}
                    onChange={(e) =>
                        setMonthFilter(e.target.value)
                    }
                    className="border p-3 rounded mb-4 ml-2"
                >
                    <option value="">All Months</option>
                    <option value="0">Jan</option>
                    <option value="1">Feb</option>
                    <option value="2">Mar</option>
                    <option value="3">Apr</option>
                    <option value="4">May</option>
                    <option value="5">Jun</option>
                    <option value="6">Jul</option>
                    <option value="7">Aug</option>
                    <option value="8">Sep</option>
                    <option value="9">Oct</option>
                    <option value="10">Nov</option>
                    <option value="11">Dec</option>
                </select>
                <h2 className="text-xl font-bold mb-4">
                    Recent Transactions
                </h2>
                <button
                    onClick={() =>
                        exportToCSV(transactions)
                    }
                    className="bg-green-600 text-white px-4 py-2 rounded mb-4"
                >
                    Export CSV
                </button>



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
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="latest">Latest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Amount</option>
                    <option value="lowest">Lowest Amount</option>
                </select>




                {transactions.length === 0 ? (
                    <p>No transactions found</p>
                ) : (
                    transactions
                        .filter((item) => {
                            const matchesSearch =
                                item.category
                                    .toLowerCase()
                                    .includes(search.toLowerCase());

                            const matchesMonth =
                                monthFilter === "" ||
                                new Date(item.date).getMonth() ===
                                Number(monthFilter);

                            const matchesDate =
                                (!fromDate ||
                                    item.date >= fromDate) &&
                                (!toDate ||
                                    item.date <= toDate);

                            return (
                                matchesSearch &&
                                matchesMonth &&
                                matchesDate
                            );
                        })
                        .slice()
                        .sort((a, b) => {
                            switch (sortBy) {
                                case "oldest":
                                    return new Date(a.date) - new Date(b.date);

                                case "highest":
                                    return b.amount - a.amount;

                                case "lowest":
                                    return a.amount - b.amount;

                                default:
                                    return new Date(b.date) - new Date(a.date);
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

                                <div className="text-right">
                                    <p
                                        className={
                                            item.type === "income"
                                                ? "text-green-600 font-bold"
                                                : "text-red-600 font-bold"
                                        }
                                    >
                                        {item.type === "income"
                                            ? "+"
                                            : "-"}
                                        ₹{item.amount}
                                    </p>

                                   <p className="text-sm text-gray-500">
  {item.account}
</p>

{item.recurring && (
  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
    {item.frequency}
  </span>
)}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() =>
                                            setEditingTransaction(item)
                                        }
                                        className="bg-blue-500 text-white px-3 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteTransaction(item.id)
                                        }
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                )}


            </div>
        </div>

    );
}
