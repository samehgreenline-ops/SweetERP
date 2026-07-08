import { useState } from "react";

function Products() {
  const [products, setProducts] = useState([
    {
      id: 1,
      code: "1001",
      name: "تورتة شوكولاتة",
      category: "تورت",
      price: 250,
      cost: 165,
      status: "نشط",
    },
    {
      id: 2,
      code: "1002",
      name: "جاتوه",
      category: "حلويات",
      price: 45,
      cost: 28,
      status: "نشط",
    },
  ]);

  return (
    <div
      style={{
        direction: "rtl",
        fontFamily: "Tahoma",
        padding: "30px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <h1>📦 إدارة الأصناف</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "25px",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          placeholder="ابحث عن صنف..."
          style={{
            width: "300px",
            padding: "10px",
            fontSize: "16px",
          }}
        />

        <button
          style={{
            background: "#1565c0",
            color: "white",
            border: "none",
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          + إضافة صنف
        </button>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
        }}
      >
        <thead>
          <tr style={{ background: "#1565c0", color: "white" }}>
            <th style={{ padding: "12px" }}>الكود</th>
            <th>اسم الصنف</th>
            <th>الفئة</th>
            <th>سعر البيع</th>
            <th>التكلفة</th>
            <th>الحالة</th>
            <th>إجراءات</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ padding: "12px", textAlign: "center" }}>
                {product.code}
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.price}</td>
              <td>{product.cost}</td>
              <td>{product.status}</td>
              <td>
                ✏️ 🗑️
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;