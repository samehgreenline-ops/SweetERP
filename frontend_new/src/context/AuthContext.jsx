import { createContext, useContext, useState } from "react";


const AuthContext = createContext(null);



export function AuthProvider({ children }) {

  const [user, setUser] = useState(
    JSON.parse(
      localStorage.getItem("user")
    ) || null
  );


  const [permissions, setPermissions] = useState(
    JSON.parse(
      localStorage.getItem("permissions")
    ) || []
  );



  function login(data) {

    setUser(data.user);

    setPermissions(data.permissions);


    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );


    localStorage.setItem(
      "permissions",
      JSON.stringify(data.permissions)
    );

  }



  function logout() {

    setUser(null);

    setPermissions([]);


    localStorage.removeItem("user");

    localStorage.removeItem("permissions");

  }



  function hasPermission(permission) {

    return permissions.includes(permission);

  }



  return (

    <AuthContext.Provider
      value={{
        user,
        permissions,
        login,
        logout,
        hasPermission,
      }}
    >

      {children}

    </AuthContext.Provider>

  );

}



export function useAuth() {

  return useContext(AuthContext);

}