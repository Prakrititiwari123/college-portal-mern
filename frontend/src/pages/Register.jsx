import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import {
  FaArrowLeft,
  FaChalkboardTeacher,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaGraduationCap,
  FaIdCard,
  FaLock,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import api from "../services/api";

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const currentYear = new Date().getFullYear();
  const enrollmentYears = [currentYear, currentYear - 1, currentYear - 2, currentYear - 3];

  const requiredFields = useMemo(() => {
    const base = [
      "role",
      "fullName",
      "email",
      "mobileNumber",
      "password",
      "confirmPassword",
    ];

    if (formData.role === "student") {
      return [...base, "branch", "enrollmentYear"];
    }

    if (formData.role === "faculty") {
      return [...base, "department", "designation"];
    }

    return base;
  }, [formData.role]);

  const completion = useMemo(() => {
    const filled = requiredFields.filter((field) => `${formData[field] ?? ""}`.trim().length > 0).length;
    return Math.round((filled / requiredFields.length) * 100);
  }, [formData, requiredFields]);

  const passwordStrength = useMemo(() => {
    const checks = {
      length: formData.password.length >= 8,
      upper: /[A-Z]/.test(formData.password),
      number: /\d/.test(formData.password),
      symbol: /[^A-Za-z0-9]/.test(formData.password),
    };

    const score = Object.values(checks).filter(Boolean).length;
    const levels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
    const colors = [
      "bg-rose-500",
      "bg-orange-500",
      "bg-amber-500",
      "bg-lime-500",
      "bg-emerald-500",
    ];

    return {
      checks,
      score,
      label: levels[score],
      color: colors[score],
      width: `${Math.max(10, score * 25)}%`,
    };
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    setValidationError((prev) => ({ ...prev, role: "" }));
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
    setShowPassword(false);
    setShowConfirmPassword(false);
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
      let payload = {};

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

  const roleCards = [
    {
      key: "student",
      title: "Student",
      subtitle: "Track attendance, marks, fees and announcements",
      icon: <FaGraduationCap className="text-xl" />,
      gradient: "from-sky-500 to-blue-600",
    },
    {
      key: "faculty",
      title: "Faculty",
      subtitle: "Manage classes, attendance and academic reports",
      icon: <FaChalkboardTeacher className="text-xl" />,
      gradient: "from-teal-500 to-emerald-600",
    },
  ];

  const theme = {
    bg: "from-indigo-50 via-blue-50 to-purple-50",
    accent: "text-indigo-600",
    primaryButton: "from-indigo-600 to-indigo-700",
    border: "border-indigo-200",
    focus: "focus:border-indigo-500",
    softCard: "bg-indigo-50 border-indigo-100",
  };

  return (
    <div className={`relative min-h-screen overflow-hidden bg-linear-to-br ${theme.bg} py-8 px-4 sm:px-6`}>
      <div className="pointer-events-none absolute -top-20 -left-16 h-64 w-64 rounded-full bg-indigo-300/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-full bg-blue-300/25 blur-3xl" />

      <div className="relative mx-auto max-w-2xl">
        <button
          onClick={() => navigate("/")}
          className={`group mb-8 inline-flex items-center gap-2 text-sm font-semibold ${theme.accent} transition hover:opacity-80`}
        >
          <FaArrowLeft className="transition group-hover:-translate-x-0.5" /> Back to Home
        </button>

        <div className="mb-8 text-center text-gray-800">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
            College Portal
          </div>
          <h1 className="mb-2 text-4xl font-black tracking-tight sm:text-5xl">Create Your Account</h1>
          <p className="mx-auto max-w-xl text-sm text-gray-600 sm:text-base">
            Register in seconds and unlock your complete academic workspace.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-2xl">
          <div className="border-b border-indigo-100 bg-linear-to-r from-indigo-600 to-indigo-700 p-6 text-white">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-indigo-100">Profile Completion</p>
              <p className="text-sm font-bold">{completion}%</p>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/30">
              <div
                className="h-full rounded-full bg-white transition-all duration-500"
                style={{ width: `${completion}%` }}
              />
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            onReset={handleClearForm}
            className="space-y-6 p-5 sm:p-8"
          >
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">Choose Your Role</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {roleCards.map((role) => (
                  <button
                    key={role.key}
                    type="button"
                    onClick={() => handleRoleChange(role.key)}
                    disabled={isLoading}
                    className={`group relative overflow-hidden rounded-2xl border p-4 text-left transition duration-300 ${
                      formData.role === role.key
                        ? "border-transparent text-white shadow-lg"
                        : "border-gray-200 bg-white text-slate-700 hover:-translate-y-1 hover:border-indigo-300"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-linear-to-br transition-opacity duration-300 ${role.gradient} ${
                        formData.role === role.key ? "opacity-100" : "opacity-0 group-hover:opacity-10"
                      }`}
                    />
                    <div className="relative">
                      <div className="mb-2 inline-flex rounded-lg bg-white/20 p-2">{role.icon}</div>
                      <h3 className="font-bold">{role.title}</h3>
                      <p className={`mt-1 text-xs ${formData.role === role.key ? "text-white/85" : "text-slate-500"}`}>
                        {role.subtitle}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
              {validationError.role && <span className="text-xs font-medium text-rose-500">{validationError.role}</span>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
                <div className="group relative">
                  <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-sky-600" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={`w-full rounded-xl border-2 border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none transition ${theme.focus} disabled:cursor-not-allowed disabled:bg-slate-100`}
                  />
                </div>
                {validationError.fullName && <span className="mt-1 block text-xs font-medium text-rose-500">{validationError.fullName}</span>}
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email Address</label>
                <div className="group relative">
                  <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-600" />
                  <input
                    type="email"
                    name="email"
                    placeholder="you@college.edu"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={`w-full rounded-xl border-2 border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none transition ${theme.focus} disabled:cursor-not-allowed disabled:bg-slate-100`}
                  />
                </div>
                {validationError.email && <span className="mt-1 block text-xs font-medium text-rose-500">{validationError.email}</span>}
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Mobile Number</label>
                <div className="group relative">
                  <FaPhoneAlt className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-600" />
                  <input
                    type="tel"
                    name="mobileNumber"
                    placeholder="10-digit mobile number"
                    maxLength="10"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={`w-full rounded-xl border-2 border-slate-200 bg-white py-3.5 pl-11 pr-4 outline-none transition ${theme.focus} disabled:cursor-not-allowed disabled:bg-slate-100`}
                  />
                </div>
                {validationError.mobileNumber && <span className="mt-1 block text-xs font-medium text-rose-500">{validationError.mobileNumber}</span>}
              </div>

              {formData.role === "student" && (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Branch</label>
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 outline-none transition ${theme.focus} disabled:cursor-not-allowed disabled:bg-slate-100`}
                    >
                      <option value="CSE">Computer Science Engineering</option>
                      <option value="ECE">Electronics & Communication</option>
                      <option value="ME">Mechanical Engineering</option>
                      <option value="CE">Civil Engineering</option>
                      <option value="IT">Information Technology</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Enrollment Year</label>
                    <select
                      name="enrollmentYear"
                      value={formData.enrollmentYear}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 outline-none transition ${theme.focus} disabled:cursor-not-allowed disabled:bg-slate-100`}
                    >
                      {enrollmentYears.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {formData.role === "faculty" && (
                <>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Department</label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 outline-none transition ${theme.focus} disabled:cursor-not-allowed disabled:bg-slate-100`}
                    >
                      <option value="CSE">Computer Science Engineering</option>
                      <option value="ECE">Electronics & Communication</option>
                      <option value="ME">Mechanical Engineering</option>
                      <option value="CE">Civil Engineering</option>
                      <option value="IT">Information Technology</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-700">Designation</label>
                    <select
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      disabled={isLoading}
                      className={`w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3.5 outline-none transition ${theme.focus} disabled:cursor-not-allowed disabled:bg-slate-100`}
                    >
                      <option value="Assistant Professor">Assistant Professor</option>
                      <option value="Associate Professor">Associate Professor</option>
                      <option value="Professor">Professor</option>
                      <option value="Lecturer">Lecturer</option>
                    </select>
                  </div>
                </>
              )}

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Create Password</label>
                <div className="group relative">
                  <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-600" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    placeholder="Create a strong password"
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={`w-full rounded-xl border-2 border-slate-200 bg-white py-3.5 pl-11 pr-12 outline-none transition ${theme.focus} disabled:cursor-not-allowed disabled:bg-slate-100`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className={`mt-3 rounded-lg border p-3 ${theme.softCard}`}>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-600">Password Strength</span>
                    <span className="font-bold text-slate-700">{passwordStrength.label}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: passwordStrength.width }}
                    />
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-slate-600 sm:grid-cols-4">
                    <span className={passwordStrength.checks.length ? "text-emerald-600" : "text-slate-500"}>8+ chars</span>
                    <span className={passwordStrength.checks.upper ? "text-emerald-600" : "text-slate-500"}>Uppercase</span>
                    <span className={passwordStrength.checks.number ? "text-emerald-600" : "text-slate-500"}>Number</span>
                    <span className={passwordStrength.checks.symbol ? "text-emerald-600" : "text-slate-500"}>Symbol</span>
                  </div>
                </div>
                {validationError.password && <span className="mt-1 block text-xs font-medium text-rose-500">{validationError.password}</span>}
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-slate-700">Confirm Password</label>
                <div className="group relative">
                  <FaIdCard className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition group-focus-within:text-indigo-600" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    disabled={isLoading}
                    className={`w-full rounded-xl border-2 border-slate-200 bg-white py-3.5 pl-11 pr-12 outline-none transition ${theme.focus} disabled:cursor-not-allowed disabled:bg-slate-100`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600"
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <p className={`mt-1 text-xs font-semibold ${formData.password === formData.confirmPassword ? "text-emerald-600" : "text-rose-500"}`}>
                    {formData.password === formData.confirmPassword ? "Passwords match" : "Passwords do not match"}
                  </p>
                )}
                {validationError.confirmPassword && <span className="mt-1 block text-xs font-medium text-rose-500">{validationError.confirmPassword}</span>}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
              <button
                type="reset"
                disabled={isLoading}
                className="flex-1 rounded-xl border-2 border-slate-300 bg-white px-6 py-3.5 font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={`flex-1 rounded-xl bg-linear-to-r ${theme.primaryButton} px-6 py-3.5 font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60`}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-8 text-center text-xs font-medium tracking-wide text-gray-600 sm:text-sm">
          By signing up, you agree to use your academic information responsibly.
        </p>
      </div>
    </div>
  );
};

export default Register;
