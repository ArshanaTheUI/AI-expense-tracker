import { useParams } from "react-router-dom";
import useExpenseStore from "../store/useExpenseStore";

export default function TransactionDetails() {
  const { id } = useParams();

  const transaction =
    useExpenseStore((state) =>
      state.transactions.find(
        (t) => t.id === id
      )
    );

  if (!transaction) {
    return <p>Not Found</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">
        Transaction Details
      </h1>

      <p>
        Category:
        {transaction.category}
      </p>

      <p>
        Amount:
        ₹{transaction.amount}
      </p>

      <p>
        Type:
        {transaction.type}
      </p>

      <p>
        Account:
        {transaction.account}
      </p>

      <p>
        Date:
        {transaction.date}
      </p>

      <p>
        Notes:
        {transaction.notes}
      </p>
    </div>
  );
}