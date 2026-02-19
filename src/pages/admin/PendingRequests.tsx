import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  User,
  Phone,
  IndianRupee,
  Car,
  Clock,
} from "lucide-react";
import api from "../../api/api";
import StatusBadge from "@/components/ui/StatusBadge";
import AdminApproveSellRequest from "@/pages/admin/AdminApproveSellRequest";

interface SellRequest {
  _id: string;

  source: "ONLINE" | "OFFLINE";
  seller: {
    name: string;
    phone: string;
  };
  car: {
    brand: string;
    model: string;
    year: number;
  };
  sellerPrice: number;
}

const PendingRequests: React.FC = () => {
  const [requests, setRequests] = useState<SellRequest[]>([]);
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");

  const [showApproveModal, setShowApproveModal] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<SellRequest | null>(null);

  // ================= FETCH =================
  const fetchRequests = async () => {
    try {
      const res = await api.get("/admin/sell-requests");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // ================= REJECT =================
  const rejectRequest = async () => {
    if (!rejectId || !rejectReason.trim()) {
      return alert("Please enter reject reason");
    }

    try {
      await api.put(`/admin/reject/${rejectId}`, {
        reason: rejectReason,
      });

      setRejectId(null);
      setRejectReason("");
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Reject failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Pending Sell Requests
        </h1>
        <p className="text-gray-500 mt-2">
          Review and approve {requests.length} seller submissions
        </p>
      </div>

      {/* EMPTY STATE */}
      {requests.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
          <Clock size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg font-medium">
            No pending requests
          </p>
          <p className="text-gray-400 text-sm mt-2">
            All sell requests have been reviewed
          </p>
        </div>
      )}

      {/* REQUEST LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {requests.map((r) => (
          <div
            key={r._id}
            className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-blue-300 transition-all overflow-hidden flex flex-col"
          >
            {/* CARD HEADER WITH BADGE */}
            <div className="p-5 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center flex-shrink-0">
                  <Car size={20} className="text-blue-700" />
                </div>

                <div>
                  <h2 className="font-bold text-lg text-gray-900">
                    {r.car.brand} {r.car.model}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Model Year: {r.car.year}
                  </p>
                </div>
              </div>

              <div className="flex-shrink-0">
                <StatusBadge
                  label={r.source}
                  type={r.source === "ONLINE" ? "online" : "offline"}
                />
              </div>
            </div>

            {/* DETAILS */}
            <div className="p-5 space-y-4 flex-1">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User size={18} className="text-gray-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{r.seller.name}</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={18} className="text-gray-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{r.seller.phone}</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-100">
                  <IndianRupee size={18} className="text-green-600 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Asking Price</p>
                    <p className="text-lg font-bold text-green-700">
                      ₹{r.sellerPrice.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="p-5 pt-0 border-t border-gray-100 space-y-3">
              <button
                onClick={() => {
                  setSelectedRequest(r);
                  setShowApproveModal(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-3 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg"
              >
                <CheckCircle size={18} />
                Approve Request
              </button>

              <button
                onClick={() => setRejectId(r._id)}
                className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-3 rounded-xl font-semibold transition-all border border-red-200 hover:border-red-300"
              >
                <XCircle size={18} />
                Reject Request
              </button>

              {/* REJECT BOX */}
              {rejectId === r._id && (
                <div className="mt-3 p-4 bg-red-50 border border-red-200 rounded-xl space-y-3">
                  <input
                    type="text"
                    placeholder="Enter rejection reason..."
                    className="w-full border border-red-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={rejectRequest}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Confirm Reject
                    </button>

                    <button
                      onClick={() => {
                        setRejectId(null);
                        setRejectReason("");
                      }}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-semibold transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ================= APPROVE MODAL ================= */}
      {showApproveModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4 py-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <AdminApproveSellRequest
              requestId={selectedRequest._id}
              onClose={() => {
                setShowApproveModal(false);
                setSelectedRequest(null);
                fetchRequests();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingRequests;
