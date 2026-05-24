import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

function Leads() {
  const [leads, setLeads] = useState([]);

  const [formData, setFormData] = useState({
    companyName: "",
    clientName: "",
    email: "",
    status: "New",
    dealValue: "",
    notes: "",
    nextFollowUp: "",
    assignedTo: "",
  });

  const fetchLeads = async () => {
    const res = await API.get("/leads");
    setLeads(res.data);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await API.post("/leads", formData);

    setFormData({
      companyName: "",
      clientName: "",
      email: "",
      status: "New",
      dealValue: "",
      notes: "",
      nextFollowUp: "",
      assignedTo: "",
    });

    fetchLeads();
  };

  const deleteLead = async (id) => {
    await API.delete(`/leads/${id}`);
    fetchLeads();
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">Lead Management</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-md mb-8 grid grid-cols-2 gap-4"
        >
          <input
            type="text"
            placeholder="Company Name"
            className="border p-3 rounded-lg"
            value={formData.companyName}
            onChange={(e) =>
              setFormData({
                ...formData,
                companyName: e.target.value,
              })
            }
          />

          <input
            type="text"
            placeholder="Client Name"
            className="border p-3 rounded-lg"
            value={formData.clientName}
            onChange={(e) =>
              setFormData({
                ...formData,
                clientName: e.target.value,
              })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg"
            value={formData.email}
            onChange={(e) =>
              setFormData({
                ...formData,
                email: e.target.value,
              })
            }
          />

          <input
            type="number"
            placeholder="Deal Value"
            className="border p-3 rounded-lg"
            value={formData.dealValue}
            onChange={(e) =>
              setFormData({
                ...formData,
                dealValue: e.target.value,
              })
            }
          />

          <textarea
            placeholder="Client Notes"
            rows="4"
            className="border p-3 rounded-lg col-span-2"
            value={formData.notes}
            onChange={(e) =>
              setFormData({
                ...formData,
                notes: e.target.value,
              })
            }
          />
          <input
            type="date"
            className="border p-3 rounded-lg"
            value={formData.nextFollowUp}
            onChange={(e) =>
              setFormData({
                ...formData,
                nextFollowUp: e.target.value,
              })
            }
          />

          <select
            className="border p-3 rounded-lg"
            value={formData.assignedTo}
            onChange={(e) =>
              setFormData({
                ...formData,
                assignedTo: e.target.value,
              })
            }
          >
            <option value="">Assign BDA</option>

            <option value="Rahul Sharma">Rahul Sharma</option>

            <option value="Priya Verma">Priya Verma</option>

            <option value="Amit Singh">Amit Singh</option>
          </select>

          <select
            className="border p-3 rounded-lg"
            value={formData.status}
            onChange={(e) =>
              setFormData({
                ...formData,
                status: e.target.value,
              })
            }
          >
            <option>New</option>
            <option>Contacted</option>
            <option>Negotiation</option>
            <option>Won</option>
            <option>Lost</option>
          </select>

          <button className="bg-blue-600 text-white p-3 rounded-lg col-span-2">
            Add Lead
          </button>
        </form>

        <div className="bg-white rounded-3xl shadow-md p-6 overflow-hidden">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Leads Overview
              </h2>

              <p className="text-gray-500 mt-1">
                Manage and monitor all client leads
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50 text-gray-600 text-sm">
                  <th className="text-left p-4 font-semibold">Company</th>

                  <th className="text-left p-4 font-semibold">
                    Client Details
                  </th>

                  <th className="text-left p-4 font-semibold">Deal</th>

                  <th className="text-left p-4 font-semibold">Status</th>

                  <th className="text-left p-4 font-semibold">Notes</th>

                  <th className="text-left p-4 font-semibold">Action</th>
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    {/* COMPANY */}

                    <td className="p-4">
                      <h3 className="font-semibold text-gray-800">
                        {lead.companyName}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {lead.assignedTo || "Unassigned"}
                      </p>
                    </td>

                    {/* CLIENT */}

                    <td className="p-4">
                      <p className="font-medium text-gray-700">
                        {lead.clientName}
                      </p>

                      <p className="text-sm text-gray-500">{lead.email}</p>

                      <p className="text-xs text-emerald-600 mt-1">
                        Follow-Up: {lead.nextFollowUp || "N/A"}
                      </p>
                    </td>

                    {/* DEAL */}

                    <td className="p-4 whitespace-nowrap">
                      <p className="font-semibold text-emerald-600">
                        ₹{lead.dealValue}
                      </p>
                    </td>

                    {/* STATUS */}

                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={
                          lead.status === "Won"
                            ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                            : lead.status === "Lost"
                              ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                              : lead.status === "Contacted"
                                ? "bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                                : lead.status === "Negotiation"
                                  ? "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                                  : "bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        }
                      >
                        {lead.status}
                      </span>
                    </td>

                    {/* NOTES */}

                    <td className="p-4 max-w-[220px]">
                      <p className="truncate text-gray-600 text-sm">
                        {lead.notes || "No notes"}
                      </p>
                    </td>

                    {/* ACTION */}

                    <td className="p-4">
                      <button
                        onClick={() => deleteLead(lead._id)}
                        className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leads;
