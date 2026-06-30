import { NavLink } from "react-router-dom";
export default function Sidebar() {
const menus = [
{ name: "Dashboard", path: "/" },
// { name: "Income", path: "/income" },
// { name: "Expenses", path: "/expenses" },
{
  name: "Add Transaction",
  path: "/add-transaction",
},
{ name: "Categories", path: "/categories" },
{ name: "Reports", path: "/reports" },
{
  name: "Budget",
  path: "/budget",
},
{
  name: "Savings",
  path: "/savings",
},
{
  name: "ViewDetails",
  path: "/ViewDetails",
},
{
  name: "Transactions",
  path: "/transactions",
},
{
  name: "Accounts",
  path: "/accounts",
},
{
  name: "Transfer",
  path: "/transfer",
},
{
  name: "Analytics",
  path: "/analytics",
},
{
  name: "AI Assistant",
  path: "/ai",
}
];

return (
    //  <aside className="w-64 min-h-screen sticky top-0 bg-slate-900 text-white p-5"> 
     <aside className="w-64 h-screen bg-slate-900 text-white p-5 flex-shrink-0">
     <h1 className="text-2xl font-bold mb-10">
Expense Tracker </h1>

  <nav>
    <ul className="space-y-1">
        
      {menus.map((menu) => (
        <li key={menu.path}>
          <NavLink
            to={menu.path}
            className={({ isActive }) =>
              `block p-3 rounded-lg ${
                isActive
                  ? "bg-blue-600"
                  : "hover:bg-slate-800"
              }`
            }
          >
            {menu.name}
          </NavLink>
        </li>
        
      ))}
    
    </ul>
  </nav>
</aside>

);
}
