import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx";

import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Items from "./pages/items/Items.jsx";
import Recipes from "./pages/recipes/Recipes.jsx";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route element={<MainLayout />}>

          <Route 
            path="/" 
            element={<Dashboard />} 
          />


          <Route 
            path="/items" 
            element={<Items />} 
          />


          <Route 
            path="/recipes" 
            element={<Recipes />} 
          />


        </Route>

      </Routes>

    </BrowserRouter>

  );

}


export default App;