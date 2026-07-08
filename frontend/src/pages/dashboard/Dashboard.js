function Dashboard() {
  return (
    <>
      <h1>🏠 لوحة التحكم</h1>

      <h2>مرحباً بك في SweetERP</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "220px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,.1)",
          }}
        >
          <h3>📦 الأصناف</h3>
          <h2>2</h2>
        </div>

        <div
          style={{
            width: "220px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,.1)",
          }}
        >
          <h3>🥛 الخامات</h3>
          <h2>0</h2>
        </div>

        <div
          style={{
            width: "220px",
            background: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(0,0,0,.1)",
          }}
        >
          <h3>💰 المبيعات</h3>
          <h2>0 جنيه</h2>
        </div>
      </div>
    </>
  );
}

export default Dashboard;