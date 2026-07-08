import { useState } from "react";
import ProductForm from "../../components/products/ProductForm";

function Products() {
  const [showForm, setShowForm] = useState(false);

  const [products, setProducts] = useState([
    {
      code: "1001",
      name: "تورتة شوكولاتة",
      category: "تورت",
      cost: 165,
      price: 250,
      status: "نشط",
    },
    {
      code: "1002",
      name: "جاتوه",
      category: "حلويات",
      cost: 28,
      price: 45,
      status: "نشط",
    },
  ]);

  function handleSave(product) {
    setProducts([
      ...products,
      {
        ...product,
        status: "نشط",
      },
    ]);

    setShowForm(false);
  }

  return (
    <div style={{ direction: "rtl" }}>
      <h1>📦 إدارة الأصناف</h1>

      <button
        onClick={() => setShowForm(true)}
        style={{
          background: "#1565c0",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        + إضافة صنف
      </button>

      {showForm && (
        <ProductForm
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
        }}
      >
        <thead
          style={{
            background: "#1565c0",
            color: "white",
          }}
        >
          <tr>
            <th>الكود</th>
            <th>اسم الصنف</th>
            <th>الفئة</th>
            <th>التكلفة</th>
            <th>سعر البيع</th>
            <th>الحالة</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p, index) => (
            <tr key={index}>
              <td>{p.code}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td>{p.cost}</td>
              <td>{p.price}</td>
              <td>{p.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Products;