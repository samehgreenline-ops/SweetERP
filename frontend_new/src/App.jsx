import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx";

import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Items from "./pages/items/Items.jsx";
import Recipes from "./pages/recipes/Recipes.jsx";

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

          <Route
            path="/inventory"
            element={<SimplePage title="المخزون" />}
          />

          <Route
            path="/production"
            element={<SimplePage title="الإنتاج" />}
          />

          <Route
            path="/sales"
            element={<SimplePage title="المبيعات" />}
          />

          <Route
            path="/purchases"
            element={<SimplePage title="المشتريات" />}
          />

          <Route
            path="/reports"
            element={<SimplePage title="التقارير" />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  );

}

export default App;