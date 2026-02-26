import { useEffect, useState } from "react";
import { IndianRupee, Calendar, Gauge, Car } from "lucide-react";
import api from "@/api/api";
import MarkSoldModal from "./MarkSoldModal";



const mapToMarkSoldCar = (car: LiveCar) => ({
  _id: car._id,

  brand: car.car.brand,
  variant: car.car.variant,
  year: car.car.year,
  fuelType: car.car.fuelType,
  transmission: car.car.transmission,
  registrationNumber: car.car.registrationNumber,
  kmDriven: car.car.kmDriven,
  condition: car.car.condition,
  images: car.car.images,

  adminSellingPrice: car.adminSellingPrice,
  sellerPrice: car.sellerPrice,

  status: car.status,

  seller: car.seller,
});

/* ================= TYPES ================= */

interface LiveCar {
  _id: string;

  car: {
    brand: string;
    variant?: string;
    year: number;
    fuelType?: string;
    transmission?: string;
    registrationNumber?: string;
    kmDriven?: number;
    condition?: string;
    images?: string[];
  };

  sellerPrice?: number | null;
  adminSellingPrice?: number | null;

  status?: "LIVE" | "SOLD";

  seller?: {
    type: "platform" | "dealer" | "individual";
    name?: string;
    phone?: string;
    altPhone?: string;
    email?: string;
    city?: string;
    area?: string;
    sourcePlatform?: string;
  };
}

/* ================= COMPONENT ================= */

const LiveCars = () => {
  const [cars, setCars] = useState<LiveCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCar, setSelectedCar] = useState<any>(null);
  /* ================= FETCH ================= */

  const fetchLiveCars = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/live-cars");

      // ✅ PLATFORM ONLY
      const platformCars = (res.data || []).filter(
        (car: LiveCar) => car.seller?.type === "platform"
      );

      setCars(platformCars);
    } catch (err) {
      console.error(err);
      setError("Failed to load live cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveCars();
  }, []);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full" />
        <span className="ml-3 text-gray-600">Loading live cars...</span>
      </div>
    );
  }

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  /* ================= UI ================= */

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900">Platform Cars</h1>
        <p className="text-gray-500 mt-2">
          Cars currently visible on the platform — Manage listings and track sales
        </p>
      </div>

      {/* EMPTY STATE */}
      {cars.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
          <Car size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg font-medium">
            No platform live cars available
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Cars will appear here once sellers list them
          </p>
        </div>
      )}

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => {
          const finalPrice =
            car.adminSellingPrice ?? car.sellerPrice ?? null;

          const imageUrl = car.car?.images?.[0];

          return (
            <div
              key={car._id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-200 hover:border-blue-300 flex flex-col"
            >
              {/* SOLD OVERLAY */}
              {car.status === "SOLD" && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                  <img
                    src="/Sold.png"
                    alt="Sold"
                    className="w-32 rotate-[-20deg] drop-shadow-lg"
                  />
                </div>
              )}

              {/* IMAGE SECTION */}
              <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={car.car.brand}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-400">
                    <Car size={40} className="mb-2" />
                    <p className="text-sm">No Image</p>
                  </div>
                )}

                {/* BADGES */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                    ✓ LIVE
                  </span>
                </div>
              </div>

              {/* CONTENT */}
              <div className="p-5 flex-1 flex flex-col">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    {car.car.brand}
                    {car.car.variant ? ` ${car.car.variant}` : ""}
                  </h2>

                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    {car.car.year && (
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-blue-600" />
                        {car.car.year}
                      </div>
                    )}

                    {car.car.fuelType && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {car.car.fuelType}
                      </span>
                    )}
                  </div>
                </div>

                {car.car.kmDriven !== undefined && (
                  <p className="text-sm text-gray-600 flex items-center gap-2 mb-2">
                    <Gauge size={14} className="text-orange-600" />
                    <span>{car.car.kmDriven.toLocaleString()} km</span>
                  </p>
                )}

                {/* PRICE - PROMINENT */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-400 mb-1 uppercase font-semibold">Selling Price</p>
                  <div className="flex items-baseline gap-1">
                    <IndianRupee size={18} className="text-green-600" />
                    <span className="text-2xl font-bold text-gray-900">
                      {finalPrice
                        ? (finalPrice / 100000).toFixed(1)
                        : "—"}
                    </span>
                    {finalPrice && <span className="text-sm text-gray-500">lakhs</span>}
                  </div>
                </div>

                {/* ACTION BUTTON */}
                <button
                  onClick={() => setSelectedCar(mapToMarkSoldCar(car))}
                  disabled={car.status === "SOLD"}
                  className={`w-full mt-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${car.status === "SOLD"
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-md hover:shadow-lg"
                    }`}
                >
                  {car.status === "SOLD" ? "✓ Sold" : "Mark as Sold"}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* SOLD MODAL */}
      {selectedCar && (
        <MarkSoldModal
          car={selectedCar}
          onClose={() => setSelectedCar(null)}
          onSuccess={fetchLiveCars}
        />
      )}
    </div>
  );
};

export default LiveCars;
