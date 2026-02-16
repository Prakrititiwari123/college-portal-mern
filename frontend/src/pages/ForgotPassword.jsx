import React, { useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { FaArrowLeft, FaEnvelope, FaCheckCircle, FaKey, FaShieldAlt } from "react-icons/fa";
import { authService } from "../services/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Password
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateEmail = () => {
    if (!email) {
      setValidationError("Email is required");
      return false;
    }
    if (!/^[\w\.]+@[\w\.]+(\.[\w])+$/.test(email)) {
      setValidationError("Please enter a valid email");
      return false;
    }
    setValidationError("");
    return true;
  };

  const validateOTP = () => {
    if (!otp) {
      setValidationError("OTP is required");
      return false;
    }
    if (otp.length !== 6 || isNaN(otp)) {
      setValidationError("OTP must be 6 digits");
      return false;
    }
    setValidationError("");
    return true;
  };

  const validatePassword = () => {
    if (!newPassword) {
      setValidationError("Password is required");
      return false;
    }
    if (newPassword.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return false;
    }
    if (newPassword !== confirmPassword) {
      setValidationError("Passwords do not match");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    // if (!validateEmail()) {
    //   return;
    // }

    setLoading(true);

    try {
      // const response = await authService.forgotPassword({ email });
      const response = await authService.genOtp({ email });

      setStep(2);
      toast.success(response.data.message || "OTP sent to your email!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to send OTP. Please try again.";
      setValidationError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!validateOTP()) {
      return;
    }

    setLoading(true);

    try {
      // const response = await authService.verifyOTP({ email, otp });
      const response = await authService.verifyOtp({ email, otp });

      setStep(3);
      toast.success(response.data.message || "OTP verified successfully!");
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid OTP. Please try again.";
      setValidationError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!validatePassword()) {
      return;
    }

    setLoading(true);

    try {
      // const response = await authService.resetPassword({ email, otp, newPassword });
      const response = await authService.resetPassword({ email, otp, newPassword });

      setSuccess(true);
      toast.success(response.data.message || "Password reset successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to reset password. Please try again.";
      setValidationError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const renderStepIcon = () => {
    if (success) return <FaCheckCircle className="text-5xl text-green-600" />;
    if (step === 1) return <FaEnvelope className="text-5xl text-indigo-600" />;
    if (step === 2) return <FaShieldAlt className="text-5xl text-blue-600" />;
    return <FaKey className="text-5xl text-purple-600" />;
  };

  const renderStepTitle = () => {
    if (success) return "Password Reset Successful";
    if (step === 1) return "Reset Password";
    if (step === 2) return "Verify OTP";
    return "Set New Password";
  };

  const renderStepDescription = () => {
    if (success) return "Your password has been reset successfully!";
    if (step === 1) return "Enter your email and we'll send you a 6-digit OTP";
    if (step === 2) return `We've sent a 6-digit OTP to ${email}`;
    return "Create a new password for your account";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-indigo-600 hover:opacity-80 mb-8 font-semibold transition"
        >
          <FaArrowLeft /> Back to Login
        </button>

        {/* Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Icon and Header */}
            <div className="flex justify-center mb-4">
              <div className="p-4 rounded-full bg-gradient-to-br from-indigo-600 to-indigo-700 bg-opacity-10">
                {renderStepIcon()}
              </div>
            </div>

            <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
              {renderStepTitle()}
            </h2>
            <p className="text-center text-gray-600 text-sm mb-8">
              {renderStepDescription()}
            </p>

            {/* Error Message */}
            {validationError && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 text-sm">
                {validationError}
              </div>
            )}

            {/* Step Indicator */}
            <div className="flex justify-center gap-2 mb-8">
              <div className={`w-3 h-3 rounded-full transition ${step >= 1 ? "bg-indigo-600" : "bg-gray-300"}`}></div>
              <div className={`w-3 h-3 rounded-full transition ${step >= 2 ? "bg-indigo-600" : "bg-gray-300"}`}></div>
              <div className={`w-3 h-3 rounded-full transition ${step >= 3 ? "bg-indigo-600" : "bg-gray-300"}`}></div>
            </div>

            {/* STEP 1: EMAIL */}
            {step === 1 && !success && (
              <form onSubmit={handleSendOTP} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (validationError) setValidationError("");
                      }}
                      placeholder="your.email@college.edu"
                      className="w-full pl-10 pr-4 py-3 border-2 border-indigo-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition bg-gray-50 hover:bg-white disabled:bg-gray-200 disabled:cursor-not-allowed"
                      disabled={loading}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-lg transition transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:bg-gray-400 disabled:cursor-not-allowed mt-8"
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              </form>
            )}

            {/* STEP 2: OTP VERIFICATION */}
            {step === 2 && !success && (
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter 6-Digit OTP
                  </label>
                  <div className="relative">
                    <FaShieldAlt className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      type="text"
                      value={otp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                        setOtp(value);
                        if (validationError) setValidationError("");
                      }}
                      placeholder="000000"
                      maxLength="6"
                      className="w-full pl-10 pr-4 py-3 border-2 border-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition bg-gray-50 hover:bg-white disabled:bg-gray-200 disabled:cursor-not-allowed text-center text-2xl tracking-widest font-semibold"
                      disabled={loading}
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Check your spam folder if you don't see the OTP</p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-lg transition transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:bg-gray-400 disabled:cursor-not-allowed mt-8"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp("");
                    setValidationError("");
                  }}
                  className="w-full py-2 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
                >
                  Change Email
                </button>
              </form>
            )}

            {/* STEP 3: SET NEW PASSWORD */}
            {step === 3 && !success && (
              <form onSubmit={handleResetPassword} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <FaKey className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        if (validationError) setValidationError("");
                      }}
                      placeholder="Enter new password"
                      className="w-full pl-10 pr-12 py-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 transition bg-gray-50 hover:bg-white disabled:bg-gray-200 disabled:cursor-not-allowed"
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <FaKey className="absolute left-4 top-3.5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (validationError) setValidationError("");
                      }}
                      placeholder="Confirm password"
                      className="w-full pl-10 pr-12 py-3 border-2 border-purple-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-200 transition bg-gray-50 hover:bg-white disabled:bg-gray-200 disabled:cursor-not-allowed"
                      disabled={loading}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600 transition"
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Password Requirements */}
                <div className="bg-blue-50 border-l-4 border-blue-400 px-4 py-3 rounded text-sm text-blue-700">
                  <p className="font-semibold mb-2">Password Requirements:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>At least 6 characters</li>
                    <li>Passwords must match</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold rounded-lg transition transform hover:scale-105 active:scale-95 disabled:scale-100 disabled:bg-gray-400 disabled:cursor-not-allowed mt-8"
                >
                  {loading ? "Resetting Password..." : "Reset Password"}
                </button>
              </form>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <div className="space-y-6">
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded">
                  <p className="font-semibold">Success!</p>
                  <p className="text-sm mt-2">
                    Your password has been reset successfully. You'll be redirected to login shortly.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold rounded-lg transition transform hover:scale-105 active:scale-95"
                >
                  Go to Login
                </button>
              </div>
            )}

            {/* Back to Login Link */}
            {!success && step === 1 && (
              <p className="text-center text-gray-600 mt-6 text-sm">
                Remember your password?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-indigo-600 hover:text-indigo-800 font-bold transition"
                >
                  Go to Login
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-600 mt-8 text-xs">
          OTP will expire in 10 minutes. Please complete the reset process quickly.
        </p>
      </div>
    </div>
  );
}
