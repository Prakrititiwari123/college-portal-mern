import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { 
  FaUser, 
  FaBookReader, 
  FaChalkboardTeacher, 
  FaKey, 
  FaBars,
  FaTimes,
  FaGraduationCap,
  FaClipboardList,
  FaChartLine,
  FaShieldAlt,
  FaClock,
  FaUsers,
  FaArrowRight,
  FaCheckCircle,
  FaLightbulb,
  FaHeadset,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa';

export default function Home() {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (token && user) {
      switch (user.role) {
        case 'STUDENT':
          navigate('/student-dashboard');
          break;
        case 'FACULTY':
          navigate('/faculty-dashboard');
          break;
        case 'ADMIN':
          navigate('/admin-dashboard');
          break;
        default:
          break;
      }
    }
  }, [token, user, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollPosition > 50 ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2 bg-gradient-to-br from-indigo-600 to-indigo-700 rounded-lg">
              <FaBookReader className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-700 bg-clip-text text-transparent">
                EduPortal
              </h1>
              <p className="text-xs text-gray-600 hidden md:block">College Management</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-700 hover:text-indigo-600 font-medium transition">Features</a>
            <a href="#roles" className="text-gray-700 hover:text-indigo-600 font-medium transition">Roles</a>
            <a href="#contact" className="text-gray-700 hover:text-indigo-600 font-medium transition">Contact</a>
            
            {/* Login Dropdown */}
            <div className="relative group">
              <button className="px-6 py-2.5 text-indigo-600 hover:text-indigo-700 font-semibold border-2 border-indigo-600 rounded-lg hover:bg-indigo-50 transition">
                Login
              </button>
              <div className="hidden group-hover:block absolute top-full mt-0 w-48 bg-white rounded-lg shadow-2xl z-10 border border-gray-100">
                <button onClick={() => navigate('/login/student')} className="block w-full px-4 py-3 text-left hover:bg-blue-50 font-semibold text-blue-600 border-b transition">
                  <FaUser className="inline mr-2" /> Student Login
                </button>
                <button onClick={() => navigate('/login/faculty')} className="block w-full px-4 py-3 text-left hover:bg-green-50 font-semibold text-green-600 border-b transition">
                  <FaChalkboardTeacher className="inline mr-2" /> Faculty Login
                </button>
                <button onClick={() => navigate('/login/admin')} className="block w-full px-4 py-3 text-left hover:bg-purple-50 font-semibold text-purple-600 transition">
                  <FaKey className="inline mr-2" /> Admin Login
                </button>
              </div>
            </div>

            <button 
              onClick={() => navigate('/register')} 
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:shadow-lg font-semibold transition transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-2xl text-gray-800"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden bg-white border-t shadow-xl">
            <div className="px-4 py-4 space-y-3">
              <a href="#features" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition">Features</a>
              <a href="#roles" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition">Roles</a>
              <a href="#contact" className="block px-4 py-2 text-gray-700 hover:bg-indigo-50 rounded-lg transition">Contact</a>
              <hr className="my-2" />
              <button onClick={() => navigate('/login/student')} className="w-full px-4 py-2 text-blue-600 hover:bg-blue-50 font-semibold rounded-lg transition text-left">
                <FaUser className="inline mr-2" /> Student Login
              </button>
              <button onClick={() => navigate('/login/faculty')} className="w-full px-4 py-2 text-green-600 hover:bg-green-50 font-semibold rounded-lg transition text-left">
                <FaChalkboardTeacher className="inline mr-2" /> Faculty Login
              </button>
              <button onClick={() => navigate('/login/admin')} className="w-full px-4 py-2 text-purple-600 hover:bg-purple-50 font-semibold rounded-lg transition text-left">
                <FaKey className="inline mr-2" /> Admin Login
              </button>
              <button 
                onClick={() => navigate('/register')} 
                className="w-full px-4 py-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg font-semibold transition mt-2"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div>
                <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                  ✨ Welcome to EduPortal
                </span>
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Complete Academic Management System
                </h2>
              </div>
              <p className="text-xl text-gray-600">
                Streamline your college operations with our comprehensive portal designed for students, faculty, and administrators.
              </p>
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={() => navigate('/register')}
                  className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-lg hover:shadow-lg font-semibold transition transform hover:scale-105 flex items-center gap-2"
                >
                  Start Now <FaArrowRight />
                </button>
                <button 
                  onClick={() => navigate('/login/student')}
                  className="px-8 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 font-semibold transition"
                >
                  Login
                </button>
              </div>
            </div>

            {/* Right Illustration */}
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                  <div className="space-y-4">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <FaGraduationCap className="text-2xl text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Student Portal</p>
                        <p className="text-sm text-gray-500">View grades & courses</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <FaChalkboardTeacher className="text-2xl text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Faculty Dashboard</p>
                        <p className="text-sm text-gray-500">Manage courses & grades</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        <FaShieldAlt className="text-2xl text-purple-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-700">Admin Control</p>
                        <p className="text-sm text-gray-500">System management</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-indigo-600 mb-2">10K+</div>
              <p className="text-gray-600 font-medium">Active Students</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <p className="text-gray-600 font-medium">Courses</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">200+</div>
              <p className="text-gray-600 font-medium">Faculty Members</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">99%</div>
              <p className="text-gray-600 font-medium">Uptime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Role Cards Section */}
      <section id="roles" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tailored for Everyone</h2>
            <p className="text-xl text-gray-600">Choose your role and access personalized features</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Student Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-8 border-t-4 border-blue-500">
              <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <FaGraduationCap className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">For Students</h3>
              <p className="text-gray-600 mb-6">Access your academic journey with comprehensive tools:</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-blue-500" /> View courses & enrollment
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-blue-500" /> Check grades & results
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-blue-500" /> Track attendance
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-blue-500" /> Pay fees online
                </li>
              </ul>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/register')}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition"
                >
                  Register Now
                </button>
                <button 
                  onClick={() => navigate('/login/student')}
                  className="w-full px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 font-semibold transition"
                >
                  Login
                </button>
              </div>
            </div>

            {/* Faculty Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-8 border-t-4 border-green-500">
              <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <FaChalkboardTeacher className="text-3xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">For Faculty</h3>
              <p className="text-gray-600 mb-6">Manage your courses and students efficiently:</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-green-500" /> Create & manage courses
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-green-500" /> Upload grades & marks
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-green-500" /> Track attendance
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-green-500" /> Communicate with students
                </li>
              </ul>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/register')}
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition"
                >
                  Register Now
                </button>
                <button 
                  onClick={() => navigate('/login/faculty')}
                  className="w-full px-6 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 font-semibold transition"
                >
                  Login
                </button>
              </div>
            </div>

            {/* Admin Card */}
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 p-8 border-t-4 border-purple-500">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mb-6">
                <FaShieldAlt className="text-3xl text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">For Admins</h3>
              <p className="text-gray-600 mb-6">Control and manage the entire system:</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-purple-500" /> Manage users
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-purple-500" /> Handle departments
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-purple-500" /> System settings
                </li>
                <li className="flex items-center gap-3 text-gray-700">
                  <FaCheckCircle className="text-purple-500" /> Generate reports
                </li>
              </ul>
              <div className="space-y-3">
                <button 
                  onClick={() => navigate('/register')}
                  className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-semibold transition"
                >
                  Register Now
                </button>
                <button 
                  onClick={() => navigate('/login/admin')}
                  className="w-full px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 font-semibold transition"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600">Everything you need to manage education effectively</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <div className="text-4xl text-indigo-600 mb-4">
                <FaShieldAlt />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">BCrypt encryption, JWT authentication, and role-based access control</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <div className="text-4xl text-green-600 mb-4">
                <FaClipboardList />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Management</h3>
              <p className="text-gray-600">Intuitive interface for managing courses, grades, and students</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <div className="text-4xl text-blue-600 mb-4">
                <FaChartLine />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics</h3>
              <p className="text-gray-600">Track performance and generate detailed reports instantly</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <div className="text-4xl text-purple-600 mb-4">
                <FaClock />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real-time Updates</h3>
              <p className="text-gray-600">Get instant notifications about grades, announcements, and events</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <div className="text-4xl text-orange-600 mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-600">Seamless communication between students, faculty, and admins</p>
            </div>

            <div className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <div className="text-4xl text-pink-600 mb-4">
                <FaHeadset />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">Dedicated support team ready to help you anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold">Ready to Transform Education Management?</h2>
          <p className="text-xl text-indigo-100">Join thousands of students and faculty members using EduPortal</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/register')}
              className="px-8 py-4 bg-white text-indigo-600 rounded-lg hover:shadow-lg font-bold text-lg transition transform hover:scale-105"
            >
              Get Started Free
            </button>
            <button 
              onClick={() => navigate('/login/student')}
              className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-indigo-700 font-bold text-lg transition"
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-300 px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4 cursor-pointer" onClick={() => navigate('/')}>
                <div className="p-2 bg-indigo-600 rounded-lg">
                  <FaBookReader className="text-xl text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">EduPortal</h3>
              </div>
              <p className="text-gray-400">Complete academic management solution for colleges</p>
              <div className="flex gap-4 mt-4">
                <FaGithub className="text-xl hover:text-indigo-400 cursor-pointer transition" />
                <FaLinkedin className="text-xl hover:text-indigo-400 cursor-pointer transition" />
                <FaTwitter className="text-xl hover:text-indigo-400 cursor-pointer transition" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-indigo-400 transition">Features</a></li>
                <li><a href="#roles" className="hover:text-indigo-400 transition">Roles</a></li>
                <li><button onClick={() => navigate('/register')} className="hover:text-indigo-400 transition">Register</button></li>
                <li><button onClick={() => navigate('/login/student')} className="hover:text-indigo-400 transition">Login</button></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-white font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="mailto:support@eduportal.com" className="hover:text-indigo-400 transition">Email Support</a></li>
                <li><a href="tel:+1234567890" className="hover:text-indigo-400 transition">Call Us</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-indigo-400 transition">FAQ</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📧 support@eduportal.com</li>
                <li>📱 +1 (555) 123-4567</li>
                <li>📍 123 College Street</li>
                <li>City, State 12345</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
              <p>&copy; 2024 EduPortal. All rights reserved.</p>
              <div className="flex gap-6 mt-4 md:mt-0">
                <a href="#" className="hover:text-indigo-400 transition">Privacy Policy</a>
                <a href="#" className="hover:text-indigo-400 transition">Terms of Service</a>
                <a href="#" className="hover:text-indigo-400 transition">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
