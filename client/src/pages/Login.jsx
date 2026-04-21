// pages/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE (Branding) */}
      <div className="hidden md:flex flex-col justify-center px-12 bg-gradient-to-br from-yellow-400 to-orange-500 text-white">
        <h1 className="text-4xl font-bold mb-4">SolarIQ ⚡</h1>
        <p className="text-lg opacity-90">
          Monitor your solar energy, track efficiency, and optimize performance in real time.
        </p>
      </div>

      {/* RIGHT SIDE (Form) */}
      <div className="flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-semibold text-gray-800 mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 mb-6">
            Sign in to continue
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className="w-full px-4 py-3 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="w-full px-4  py-3 placeholder-gray-400 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:outline-none"
              />
            </div>

            <button className="w-full py-3 rounded-lg bg-yellow-500 text-white font-medium hover:bg-yellow-600 transition">
              Sign In
            </button>

          </form>

          <p className="text-sm text-gray-500 mt-6 text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-yellow-600 font-medium">
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}