import { useState } from "react";

function ProductForm({ onAdd }) {
  const [product, setProduct] = useState({
    code: "",
    name: "",
    category: "",
    cost: "",
    price: "",
    status: "نشط",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (
      product.code === "" ||
      product.name === ""
    ) {
      alert("برجاء إدخال البيانات المطلوبة");
      return;
    }

    onAdd(product);

    setProduct({
      code: "",
      name: "",
      category: "",
      cost: "",
      price: "",
      status: "نشط",
    });
  };

  return (
    <div
      style={{
        background: "white",
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
        boxShadow: "0 2px 8px rgba(0,0,0,.1)",
      }}
    >
      <h2>➕ إضافة صنف جديد</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 15,
        }}
      >
        <input
          name="code"
          placeholder="الكود"
          value={product.code}
          onChange={handleChange}
        />

        <input
          name="name"
          placeholder="اسم الصنف"
          value={product.name}
          onChange={handleChange}
        />

        <input
          name="category"
          placeholder="الفئة"
          value={product.category}
          onChange={handleChange}
        />

        <input
          name="cost"
          placeholder="التكلفة"
          value={product.cost}
          onChange={handleChange}
        />

        <input
          name="price"
          placeholder="سعر البيع"
          value={product.price}
          onChange={handleChange}
        />
      </div>

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 20,
          padding: "10px 25px",
          background: "#1565c0",
          color: "white",
          border: 0,
          borderRadius: 8,
          cursor: "pointer",
        }}
      >
        حفظ الصنف
      </button>
    </div>
  );
}

export default ProductForm;