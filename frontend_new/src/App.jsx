import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout.jsx";

import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";


import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Items from "./pages/items/Items.jsx";
import Recipes from "./pages/recipes/Recipes.jsx";
import Production from "./pages/production/Production.jsx";
import Inventory from "./pages/inventory/Inventory.jsx";
import Purchases from "./pages/purchases/Purchases.jsx";
import Sales from "./pages/sales/Sales.jsx";
import Reports from "./pages/reports/Reports.jsx";
import Users from "./pages/users/Users.jsx";
import Roles from "./pages/roles/Roles.jsx";

import Login from "./pages/login/Login.jsx";



function App() {


  return (


    <BrowserRouter>


      <Routes>



        <Route

          path="/login"

          element={<Login />}

        />




        <Route

          element={

            <ProtectedRoute>

              <MainLayout />

            </ProtectedRoute>

          }

        >



          <Route

            path="/"

            element={

              <ProtectedRoute permission="dashboard.view">

                <Dashboard />

              </ProtectedRoute>

            }

          />




          <Route

            path="/items"

            element={

              <ProtectedRoute permission="items.view">

                <Items />

              </ProtectedRoute>

            }

          />




          <Route

            path="/recipes"

            element={

              <ProtectedRoute permission="items.view">

                <Recipes />

              </ProtectedRoute>

            }

          />




          <Route

            path="/inventory"

            element={

              <ProtectedRoute permission="inventory.view">

                <Inventory />

              </ProtectedRoute>

            }

          />




          <Route

            path="/production"

            element={

              <ProtectedRoute permission="production.view">

                <Production />

              </ProtectedRoute>

            }

          />




          <Route

            path="/purchases"

            element={

              <ProtectedRoute permission="purchases.view">

                <Purchases />

              </ProtectedRoute>

            }

          />




          <Route

            path="/sales"

            element={

              <ProtectedRoute permission="sales.view">

                <Sales />

              </ProtectedRoute>

            }

          />




          <Route

            path="/reports"

            element={

              <ProtectedRoute permission="reports.view">

                <Reports />

              </ProtectedRoute>

            }

          />




          <Route

            path="/users"

            element={

              <ProtectedRoute permission="users.manage">

                <Users />

              </ProtectedRoute>

            }

          />




          <Route

            path="/roles"

            element={

              <ProtectedRoute permission="users.manage">

                <Roles />

              </ProtectedRoute>

            }

          />



        </Route>



      </Routes>


    </BrowserRouter>


  );

}



export default App;