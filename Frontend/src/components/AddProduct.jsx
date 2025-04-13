import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const FormContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background: ${(props) => (props.disabled ? "#95a5a6" : "#1abc9c")};
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  &:hover {
    background: ${(props) => (props.disabled ? "#95a5a6" : "#16a085")};
  }
`;

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    quantity: "",
    grade: "A",
    image: null,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("quantity", product.quantity);
    formData.append("grade", product.grade);
    formData.append("image", product.image);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication error! Please log in again.");
        setLoading(false);
        return;
      }
  
      const response = await axios.post(
        "http://localhost:5000/api/products/add-product",
        formData,
        { 
          headers: { 
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`  // ✅ Ensure Token Is Sent
          } 
        }
      );
  
      console.log("Server Response:", response.data);
      alert("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error.response ? error.response.data : error.message);
      alert(`Error: ${error.response ? error.response.data.message : "Unknown Error"}`);
    } finally {
      setLoading(false);
    }
  };
  




  return (
    <FormContainer>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <Input type="text" name="name" placeholder="Product Name" value={product.name} onChange={handleChange} required />
        <Input type="number" name="price" placeholder="Base Price (₹ per kg)" value={product.price} onChange={handleChange} required />
        <Input type="number" name="quantity" placeholder="Quantity (kg)" value={product.quantity} onChange={handleChange} required />

        <Input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} required />

        <Select name="grade" value={product.grade} onChange={handleChange}>
          <option value="A">Grade A</option>
          <option value="B">Grade B</option>
          <option value="C">Grade C</option>
        </Select>

        <Button type="submit" disabled={loading || !product.name || !product.price || !product.quantity || !product.image}>
          {loading ? "Saving..." : "Add Product"}
        </Button>
      </form>
    </FormContainer>
  );
};

export default AddProduct;
