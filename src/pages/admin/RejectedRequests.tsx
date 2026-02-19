import { useEffect, useState } from "react";
import { XCircle, User, Phone, Clock } from "lucide-react";
import api from "@/api/api";

interface RejectedRequest {
  _id: string;
  car: {
    brand: string;
    model: string;
    year: number;
  };
  seller: {
    name: string;
    phone: string;
  };
  rejectReason: string;
}

const RejectedRequests = () => {
  const [data, setData] = useState<RejectedRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRejected = async () => {
    try {
      const res = await api.get("/admin/rejected");
      setData(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRejected();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading rejected requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Rejected Requests
        </h1>
        <p className="text-gray-500 mt-2">
          Review {data.length} rejected sell requests with reasons
        </p>
      </div>

      {/* EMPTY STATE */}
      {data.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
          <XCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg font-medium">
            No rejected requests found
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Rejected sell requests will appear here
          </p>
        </div>
      )}

      {/* LIST */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((r) => (
          <div
            key={r._id}
            className="bg-white rounded-2xl border border-gray-200 hover:border-red-300 shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col"
          >
            {/* TOP BAR */}
            <div className="p-5 bg-gradient-to-r from-red-50 to-pink-50 border-b border-red-100 flex items-start gap-4">
              <div className="h-12 w-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0">
                <XCircle className="text-red-600" size={20} />
              </div>

              <div className="flex-1">
                <h2 className="font-bold text-lg text-gray-900">
                  {r.car.brand} {r.car.model}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Model Year: {r.car.year}
                </p>
              </div>
            </div>

            {/* BODY */}
            <div className="p-5 flex-1 flex flex-col gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <User size={18} className="text-gray-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{r.seller.name}</span>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Phone size={18} className="text-gray-600 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{r.seller.phone}</span>
                </div>
              </div>

              {/* REJECTION REASON */}
              <div className="mt-auto pt-4 border-t border-gray-200">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={16} className="text-red-600" />
                    <p className="text-xs font-bold text-red-700 uppercase tracking-wide">
                      Rejection Reason
                    </p>
                  </div>
                  <p className="text-sm text-red-900 leading-relaxed">
                    {r.rejectReason || "No reason provided"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RejectedRequests;
