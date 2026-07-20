import { createContext, useContext, useEffect, useState } from "react";


const CompanyContext = createContext(null);



export function CompanyProvider({ children }) {


  const [company, setCompany] = useState(null);



  function loadCompany() {


    fetch("/api/companies/1")

      .then((res) => res.json())

      .then((data) => {

        setCompany(data);

      })

      .catch((error)=>{

        console.error(
          "Company loading error:",
          error
        );

      });


  }



  useEffect(()=>{

    loadCompany();

  },[]);



  return (

    <CompanyContext.Provider

      value={{

        company,

        loadCompany,

      }}

    >

      {children}

    </CompanyContext.Provider>

  );

}



export function useCompany(){

  return useContext(CompanyContext);

}