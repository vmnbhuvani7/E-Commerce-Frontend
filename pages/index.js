"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import ProductCard from "../components/ProductCard";
import useCart from "../hooks/useCart";
import Layout from '../components/Layout'
import { useRouter } from "next/router";
import { toast } from "react-toastify";

// Connect to WebSocket
const socket = io(process.env.NEXT_PUBLIC_API_URL);

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart } = useCart();
  const router = useRouter()

  useEffect(() => {
    // Fetch products from backend
    const fetchProducts = () => {
      const token = localStorage.getItem("token");
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error('Failed to fetch products');
          }
          return res.json();
        })
        .then((data) => {
          setProducts(data);
        })
        .catch((error) => {
          console.error(error);
          toast.error(error.message);
        });
    };
    fetchProducts();

    // Listen for real-time stock updates
    socket.on("stockUpdate", (data) => {
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === data.id ? { ...product, stock: data.stock } : product
        )
      );
    });

    return () => {
      socket.off("stockUpdate");
    };
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-6 ">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-500">Product List</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map((product) => (
            <ProductCard key={product._id} product={product} addToCart={addToCart} />
          ))}
        </div>
        <div
          onClick={() => {
            if (cart.length) {
              router.push('/cart')
            } else {
              toast.warn("Please add atlist one item.")
            }
          }}>
          <p className="mt-6 bg-blue-500 text-white py-2 px-6 rounded-lg text-center hover:bg-blue-600 transition-colors duration-300">
            Go to Cart ({cart.length})
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default Home
// export default withPrivateRoute(Home)