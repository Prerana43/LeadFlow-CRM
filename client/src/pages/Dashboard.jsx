import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import API from "../services/api";
import MainLayout from "../layouts/MainLayout";

import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

function Dashboard() {

  const [leads, setLeads] = useState([]);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await API.get("/leads");
      setLeads(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalLeads = leads.length;

  const wonDeals = leads.filter(
    (lead) => lead.status === "Won"
  ).length;

  const contactedLeads = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const lostDeals = leads.filter(
    (lead) => lead.status === "Lost"
  ).length;

  const chartData = [
    {
      name: "Won",
      value: wonDeals,
    },
    {
      name: "Contacted",
      value: contactedLeads,
    },
    {
      name: "Lost",
      value: lostDeals,
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-8">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <StatsCard
            title="Total Leads"
            value={totalLeads}
          />

          <StatsCard
            title="Won Deals"
            value={wonDeals}
          />

          <StatsCard
            title="Contacted"
            value={contactedLeads}
          />

          <StatsCard
            title="Lost Deals"
            value={lostDeals}
          />

        </div>

        <div className="bg-white rounded-xl shadow-md p-6 h-[400px]">

          <h2 className="text-2xl font-semibold mb-6">
            Lead Analytics
          </h2>

          <ResponsiveContainer width="100%" height="90%">

            <BarChart data={chartData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="value" />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="bg-white rounded-xl shadow-md p-6 mt-10">

          <h2 className="text-2xl font-semibold mb-4">
            Recent Leads
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Company
                </th>

                <th className="text-left p-3">
                  Client
                </th>

                <th className="text-left p-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {leads.slice(0, 5).map((lead) => (

                <tr
                  key={lead._id}
                  className="border-b"
                >

                  <td className="p-3">
                    {lead.companyName}
                  </td>

                  <td className="p-3">
                    {lead.clientName}
                  </td>

                  <td className="p-3">

                    <span
                      className={
                        lead.status === "Won"
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full"
                          : lead.status === "Lost"
                          ? "bg-red-100 text-red-700 px-3 py-1 rounded-full"
                          : lead.status === "Contacted"
                          ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                          : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full"
                      }
                    >
                      {lead.status}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;