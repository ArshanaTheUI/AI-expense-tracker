import { useState } from "react";
import useExpenseStore from "../store/useExpenseStore";
import { askExpenseAgent } from "../agents/expenseAgent";

export default function AIAssistant() {
  const transactions = useExpenseStore(
    (state) => state.transactions
  );

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">
     Expense AI Assistant
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">

        <textarea
          rows={4}
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          placeholder="Ask anything..."
          className="border w-full p-3 rounded"
        />

        <button
          className="bg-blue-600 text-white px-5 py-3 rounded mt-4"
          onClick={() => {
            const result =
              askExpenseAgent(
                question,
                transactions
              );

            setAnswer(result);
          }}
        >
          Ask AI
        </button>

        {answer && (
          <div className="mt-6 bg-slate-100 p-4 rounded">
            <h2 className="font-bold mb-2">
              AI Response
            </h2>

            <p>{answer}</p>
          </div>
        )}

      </div>
    </div>
  );
}