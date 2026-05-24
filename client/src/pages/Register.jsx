import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import API from "../services/api";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
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

      await API.post(
        "/auth/register",
        formData
      );

      navigate("/");

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Registration Failed"
      );
    }
  };

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">

      <div className="flex-1 flex items-center justify-center p-6">

        <div className="w-full max-w-md bg-white rounded-3xl p-10 shadow-2xl">

          <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center">

            Create Account

          </h2>

          <p className="text-gray-500 text-center mb-8">

            Join LeadFlow CRM

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

                Full Name

              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter full name"
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-100 text-gray-900 placeholder-gray-400 border border-gray-200 outline-none focus:border-emerald-500 focus:bg-white"
                required
              />

            </div>

            <div>

              <label className="block text-gray-700 mb-2 text-sm font-medium">

                Email

              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter email"
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
                placeholder="Create password"
                onChange={handleChange}
                className="w-full p-4 rounded-xl bg-gray-100 text-gray-900 placeholder-gray-400 border border-gray-200 outline-none focus:border-emerald-500 focus:bg-white"
                required
              />

            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 text-white font-semibold py-4 rounded-xl hover:bg-emerald-700 transition"
            >

              Register

            </button>

          </form>

          <p className="text-center text-gray-500 mt-8">

            Already have an account?{" "}

            <Link
              to="/"
              className="font-semibold text-emerald-600"
            >

              Login

            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;