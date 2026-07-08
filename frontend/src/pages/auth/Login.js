function Login() {
  return (
    <div
      style={{
        direction: "rtl",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f6f9",
        fontFamily: "Tahoma",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#fff",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 5px 25px rgba(0,0,0,.15)",
        }}
      >
        <h1 style={{ textAlign: "center", color: "#1565c0" }}>
          🍰 SweetERP
        </h1>

        <p style={{ textAlign: "center", color: "#666" }}>
          نظام إدارة مصانع ومحلات الحلويات
        </p>

        <input
          type="text"
          placeholder="اسم المستخدم"
          style={{
            width: "100%",
            padding: "12px",
            marginTop: "20px",
            marginBottom: "15px",
          }}
        />

        <input
          type="password"
          placeholder="كلمة المرور"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            background: "#1565c0",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          تسجيل الدخول
        </button>
      </div>
    </div>
  );
}

export default Login;