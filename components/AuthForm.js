import { useMemo, useState } from "react";
import Link from "next/link";
import InputField from "./InputField";

const AuthForm = ({ title, submitButtonText, handleSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const emailInvalid = useMemo(() => "Invalid email format.", [])
  const passwordInvalid = useMemo(() => "Password must be 8+ characters, include uppercase, lowercase, number, and special character.", [])

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Validate email and update errors
    setErrors((prev) => ({ ...prev, email: validateEmail(value) ? "" : emailInvalid }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    // Validate password and update errors
    setErrors((prev) => ({
      ...prev,
      password: validatePassword(value) ? "" : passwordInvalid,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Check for validation errors
    if (!validateEmail(email) || !validatePassword(password)) {
      setErrors({
        email: validateEmail(email) ? "" : emailInvalid,
        password: validatePassword(password) ? "" : passwordInvalid,
      });
      return;
    }

    // Proceed with the submit handler
    handleSubmit(email, password);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-500">{title}</h1>

      <form onSubmit={onSubmit}>
        {/* Email Field */}
        <InputField
          label="Email Address"
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Enter your email"
          errors={errors.email}
        />

        {/* Password Field */}
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          errors={errors.password}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
        >
          {submitButtonText}
        </button>
      </form>

      {/* Link to Sign Up or Login */}
      {title === "Login" ? (
        <p className="text-center text-sm text-gray-600 mt-4">
          No account?{" "}
          <Link href="/signup">
            <span className="text-blue-500 font-medium hover:underline">Sign up here</span>
          </Link>
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login">
            <span className="text-blue-500 font-medium hover:underline">Login here</span>
          </Link>
        </p>
      )}
    </div>
  );
};

export default AuthForm;
