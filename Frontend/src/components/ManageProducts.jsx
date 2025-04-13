import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";

const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProductCard = styled.div`
  background: white;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  background: red;
  color: white;
  padding: 5px;
  border: none;
  cursor: pointer;
`;

const EditButton = styled.button`
  background: blue;
  color: white;
  padding: 5px;
  border: none;
  cursor: pointer;
  margin-right: 5px;
`;

const Input = styled.input`
  padding: 5px;
  margin: 5px;
  width: 100px;
`;

const Select = styled.select`
  padding: 5px;
  margin: 5px;
  width: 100px;
`;

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [updatedDetails, setUpdatedDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product._id);
    setUpdatedDetails({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      grade: product.grade,
    });
  };

  const handleUpdate = async (productId, updatedData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:5000/api/products/${productId}`,
        JSON.stringify(updatedData),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Product updated successfully:", response.data);

      setProducts(products.map((p) => (p._id === productId ? { ...p, ...updatedData } : p)));
      setEditProduct(null);
    } catch (error) {
      console.error("Error updating product:", error.response ? error.response.data : error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductList>
      {products.map((product) => (
        <ProductCard key={product._id}>
          {editProduct === product._id ? (
            <>
              <Input
                type="text"
                value={updatedDetails.name}
                onChange={(e) => setUpdatedDetails({ ...updatedDetails, name: e.target.value })}
              />
              <Input
                type="number"
                value={updatedDetails.price}
                onChange={(e) => setUpdatedDetails({ ...updatedDetails, price: e.target.value })}
              />
              <Input
                type="number"
                value={updatedDetails.quantity}
                onChange={(e) => setUpdatedDetails({ ...updatedDetails, quantity: e.target.value })}
              />
              <Select
                value={updatedDetails.grade}
                onChange={(e) => setUpdatedDetails({ ...updatedDetails, grade: e.target.value })}
              >
                <option value="A">Grade A</option>
                <option value="B">Grade B</option>
                <option value="C">Grade C</option>
              </Select>
              <EditButton onClick={() => handleUpdate(product._id, updatedDetails)} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </EditButton>
              <Button onClick={() => setEditProduct(null)}>Cancel</Button>
            </>
          ) : (
            <>
              <span>
                {product.name} - ₹{product.price} (Stock: {product.quantity} kg, Grade: {product.grade})
              </span>
              <div>
                <EditButton onClick={() => handleEdit(product)}>Edit</EditButton>
                <Button onClick={() => handleDelete(product._id)}>Delete</Button>
              </div>
            </>
          )}
        </ProductCard>
      ))}
    </ProductList>
  );
};

export default ManageProducts;
