import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ShoppingCart, LogOut } from "lucide-react";
import { toast } from "react-toastify";

export default function Layout({ children }) {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(JSON.parse(localStorage.getItem("cart")) || [])

  useEffect(() => {
    setTimeout(() => {
      const cartCountUpdated = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cartCountUpdated)
    }, 1000)
  })

  const handleLogout = () => {
    // Clear the localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    toast.success("You have been logged out successfully.")
    // Redirect to login page
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-500 text-white p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">E-commerce</h1>
          <div className="flex items-center gap-4"
            onClick={() => router.push("/cart")}>
            {/* Cart Icon with Count */}
            <div className="relative cursor-pointer">
              <ShoppingCart size={28} className="hover:text-gray-300 transition" />
              {cartCount.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cartCount.length}
                </span>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 flex transition-colors duration-300"
            >
              Logout <LogOut className="ml-2" />
            </button>
          </div>
        </div>
      </header >
      <main className="flex-grow pb-16" style={{ backgroundColor: "rgba(59, 130, 246, 0.2)" }}>
        {children}
      </main>
      <footer className="bg-gray-800 text-white p-4 text-center fixed bottom-0 left-0 w-full">
        &copy; 2025 E-commerce Inc.
      </footer>
    </div >
  );
}
