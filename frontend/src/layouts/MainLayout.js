import { Outlet, Link } from "react-router-dom";

function MainLayout() {
  return (
    <div
      style={{
        display: "flex",
        direction: "rtl",
        minHeight: "100vh",
        fontFamily: "Tahoma",
        background: "#f4f6f9",
      }}
    >
      <aside
        style={{
          width: "250px",
          background: "#1565c0",
          color: "white",
          padding: "20px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          🍰 SweetERP
        </h2>

        <hr />

        <nav
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "25px",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            🏠 لوحة التحكم
          </Link>

          <Link
            to="/products"
            style={{
              color: "white",
              textDecoration: "none",
            }}
          >
            📦 إدارة الأصناف
          </Link>

          <span>🥛 الخامات</span>
          <span>🏭 الإنتاج</span>
          <span>🛒 المشتريات</span>
          <span>💰 المبيعات</span>
          <span>👥 العملاء</span>
          <span>🚚 الموردون</span>
          <span>📊 التقارير</span>
        </nav>
      </aside>

      <main
        style={{
          flex: 1,
          padding: "30px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;