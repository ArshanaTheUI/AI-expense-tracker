import { create } from "zustand";

const useExpenseStore = create((set) => ({
    darkMode: false,

toggleDarkMode: () =>
  set((state) => ({
    darkMode: !state.darkMode,
  })),
  transactions:
    JSON.parse(
      localStorage.getItem("transactions")
    ) || [],

  categories:
    JSON.parse(
      localStorage.getItem("categories")
    ) || [
      "Salary",
      "Food",
      "Travel",
      "Shopping",
      "Medical",
      "Rent",
      "Freelance",
    ],

  addCategory: (category) =>
    set((state) => {
      const updatedCategories = [
        ...state.categories,
        category,
      ];

      localStorage.setItem(
        "categories",
        JSON.stringify(updatedCategories)
      );

      return {
        categories: updatedCategories,
      };
    }),

  deleteCategory: (category) =>
    set((state) => {
      const updatedCategories =
        state.categories.filter(
          (item) => item !== category
        );

      localStorage.setItem(
        "categories",
        JSON.stringify(updatedCategories)
      );

      return {
        categories: updatedCategories,
      };
    }),

  addTransaction: (transaction) =>
    set((state) => {
      const updatedTransactions = [
        ...state.transactions,
        transaction,
      ];

      localStorage.setItem(
        "transactions",
        JSON.stringify(updatedTransactions)
      );

      return {
        transactions: updatedTransactions,
      };
    }),

  deleteTransaction: (id) =>
    set((state) => {
      const updatedTransactions =
        state.transactions.filter(
          (item) => item.id !== id
        );

      localStorage.setItem(
        "transactions",
        JSON.stringify(updatedTransactions)
      );

      return {
        transactions: updatedTransactions,
      };
    }),

  updateTransaction: (updatedTransaction) =>
    set((state) => {
      const updatedTransactions =
        state.transactions.map((item) =>
          item.id === updatedTransaction.id
            ? updatedTransaction
            : item
        );

      localStorage.setItem(
        "transactions",
        JSON.stringify(updatedTransactions)
      );

      return {
        transactions: updatedTransactions,
      };
    }),
    budgets:
  JSON.parse(
    localStorage.getItem("budgets")
  ) || [],

addBudget: (budget) =>
  set((state) => {
    const updatedBudgets = [
      ...state.budgets,
      budget,
    ];

    localStorage.setItem(
      "budgets",
      JSON.stringify(updatedBudgets)
    );

    return {
      budgets: updatedBudgets,
    };
  }),

deleteBudget: (category) =>
  set((state) => {
    const updatedBudgets =
      state.budgets.filter(
        (item) =>
          item.category !== category
      );

    localStorage.setItem(
      "budgets",
      JSON.stringify(updatedBudgets)
    );

    return {
      budgets: updatedBudgets,
    };
  }),

  updateBudget: (updatedBudget) =>
  set((state) => {
    const updatedBudgets =
      state.budgets.map((budget) =>
        budget.category ===
        updatedBudget.originalCategory
          ? {
              category:
                updatedBudget.category,
              amount:
                updatedBudget.amount,
            }
          : budget
      );

    localStorage.setItem(
      "budgets",
      JSON.stringify(updatedBudgets)
    );

    return {
      budgets: updatedBudgets,
    };
  }),
  accounts:
  JSON.parse(
    localStorage.getItem("accounts")
  ) || [
    {
      id: 1,
      name: "Cash",
      balance: 0,
    },
    {
      id: 2,
      name: "Bank",
      balance: 0,
    },
  ],
  addAccount: (account) =>
  set((state) => {
    const updated = [
      ...state.accounts,
      account,
    ];

    localStorage.setItem(
      "accounts",
      JSON.stringify(updated)
    );

    return {
      accounts: updated,
    };
  }),

deleteAccount: (id) =>
  set((state) => {
    const updated =
      state.accounts.filter(
        (a) => a.id !== id
      );

    localStorage.setItem(
      "accounts",
      JSON.stringify(updated)
    );

    return {
      accounts: updated,
    };
  }),
  transferMoney: (fromId, toId, amount) =>
  set((state) => {

    const updated = state.accounts.map(
      (account) => {

        if (account.id === fromId) {
          return {
            ...account,
            balance:
              account.balance - amount,
          };
        }

        if (account.id === toId) {
          return {
            ...account,
            balance:
              account.balance + amount,
          };
        }

        return account;
      }
    );

    localStorage.setItem(
      "accounts",
      JSON.stringify(updated)
    );

    return {
      accounts: updated,
    };
  }),
}));

export default useExpenseStore;