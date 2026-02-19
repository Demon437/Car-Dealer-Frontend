import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/api/api";
import { Button } from "@/components/ui/button";
import { ChevronRight, DollarSign, TrendingUp } from "lucide-react";

const AllSales = () => {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSales = async () => {
      try {
        setLoading(true);
        const res = await api.get("/admin/sales");
        setSales(res.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load sales");
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sales...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 inline-block">
          <p className="text-red-600 text-lg font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">All Sales</h1>
        <p className="text-gray-500 mt-2">
          Manage and track {sales.length} sales transactions
        </p>
      </div>

      {sales.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
          <TrendingUp size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg font-medium">No sales found</p>
          <p className="text-gray-400 text-sm mt-2">Sales will appear here once transactions are completed</p>
        </div>
      ) : (
        <>
          {/* ================= DESKTOP TABLE ================= */}
          <div className="hidden md:block bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Car Details</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Buyer</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Total Amount</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Paid</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Remaining</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sales.map((s) => (
                  <tr key={s.saleId} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {s.car?.brand} {s.car?.variant}
                        </p>
                        <p className="text-sm text-gray-500">{s.saleId}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-900 font-medium">{s.buyer?.name || "—"}</p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-gray-900 font-semibold">
                        ₹{s.totalAmount.toLocaleString("en-IN")}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className="text-green-600 font-semibold">
                        ₹{s.paidAmount.toLocaleString("en-IN")}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <p className={`font-semibold ${s.remainingAmount > 0 ? "text-orange-600" : "text-green-600"}`}>
                        ₹{s.remainingAmount.toLocaleString("en-IN")}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.status === "COMPLETED"
                          ? "bg-green-100 text-green-700"
                          : s.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-blue-100 text-blue-700"
                        }`}>
                        {s.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => navigate(`/admin/sales/${s.saleId}`)}
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 transition-colors font-medium text-sm"
                      >
                        View
                        <ChevronRight size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ================= MOBILE CARDS ================= */}
          <div className="md:hidden space-y-4">
            {sales.map((s) => (
              <div
                key={s.saleId}
                className="bg-white border border-gray-200 rounded-2xl p-4 space-y-4 shadow-sm hover:shadow-lg transition-all"
              >
                {/* Header */}
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      {s.car?.brand} {s.car?.variant}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">ID: {s.saleId}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Buyer: <span className="font-medium">{s.buyer?.name || "—"}</span>
                    </p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${s.status === "COMPLETED"
                      ? "bg-green-100 text-green-700"
                      : s.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                    {s.status}
                  </span>
                </div>

                {/* Amount Details */}
                <div className="grid grid-cols-3 gap-3 py-3 border-t border-b border-gray-200">
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Total</p>
                    <p className="text-sm font-bold text-gray-900">
                      ₹{((s.totalAmount) / 100000).toFixed(1)}L
                    </p>
                  </div>

                  <div className="text-center border-l border-r border-gray-200">
                    <p className="text-xs text-gray-500 mb-1">Paid</p>
                    <p className="text-sm font-bold text-green-600">
                      ₹{((s.paidAmount) / 100000).toFixed(1)}L
                    </p>
                  </div>

                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-1">Due</p>
                    <p className={`text-sm font-bold ${s.remainingAmount > 0 ? "text-orange-600" : "text-green-600"}`}>
                      ₹{((s.remainingAmount) / 100000).toFixed(1)}L
                    </p>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => navigate(`/admin/sales/${s.saleId}`)}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  View Details
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllSales;
