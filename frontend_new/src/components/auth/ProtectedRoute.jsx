import { Navigate, Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext.jsx";


function ProtectedRoute({ children, permission }) {

  const {
    user,
    hasPermission,
  } = useAuth();



  if (!user) {

    return <Navigate to="/login" replace />;

  }



  if (permission && !hasPermission(permission)) {

    return (

      <div

        style={{

          padding: "50px",

          textAlign: "center",

          direction: "rtl",

        }}

      >

        <h2>
          غير مسموح بالدخول
        </h2>


        <p>
          ليس لديك صلاحية للوصول إلى هذه الصفحة
        </p>



        <Link

          to="/"

          style={{

            display: "inline-block",

            marginTop: "20px",

            padding: "10px 25px",

            textDecoration: "none",

            borderRadius: "5px",

          }}

        >

          العودة للرئيسية

        </Link>


      </div>

    );

  }



  return children;

}


export default ProtectedRoute;