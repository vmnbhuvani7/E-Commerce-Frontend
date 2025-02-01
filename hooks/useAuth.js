import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { loginUser, signupUser, userCheckout } from "../utils/api";

export const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState();
  useEffect(() => {
    setLoading(false)
    // Check if we are in the browser environment
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
    } else {
      setIsAuthenticated(false)
    }
  }, []);

  // Handle login
  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const { token } = await loginUser(email, password);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }
      toast.success("Login successful!");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle signup
  const handleSignUp = async (email, password) => {
    setLoading(true);
    try {
      await signupUser(email, password);
      toast.success("Signup successful! You can now log in.");
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle checkout
  const processCheckout = async (cart) => {
    setLoading(true);
    try {
      await userCheckout(cart);
      toast.success("Checkout successful!");
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, handleSignUp, processCheckout, loading, router, isAuthenticated };
};
