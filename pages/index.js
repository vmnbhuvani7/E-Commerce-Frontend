"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import ProductCard from "../components/ProductCard";
import useCart from "../hooks/useCart";
import Layout from '../components/Layout'
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { fetchProducts } from "../utils/api";

// Connect to WebSocket
const socket = io(process.env.NEXT_PUBLIC_API_URL);

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cart, addToCart } = useCart();
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Fetch products from backend
    const fetchProductsData = async () => {
      const data = await fetchProducts()
      setProducts(data);
      setLoading(false)
    };
    fetchProductsData()
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
          {loading && <div className="flex justify-center items-center space-x-2 w-full">
            <div
              className="w-8 h-8 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-blue-500"
            ></div>
          </div>}
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