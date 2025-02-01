import { useEffect, useState } from "react";
import AuthForm from "../../components/AuthForm";
import { useAuth } from "../../hooks/useAuth";

export default function Register() {
  const [error, setError] = useState(null);
  const { isAuthenticated, router, loading, handleSignUp } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !loading) {
      router.push("/");
    }
  }, [isAuthenticated, loading, router]);

  const handleSubmit = async (email, password) => {
    try {
      await handleSignUp(email, password);
      router.push("/login");
    } catch (err) {
      setError("Registration failed. Please try again.", err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen-minus bg-gray-100" style={{ backgroundImage: "url('/e-com-image.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <AuthForm
        title="Sign up"
        submitButtonText="Sign up"
        handleSubmit={handleSubmit}
      />
      {error && <p className="text-center text-sm text-red-500 mt-4">{error}</p>}
    </div>
  );
}
