import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Layout/Sidebar";

import Dashboard from "./pages/Dashboard";
import Income from "./pages/Income";
import Expenses from "./pages/Expenses";
import Categories from "./pages/Categories";
import Reports from "./pages/Reports";
import Budgets from "./pages/Budgets";
import Savings from "./pages/Savings";
import ViewDetails from "./pages/ViewDetails";
import Transactions from "./pages/Transactions";
import TransactionDetails from "./pages/TransactionDetails";
import Accounts from "./pages/Accounts";
import Transfer from "./pages/Transfer";
import Analytics from "./pages/Analytics";
import AIAssistant from "./pages/AIAssistant";
function App() {
return ( <div className="flex h-screen overflow-y-auto  "> <Sidebar />

  {/* <main className="flex-1 p-6 bg-slate-100 min-h-screen"> */}
        <main className="flex-1 overflow-y-auto  bg-slate-100 p-6">

    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/income" element={<Income />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/reports" element={<Reports />} />

      <Route
  path="/budget"
  element={<Budgets />}
/>
<Route
  path="/savings"
  element={<Savings />}
/>
<Route
  path="/ViewDetails"
  element={<ViewDetails />}
/>
<Route
  path="/transactions"
  element={<Transactions />}
/>

<Route
  path="/transactions/:id"
  element={<TransactionDetails />}
/>
<Route
  path="/accounts"
  element={<Accounts />}
/>
<Route
  path="/transfer"
  element={<Transfer />}
/>
<Route
  path="/analytics"
  element={<Analytics />}
/>
<Route
  path="/ai"
  element={<AIAssistant />}
/>
    </Routes>
  </main>
</div>

);
}

export default App;
