export const exportToCSV = (transactions) => {
  const headers = [
    "Date",
    "Category",
    "Type",
    "Account",
    "Amount",
  ];

  const rows = transactions.map((item) => [
    item.date,
    item.category,
    item.type,
    item.account,
    item.amount,
  ]);

  const csvContent = [
    headers,
    ...rows,
  ]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  const link =
    document.createElement("a");

  const url =
    URL.createObjectURL(blob);

  link.href = url;

  link.download =
    "transactions.csv";

  link.click();
};