import { Link, useNavigate } from "react-router-dom";

import {
  useContext,
} from "react";

import {
  AuthContext,
} from "../contexts/AuthContext";

import {
  FiHome,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";

function Sidebar() {

  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useContext(AuthContext);

  const handleLogout = () => {

    logout();

    navigate("/");
  };

  return (

    <div className="w-72 bg-[#111827] text-white min-h-screen flex flex-col justify-between shadow-2xl">

      <div>

        <div className="px-8 py-7 border-b border-gray-800">

          <h1 className="text-3xl font-bold tracking-wide">
            LeadFlow
          </h1>

          <p className="text-gray-400 text-sm mt-1">
            CRM Dashboard
          </p>

        </div>

        <div className="p-6 space-y-3">

          <Link
            to="/dashboard"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
          >

            <FiHome size={20} />

            <span className="font-medium">
              Dashboard
            </span>

          </Link>

          <Link
            to="/leads"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-800 transition"
          >

            <FiUsers size={20} />

            <span className="font-medium">
              Leads
            </span>

          </Link>

        </div>

      </div>

      <div className="p-6 border-t border-gray-800">

        <div className="flex items-center gap-4 bg-gray-800 p-4 rounded-2xl">

          <div className="w-16 h-10 rounded-sm bg-blue-600 flex items-center justify-center text-lg font-bold">

            {user?.name?.charAt(0).toUpperCase()}

          </div>

          <div className="flex-1">

            <h3 className="font-semibold">

              {user?.name || "User"}

            </h3>

            <p className="text-sm text-gray-400">

              {user?.email}

            </p>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition py-3 rounded-xl font-medium"
        >

          <FiLogOut size={18} />

          Logout

        </button>

      </div>

    </div>
  );
}

export default Sidebar;