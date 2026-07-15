import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx";

import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Items from "./pages/items/Items.jsx";
import Recipes from "./pages/recipes/Recipes.jsx";
import Production from "./pages/production/Production.jsx";
import Inventory from "./pages/inventory/Inventory.jsx";
import Purchases from "./pages/purchases/Purchases.jsx";
import Sales from "./pages/sales/Sales.jsx";
import Reports from "./pages/reports/Reports.jsx";


function SimplePage({ title }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>القسم جاهز وسيتم تطويره لاحقاً</p>
    </div>
  );
}


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<Dashboard />} />

          <Route path="/items" element={<Items />} />

          <Route path="/recipes" element={<Recipes />} />

          <Route path="/inventory" element={<Inventory />} />

          <Route path="/production" element={<Production />} />

          <Route path="/purchases" element={<Purchases />} />

          <Route path="/sales" element={<Sales />} />

          <Route path="/reports" element={<Reports />} />

        </Route>

      </Routes>

    </BrowserRouter>

  );

}


export default App;