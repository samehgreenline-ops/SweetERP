const API_BASE = "http://localhost:3001/api";


async function handleResponse(res) {

  const data = await res.json().catch(() => ({}));


  if (!res.ok) {

    throw new Error(
      data.error || "حدث خطأ في الاتصال بالخادم"
    );

  }


  return data;

}




function getHeaders(extra = {}) {

  const token = localStorage.getItem("token");


  return {

    "Content-Type": "application/json",

    ...(token
      ? {
          Authorization: `Bearer ${token}`
        }
      : {}),

    ...extra

  };

}





export async function apiGet(path) {


  const res = await fetch(

    `${API_BASE}${path}`,

    {

      method: "GET",

      headers: getHeaders()

    }

  );


  return handleResponse(res);

}





export async function apiPost(path, body) {


  const res = await fetch(

    `${API_BASE}${path}`,

    {

      method: "POST",

      headers: getHeaders(),

      body: JSON.stringify(body)

    }

  );


  return handleResponse(res);

}





export async function apiPut(path, body) {


  const res = await fetch(

    `${API_BASE}${path}`,

    {

      method: "PUT",

      headers: getHeaders(),

      body: JSON.stringify(body)

    }

  );


  return handleResponse(res);

}





export async function apiDelete(path) {


  const res = await fetch(

    `${API_BASE}${path}`,

    {

      method: "DELETE",

      headers: getHeaders()

    }

  );


  return handleResponse(res);

}





const api = {


  get: async(path)=>{

    const data = await apiGet(path);

    return {
      data
    };

  },



  post: async(path,body)=>{

    const data = await apiPost(path,body);

    return {
      data
    };

  },



  put: async(path,body)=>{

    const data = await apiPut(path,body);

    return {
      data
    };

  },



  delete: async(path)=>{

    const data = await apiDelete(path);

    return {
      data
    };

  }


};



export default api;