import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";

import StatsCard from "../components/StatsCard";

import API from "../services/api";

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

  // STATS

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

  // TOTAL REVENUE

  const totalRevenue = leads.reduce(
    (acc, lead) =>
      acc + Number(lead.dealValue || 0),
    0
  );

  // TOP BDA

  const bdaCount = {};

  leads.forEach((lead) => {

    if (lead.assignedTo) {

      bdaCount[lead.assignedTo] =
        (bdaCount[lead.assignedTo] || 0) + 1;
    }
  });

  const topBDA =
    Object.keys(bdaCount).reduce(
      (a, b) =>
        bdaCount[a] > bdaCount[b]
          ? a
          : b,
      Object.keys(bdaCount)[0]
    ) || "No Data";

  // CHART DATA

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

    <MainLayout>

      <h1 className="text-4xl font-bold text-gray-800 mb-8">

        Dashboard

      </h1>

      {/* STATS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">

        <StatsCard
          title="Total Leads"
          value={totalLeads}
        />

        <StatsCard
          title="Won Deals"
          value={wonDeals}
        />

        <StatsCard
          title="Revenue"
          value={`₹${totalRevenue}`}
        />

        <StatsCard
          title="Top BDA"
          value={topBDA}
        />

      </div>

      {/* CHART + FOLLOW UPS */}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* CHART */}

        <div className="xl:col-span-2 bg-white rounded-3xl shadow-md p-6">

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">

            Lead Analytics

          </h2>

          <ResponsiveContainer
            width="100%"
            height={350}
          >

            <BarChart data={chartData}>

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                radius={[10, 10, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* FOLLOW UPS */}

        <div className="bg-white rounded-3xl shadow-md p-6">

          <h2 className="text-2xl font-semibold text-gray-800 mb-6">

            Upcoming Follow-Ups

          </h2>

          <div className="space-y-4">

            {leads
              .filter((lead) => lead.nextFollowUp)
              .slice(0, 5)
              .map((lead) => (

                <div
                  key={lead._id}
                  className="border border-gray-200 rounded-2xl p-4"
                >

                  <h3 className="font-semibold text-gray-800">

                    {lead.companyName}

                  </h3>

                  <p className="text-sm text-gray-500 mt-1">

                    {lead.clientName}

                  </p>

                  <div className="flex justify-between items-center mt-3">

                    <span className="text-sm bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">

                      {lead.nextFollowUp}

                    </span>

                    <span className="text-sm text-gray-600">

                      {lead.assignedTo}

                    </span>

                  </div>

                </div>

              ))}

          </div>

        </div>

      </div>

      {/* RECENT LEADS */}

      <div className="bg-white rounded-3xl shadow-md p-6 mt-10">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">

          Recent Leads

        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b text-gray-600">

                <th className="text-left p-4">
                  Company
                </th>

                <th className="text-left p-4">
                  Client
                </th>

                <th className="text-left p-4">
                  BDA
                </th>

                <th className="text-left p-4">
                  Deal Value
                </th>

                <th className="text-left p-4">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {leads.slice(0, 6).map((lead) => (

                <tr
                  key={lead._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {lead.companyName}
                  </td>

                  <td className="p-4">
                    {lead.clientName}
                  </td>

                  <td className="p-4">
                    {lead.assignedTo}
                  </td>

                  <td className="p-4">
                    ₹{lead.dealValue}
                  </td>

                  <td className="p-4">

                    <span
                      className={
                        lead.status === "Won"
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                          : lead.status === "Lost"
                          ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                          : lead.status === "Contacted"
                          ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                          : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
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

    </MainLayout>
  );
}

export default Dashboard;