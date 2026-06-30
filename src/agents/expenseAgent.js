export function askExpenseAgent(question, transactions) {
  const q = question.toLowerCase();

  // Total Income
  if (q.includes("total income")) {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    return `Your total income is ₹${income}.`;
  }

  // Total Expense
  if (q.includes("total expense")) {
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return `Your total expense is ₹${expense}.`;
  }

  // Current Balance
  if (q.includes("balance")) {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return `Your current balance is ₹${income - expense}.`;
  }

  return "Sorry, I don't understand that question yet.";
}