import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaArrowLeft, FaLock, FaEnvelope } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();
  const { role } = useParams();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const getConfig = () => {
    switch (role) {
      case "student":
        return {
          title: "Student Login",
          subtitle: "Access your courses, grades, and academic records",
          role: "student",
          bgColor: "from-blue-50 via-indigo-50 to-purple-50",
          buttonColor: "from-blue-600 to-blue-700",
          buttonHover: "from-blue-700 to-blue-800",
          accentColor: "text-blue-600",
          borderColor: "border-blue-500",
          focusRing: "focus:border-blue-500 focus:ring-blue-200",
          registerLink: "/register",
        };
      case "faculty":
        return {
          title: "Faculty Login",
          subtitle: "Manage courses, grades, and student records",
          role: "faculty",
          bgColor: "from-green-50 via-emerald-50 to-teal-50",
          buttonColor: "from-green-600 to-green-700",
          buttonHover: "from-green-700 to-green-800",
          accentColor: "text-green-600",
          borderColor: "border-green-500",
          focusRing: "focus:border-green-500 focus:ring-green-200",
          registerLink: "/register",
        };
      case "admin":
        return {
          title: "Admin Login",
          subtitle: "Manage users, departments, and system settings",
          role: "admin",
          bgColor: "from-purple-50 via-pink-50 to-red-50",
          buttonColor: "from-purple-600 to-purple-700",
          buttonHover: "from-purple-700 to-purple-800",
          accentColor: "text-purple-600",
          borderColor: "border-purple-500",
          focusRing: "focus:border-purple-500 focus:ring-purple-200",
          registerLink: "/register",
        };
      default:
        return {};
    }
  };

  const config = getConfig();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
    if (validationError[name]) {
      setValidationError((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validate = () => {
    let errors = {};

    if (!credentials.email) {
      errors.email = "Email is required";
    } else if (!/^[\w\.]+@[\w\.]+(\.[\w])+$/.test(credentials.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!credentials.password) {
      errors.password = "Password is required";
    } else if (credentials.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setValidationError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!validate()) {
    //   toast.error("Please fill all fields correctly");
      
    //   return;
    // }

    setLoading(true);

    try {
      const result = await login(
        credentials.email,
        credentials.password,
        config.role
      );
      if (result.success) {
        toast.success("Login successful!");
        switch (config.role) {
          case "student":
            navigate("/student-dashboard");
            break;
          case "faculty":
            navigate("/faculty-dashboard");
            break;
          case "admin":
            navigate("/admin-dashboard");
            break;
          default:
            navigate("/");
        }
      } else {
        toast.error(result.error || "Login failed");
        console.log(result.error);
        
        
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${config.bgColor} py-12 px-4`}>
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className={`flex items-center gap-2 ${config.accentColor} hover:opacity-80 mb-8 font-semibold transition`}
        >
          <FaArrowLeft /> Back to Home
        </button>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Icon and Header */}
            <div className="flex justify-center mb-4">
              <div className={`p-4 rounded-full bg-gradient-to-br ${config.buttonColor} bg-opacity-10`}>
                <FaLock className={`text-5xl ${config.accentColor}`} />
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              {config.title}
            </h2>
            <p className="text-center text-gray-600 text-sm mb-8">
              {config.subtitle}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                    placeholder="your.email@college.edu"
                    className={`w-full pl-10 pr-4 py-3 border-2 ${config.borderColor} rounded-lg focus:outline-none ${config.focusRing} transition bg-gray-50 hover:bg-white disabled:bg-gray-200 disabled:cursor-not-allowed`}
                    disabled={loading}
                    required
                  />
                </div>
                {validationError.email && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {validationError.email}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-3.5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-12 py-3 border-2 ${config.borderColor} rounded-lg focus:outline-none ${config.focusRing} transition bg-gray-50 hover:bg-white disabled:bg-gray-200 disabled:cursor-not-allowed`}
                    disabled={loading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-600 hover:text-gray-800 transition"
                  >
                    {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </button>
                </div>
                {validationError.password && (
                  <span className="text-xs text-red-500 mt-1 block">
                    {validationError.password}
                  </span>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className={`text-sm ${config.accentColor} hover:underline font-semibold transition`}
                >
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-gradient-to-r ${config.buttonColor} hover:${config.buttonHover} text-white font-bold rounded-lg transition transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:bg-gray-400 disabled:cursor-not-allowed mt-8`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            {/* Register Link */}
            <p className="text-center text-gray-600 mt-6 text-sm">
              Don't have an account?{" "}
              <button
                onClick={() => navigate(config.registerLink)}
                className={`${config.accentColor} hover:underline font-bold transition`}
              >
                Register Now
              </button>
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-600 mt-8 text-xs">
          For security, never share your password with anyone
        </p>
      </div>
    </div>
  );
}
