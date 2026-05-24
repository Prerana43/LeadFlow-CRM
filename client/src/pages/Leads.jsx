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
            onChange={(e) =>
              setFormData({
                ...formData,
                dealValue: e.target.value,
              })
            }
          />

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

        <div className="bg-white rounded-xl shadow-md p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3">Company</th>
                <th className="text-left p-3">Client</th>
                <th className="text-left p-3">Email</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Deal Value</th>
                <th className="text-left p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b">
                  <td className="p-3">{lead.companyName}</td>
                  <td className="p-3">{lead.clientName}</td>
                  <td className="p-3">{lead.email}</td>
                  <td className="p-3">{lead.status}</td>
                  <td className="p-3">₹{lead.dealValue}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteLead(lead._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
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
  );
}

export default Leads;
