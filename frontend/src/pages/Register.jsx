import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import api, { authService } from "../services/api";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    password: "",
    confirmPassword: "",
    role: "",
    branch: "CSE",
    department: "CSE",
    designation: "Assistant Professor",
    enrollmentYear: new Date().getFullYear(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      email: "",
      mobileNumber: "",
      password: "",
      confirmPassword: "",
      role: "",
      branch: "CSE",
      department: "CSE",
      designation: "Assistant Professor",
      enrollmentYear: new Date().getFullYear(),
    });
    setValidationError({});
  };

  const validate = () => {
    let Error = {};

    if (formData.fullName.length < 3) {
      Error.fullName = "Name should be more than 3 characters";
    } else {
      if (!/^[A-Za-z ]+$/.test(formData.fullName)) {
        Error.fullName = "Name should only contain letters and spaces";
      }
    }

    if (
      !/^[\w\.]+@(gmail|outlook|yahoo|college|edu)\.(com|in|co.in|org)$/.test(
        formData.email
      )
    ) {
      Error.email = "Please use a valid email format";
    }

    if (!/^[6-9]\d{9}$/.test(formData.mobileNumber)) {
      Error.mobileNumber = "Please enter a valid Indian mobile number";
    }

    if (formData.password.length < 6) {
      Error.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      Error.confirmPassword = "Passwords do not match";
    }

    if (!formData.role) {
      Error.role = "Please select a role";
    }

    setValidationError(Error);

    return Object.keys(Error).length > 0 ? false : true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validate()) {
      setIsLoading(false);
      toast.error("Please fill the form correctly");
      return;
    }

    try {
      let payload={};
      
      
      switch (formData.role) {
        case "student":
          payload = {
            role: formData.role,
            name: formData.fullName,
            email: formData.email,
            phone: formData.mobileNumber,
            password: formData.password,
            branch: formData.branch,
            enrollment_year: parseInt(formData.enrollmentYear),
          };
          break;
        case "faculty":
          payload = {
            role: formData.role,
            name: formData.fullName,
            email: formData.email,
            phone: formData.mobileNumber,
            password: formData.password,
            department: formData.department,
            designation: formData.designation,
          };
          break;
        // case "admin":
        //   payload = {
        //     role: formData.role,
        //     name: formData.fullName,
        //     email: formData.email,
        //     phone: formData.mobileNumber,
        //     password: formData.password,
        //   };
          // break;
        default:
          toast.error("Invalid role selected");
          setIsLoading(false);
          return;
      }
      

      const res = await api.post(`/auth/register`, payload);
      toast.success(res.data.message || "Registration successful!");
      
      setTimeout(() => {
        handleClearForm();
        navigate(`/login/${formData.role}`);
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 px-4">
      <div className="max-w-xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-blue-600 hover:opacity-80 mb-8 font-semibold transition"
        >
          <FaArrowLeft /> Back to Home
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Registration</h1>
          <p className="text-lg text-gray-600">
            Join our college portal and get started
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <form
            onSubmit={handleSubmit}
            onReset={handleClearForm}
            className="p-8"
          >
            {/* Role Selection */}
            <div className="mb-10">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2 flex-wrap gap-4">
                    <label className="font-semibold text-gray-700">I am a</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        id="student"
                        checked={formData.role === "student"}
                        value="student"
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      <label htmlFor="student" className="cursor-pointer">
                        Student
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        id="faculty"
                        checked={formData.role === "faculty"}
                        value="faculty"
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      <label htmlFor="faculty" className="cursor-pointer">
                        Faculty
                      </label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="role"
                        id="admin"
                        checked={formData.role === "admin"}
                        value="admin"
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      <label htmlFor="admin" className="cursor-pointer">
                        Admin
                      </label>
                    </div>
                  </div>
                  {validationError.role && (
                    <span className="text-xs text-red-500">
                      {validationError.role}
                    </span>
                  )}
                </div>

                {/* Full Name */}
                <div>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full h-fit px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                  />
                  {validationError.fullName && (
                    <span className="text-xs text-red-500">
                      {validationError.fullName}
                    </span>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                  />
                  {validationError.email && (
                    <span className="text-xs text-red-500">
                      {validationError.email}
                    </span>
                  )}
                </div>

                {/* Mobile Number */}
                <div>
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    maxLength="10"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                  />
                  {validationError.mobileNumber && (
                    <span className="text-xs text-red-500">
                      {validationError.mobileNumber}
                    </span>
                  )}
                </div>

                {/* Role-specific Fields */}
                {formData.role === "student" && (
                  <>
                    <div>
                      <select
                        name="branch"
                        value={formData.branch}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                      >
                        <option value="CSE">Computer Science Engineering</option>
                        <option value="ECE">Electronics & Communication</option>
                        <option value="ME">Mechanical Engineering</option>
                        <option value="CE">Civil Engineering</option>
                        <option value="IT">Information Technology</option>
                      </select>
                    </div>
                    <div>
                      <select
                        name="enrollmentYear"
                        value={formData.enrollmentYear}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                      >
                        <option value={new Date().getFullYear()}>
                          {new Date().getFullYear()}
                        </option>
                        <option value={new Date().getFullYear() - 1}>
                          {new Date().getFullYear() - 1}
                        </option>
                        <option value={new Date().getFullYear() - 2}>
                          {new Date().getFullYear() - 2}
                        </option>
                        <option value={new Date().getFullYear() - 3}>
                          {new Date().getFullYear() - 3}
                        </option>
                      </select>
                    </div>
                  </>
                )}

                {formData.role === "faculty" && (
                  <>
                    <div>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                      >
                        <option value="CSE">Computer Science Engineering</option>
                        <option value="ECE">Electronics & Communication</option>
                        <option value="ME">Mechanical Engineering</option>
                        <option value="CE">Civil Engineering</option>
                        <option value="IT">Information Technology</option>
                      </select>
                    </div>
                    <div>
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                      >
                        <option value="Assistant Professor">
                          Assistant Professor
                        </option>
                        <option value="Associate Professor">
                          Associate Professor
                        </option>
                        <option value="Professor">Professor</option>
                        <option value="Lecturer">Lecturer</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Password */}
                <div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    placeholder="Create Password"
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                  />
                  {validationError.password && (
                    <span className="text-xs text-red-500">
                      {validationError.password}
                    </span>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition disabled:cursor-not-allowed disabled:bg-gray-200"
                  />
                  {validationError.confirmPassword && (
                    <span className="text-xs text-red-500">
                      {validationError.confirmPassword}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-8 border-t-2 border-gray-200">
              <button
                type="reset"
                disabled={isLoading}
                className="flex-1 bg-gray-300 text-gray-800 font-bold py-4 px-6 rounded-lg hover:bg-gray-400 transition duration-300 transform hover:scale-105 disabled:scale-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-bold py-4 px-6 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition duration-300 transform hover:scale-105 shadow-lg disabled:scale-100 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-600 mt-8 text-sm">
          All fields marked are mandatory. We respect your privacy.
        </p>
      </div>
    </div>
  );
};

export default Register;
