import { useState, useContext } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

import {
  AuthContext,
} from "../contexts/AuthContext";

function Login() {

  const navigate = useNavigate();

  const { login } =
    useContext(AuthContext);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post(
        "/auth/login",
        formData
      );

      login(
        res.data.token,
        res.data.user
      );

      navigate("/dashboard");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Login Failed"
      );
    }
  };

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">

      {/* LEFT SECTION */}

      <div className="hidden lg:flex w-1/2 items-center justify-center p-16">

        <div className="max-w-lg">

          <h1 className="text-6xl font-bold text-white leading-tight mb-6">

            LeadFlow CRM

          </h1>

          <p className="text-gray-300 text-xl leading-relaxed">

            Manage manufacturing sales pipelines,
            track leads, monitor BDA performance,
            and streamline business operations
            through one centralized dashboard.

          </p>

        </div>

      </div>

      {/* RIGHT SECTION */}

      <div className="flex-1 flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl">

          <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center">

            Welcome Back

          </h2>

          <p className="text-gray-500 text-center mb-8">

            Login to continue

          </p>

          {error && (

            <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-xl mb-5">

              {error}

            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label className="block text-gray-700 mb-2 text-sm font-medium">

                Email

              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-100 text-gray-900 placeholder-gray-400 border border-gray-200 outline-none focus:border-emerald-500 focus:bg-white"
                required
              />

            </div>

            <div>

              <label className="block text-gray-700 mb-2 text-sm font-medium">

                Password

              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-100 text-gray-900 placeholder-gray-400 border border-gray-200 outline-none focus:border-emerald-500 focus:bg-white"
                required
              />

            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white font-semibold py-4 rounded-xl hover:bg-emerald-700 transition"
            >

              Login

            </button>

          </form>

          <p className="text-center text-gray-500 mt-8">

            Don’t have an account?{" "}

            <Link
              to="/register"
              className="font-semibold text-emerald-600"
            >

              Register

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;