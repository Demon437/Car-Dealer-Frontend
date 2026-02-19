import React, { useEffect, useState, useMemo } from "react";
import api from "@/api/api";
import AdminViewSellRequest from "./AdminViewSellRequest";
import { CheckCircle, Search, Filter, X } from "lucide-react";

/* ================= TYPES ================= */
interface ApprovedRequest {
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
  adminSellingPrice: number;
}

/* ================= CARD ================= */
const ApprovedCard: React.FC<{
  request: ApprovedRequest;
  onClick: () => void;
}> = ({ request, onClick }) => (
  <div
    onClick={onClick}
    className="
      bg-white rounded-2xl border border-gray-200 
      shadow-sm hover:shadow-lg hover:border-green-300
      p-5 cursor-pointer
      transition-all duration-300
      flex flex-col
    "
  >
    {/* Header */}
    <div className="flex items-start justify-between mb-4 pb-4 border-b border-gray-100">
      <div className="flex-1">
        <h2 className="text-lg font-bold text-gray-900">
          {request.car.brand} {request.car.model}
        </h2>
        <p className="text-sm text-gray-500 mt-1">Year: {request.car.year}</p>
      </div>

      <div className="flex-shrink-0">
        <CheckCircle className="text-green-600" size={24} />
      </div>
    </div>

    {/* Price Section */}
    <div className="space-y-2 mb-4">
      <p className="text-xs text-gray-500 uppercase font-semibold">Selling Price</p>
      <p className="text-2xl font-bold text-gradient bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
        ₹{(request.adminSellingPrice / 100000).toFixed(1)}L
      </p>
    </div>

    {/* Seller Info */}
    <div className="mt-auto pt-4 border-t border-gray-100">
      <p className="text-sm text-gray-600"><span className="font-semibold">Seller:</span> {request.seller.name}</p>
      <div className="flex items-center justify-between mt-2">
        <p className="text-xs text-gray-500">{request.seller.phone}</p>
        <span className="text-blue-600 font-semibold text-sm">View →</span>
      </div>
    </div>
  </div>
);

/* ================= PAGE ================= */
const ApprovedRequests: React.FC = () => {
  const [data, setData] = useState<ApprovedRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBrand, setFilterBrand] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(
    null
  );

  const [showFilters, setShowFilters] = useState(false);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const res = await api.get("/admin/approved");
        setData(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApproved();
  }, []);

  /* ================= BRANDS ================= */
  const brands = useMemo(
    () => [...new Set(data.map((r) => r.car.brand))],
    [data]
  );

  /* ================= FILTER LOGIC ================= */
  const filteredData = useMemo(() => {
    let filtered = data.filter(
      (r) =>
        r.car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.car.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.seller.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filterBrand) {
      filtered = filtered.filter((r) => r.car.brand === filterBrand);
    }

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case "year-asc":
            return a.car.year - b.car.year;
          case "year-desc":
            return b.car.year - a.car.year;
          case "price-asc":
            return a.adminSellingPrice - b.adminSellingPrice;
          case "price-desc":
            return b.adminSellingPrice - a.adminSellingPrice;
          default:
            return 0;
        }
      });
    }

    return filtered;
  }, [data, searchTerm, sortBy, filterBrand]);

  /* ================= LOADER ================= */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading approved requests...</p>
        </div>
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">
          Approved Requests
        </h1>
        <p className="text-gray-500 mt-2">
          Manage {data.length} approved sell requests
        </p>
      </div>

      {/* SEARCH + FILTER SECTION */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        {/* SEARCH BAR */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search brand, model, seller..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* MOBILE FILTER BUTTON */}
        <button
          onClick={() => setShowFilters(true)}
          className="md:hidden flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 font-semibold hover:bg-blue-100 transition"
        >
          <Filter size={20} />
          Filter & Sort
        </button>

        {/* DESKTOP FILTERS */}
        <div className="hidden md:flex gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort by...</option>
            <option value="year-asc">Year (Oldest)</option>
            <option value="year-desc">Year (Newest)</option>
            <option value="price-asc">Price (Low → High)</option>
            <option value="price-desc">Price (High → Low)</option>
          </select>

          <select
            value={filterBrand}
            onChange={(e) => setFilterBrand(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Brands</option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* GRID */}
      {filteredData.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
          <CheckCircle size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg font-medium">
            No approved requests found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredData.map((r) => (
            <ApprovedCard
              key={r._id}
              request={r}
              onClick={() => {
                setSelectedRequestId(r._id);
                setShowModal(true);
              }}
            />
          ))}
        </div>
      )}

      {/* ================= MOBILE FILTER SHEET ================= */}
      {showFilters && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end md:hidden">
          <div className="bg-white w-full rounded-t-2xl p-6 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Filters & Sort</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={20} className="text-gray-600" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Sort by...</option>
              <option value="year-asc">Year (Oldest)</option>
              <option value="year-desc">Year (Newest)</option>
              <option value="price-asc">Price (Low → High)</option>
              <option value="price-desc">Price (High → Low)</option>
            </select>

            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <button
              onClick={() => setShowFilters(false)}
              className="w-full py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition mt-2"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* ================= VIEW MODAL ================= */}
      {showModal && selectedRequestId && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center p-4">
          <div
            className="
              bg-white w-full md:max-w-5xl
              md:rounded-2xl rounded-t-2xl
              overflow-y-auto shadow-2xl
              max-h-[90vh]
            "
          >
            <AdminViewSellRequest
              requestId={selectedRequestId}
              onClose={() => {
                setShowModal(false);
                setSelectedRequestId(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovedRequests;
