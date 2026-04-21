// pages/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    navigate("/login");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="hidden md:flex flex-col justify-center px-12 bg-gradient-to-br from-green-400 to-emerald-600 text-white">
        <h1 className="text-4xl font-bold mb-4">SolarIQ ⚡</h1>
        <p className="text-lg opacity-90">
          Start tracking your solar performance and unlock smarter energy insights.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6">
            Get started in seconds
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="John Doe"
                onChange={handleChange}
                className="w-full px-4 py-3 border placeholder-gray-400 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Minimum 6 characters"
                onChange={handleChange}
                className="w-full px-4 py-3 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            <button className="w-full py-3 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 transition">
              Create Account
            </button>

          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-green-600 font-medium">
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}