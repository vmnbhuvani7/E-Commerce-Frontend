import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../hooks/useAuth";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authenticated before routing
    if (!isAuthenticated && !isLoading && !["/login", "/signup"]?.includes(router.pathname)) {
      // Redirect to login if the user is not authenticated
      router.push("/login");
    } else if (isAuthenticated && !isLoading && ["/login", "/signup"]?.includes(router.pathname)) {
      // Redirect to / if the user is already authenticated and trying to visit login or register page
      router.push("/");
    }
    setIsLoading(false);
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    // Render a loading spinner or placeholder until the check is done
    return <p>Loading...</p>;
  }

  return (
    <>
      <ToastContainer />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
