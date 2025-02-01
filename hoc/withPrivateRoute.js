import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const withPrivateRoute = (Component) => {
  const Wrapper = (props) => {
    const { isAuthenticated, router, loading } = useAuth();
    useEffect(() => {
      if (!isAuthenticated && !loading) {
        // Redirect to login page if the user is not authenticated
        router.push("/login");
      }
    }, [isAuthenticated, router, loading]);

    if (!isAuthenticated) {
      // You can render a loading state or nothing until the check is complete
      return <p>Loading...</p>;
    }

    return <Component {...props} />;
  };

  return Wrapper;
};

export default withPrivateRoute;
