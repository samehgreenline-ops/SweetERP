import { useEffect } from "react";
import { createContext, useContext, useState } from "react";


const AuthContext = createContext(null);



const defaultOwner = {

  id: 1,
  username: "admin",
  full_name: "System Owner",
  company_id: 1,
  role_id: 1,
  role_name: "Owner"

};



const defaultPermissions = [

  "dashboard.view",

  "users.manage",

  "items.item.view",
  "items.item.create",
  "items.item.edit",

  "inventory.stock.view",

  "production.order.view",
  "production.order.create",

  "purchases.invoice.view",
  "purchases.invoice.create",

  "sales.invoice.view",
  "sales.invoice.create",

  "reports.report.view",

  "accounting.account.view",
  "accounting.journal.view",
  "accounting.journal.post",
  "accounting.ledger.view",
  "accounting.reports.view"

];



export function AuthProvider({ children }) {


  const [user, setUser] = useState(

    JSON.parse(
      localStorage.getItem("user")
    ) || defaultOwner

  );



  const [permissions, setPermissions] = useState(

    JSON.parse(
      localStorage.getItem("permissions")
    ) || defaultPermissions

  );



  const [token, setToken] = useState(

    localStorage.getItem("token") || null

  );





  function login(data) {


    setUser(data.user);

    setPermissions(data.permissions);

    setToken(data.token);



    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );


    localStorage.setItem(
      "permissions",
      JSON.stringify(data.permissions)
    );


    localStorage.setItem(
      "token",
      data.token
    );


  }





  useEffect(() => {


    async function autoLogin() {


      if (token) {

        return;

      }



      try {


        const response = await fetch(

          "/api/auth/login",

          {

            method: "POST",

            headers: {

              "Content-Type": "application/json"

            },

            body: JSON.stringify({

              username: "admin",

              password: "admin123"

            })

          }

        );



        const data = await response.json();



        if (response.ok) {


          login(data);


        }



      } catch (error) {


        console.error(

          "AUTO LOGIN ERROR",

          error

        );


      }


    }



    autoLogin();



  }, []);







  function logout() {


    setUser(null);

    setPermissions([]);

    setToken(null);



    localStorage.removeItem("user");

    localStorage.removeItem("permissions");

    localStorage.removeItem("token");


  }







  function hasPermission(permission) {

    return permissions.includes(permission);

  }







  return (

    <AuthContext.Provider

      value={{

        user,

        permissions,

        token,

        login,

        logout,

        hasPermission

      }}

    >

      {children}

    </AuthContext.Provider>

  );


}







export function useAuth() {

  return useContext(AuthContext);

}