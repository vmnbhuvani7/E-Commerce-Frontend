import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import AuthForm from "../../components/AuthForm"; // Import the common form component

export default function Login() {
  const { isAuthenticated, router, handleLogin, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      // Redirect to the dashboard or home page if the user is already authenticated
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (email, password) => {
    handleLogin(email, password);
  };

  return (
    <div className="flex items-center justify-center h-screen-minus bg-gray-100" style={{ backgroundImage: "url('/e-com-image.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <AuthForm
        title="Login"
        submitButtonText={loading ? "Logging in..." : "Login"}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
