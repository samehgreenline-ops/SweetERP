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
import FinancialReports from "./pages/reports/FinancialReports.jsx";


import Users from "./pages/users/Users.jsx";
import Roles from "./pages/roles/Roles.jsx";

import Suppliers from "./pages/suppliers/Suppliers.jsx";
import Customers from "./pages/customers/Customers.jsx";


// Accounting

import Accounts from "./pages/accounting/Accounts.jsx";
import Journal from "./pages/accounting/Journal.jsx";
import Ledger from "./pages/accounting/Ledger.jsx";
import TrialBalance from "./pages/accounting/TrialBalance.jsx";
import IncomeStatement from "./pages/accounting/IncomeStatement.jsx";
import BalanceSheet from "./pages/accounting/BalanceSheet.jsx";


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

            path="/suppliers"

            element={

              <ProtectedRoute permission="purchases.view">

                <Suppliers />

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

            path="/customers"

            element={

              <ProtectedRoute permission="sales.view">

                <Customers />

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

            path="/financial-reports"

            element={

              <ProtectedRoute permission="reports.view">

                <FinancialReports />

              </ProtectedRoute>

            }

          />





          {/* Accounting */}



          <Route

            path="/accounting/accounts"

            element={

              <ProtectedRoute permission="accounts.view">

                <Accounts />

              </ProtectedRoute>

            }

          />



          <Route

            path="/accounting/journal"

            element={

              <ProtectedRoute permission="journal.view">

                <Journal />

              </ProtectedRoute>

            }

          />



          <Route

            path="/accounting/ledger"

            element={

              <ProtectedRoute permission="ledger.view">

                <Ledger />

              </ProtectedRoute>

            }

          />



          <Route

            path="/accounting/trial-balance"

            element={

              <ProtectedRoute permission="reports.view">

                <TrialBalance />

              </ProtectedRoute>

            }

          />



          <Route

            path="/accounting/income"

            element={

              <ProtectedRoute permission="reports.view">

                <IncomeStatement />

              </ProtectedRoute>

            }

          />



          <Route

            path="/accounting/balance-sheet"

            element={

              <ProtectedRoute permission="reports.view">

                <BalanceSheet />

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