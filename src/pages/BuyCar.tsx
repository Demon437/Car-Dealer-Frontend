import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/api/api";

/* ================= NORMALIZER ================= */

const normalizeCar = (item: any) => ({
  _id: item._id,

  // 🔥 flatten car object
  brand: item.car?.brand,
  variant: item.car?.variant,
  year: item.car?.year,
  fuelType: item.car?.fuelType,
  transmission: item.car?.transmission,
  registrationNumber: item.car?.registrationNumber,
  kmDriven: item.car?.kmDriven,
  condition: item.car?.condition,
  images: item.car?.images || [],

  // prices
  sellerPrice: item.sellerPrice,
  adminSellingPrice: item.adminSellingPrice,

  // meta
  status: item.status,
  source: item.source,
  seller: item.seller,
});

/* ================= COMPONENT ================= */

const BuyCar = () => {
  const [cars, setCars] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await api.get("/admin/live-cars");

      // ✅ normalize once
      const normalized = (res.data || []).map(normalizeCar);

      setCars(normalized);
    } catch (err) {
      console.error("Failed to fetch cars", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCars = cars.filter((car) => {
    const name = `${car.brand ?? ""} ${car.variant ?? ""}`.toLowerCase();
    return name.includes(search.toLowerCase());
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cars...
      </div>
    );
  }

//   return (
//     <div className="min-h-screen bg-background">
//       <Navbar />

//       {/* ================= HERO ================= */}
//       <section className="pt-28 pb-12 bg-gradient-hero">
//         <div className="container mx-auto px-4 text-center space-y-6">
//           <h1 className="text-4xl font-bold">Find Your Perfect Car</h1>

//           <div className="relative max-w-xl mx-auto">
//             <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//             <Input
//               placeholder="Search by brand or model..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="pl-12 h-14"
//             />
//           </div>
//         </div>
//       </section>

//       {/* ================= RESULTS ================= */}
//       <section className="py-8">
//         <div className="container mx-auto px-4">
//           <p className="mb-6 text-muted-foreground">
//             {filteredCars.length} cars found
//           </p>

//           {filteredCars.length > 0 ? (
//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//               {filteredCars.map((car) => {
//                 const imageUrl =
//                   car.images?.[0] ||
//                   "https://via.placeholder.com/400x300?text=No+Image";

//                 const price =
//                   car.adminSellingPrice ??
//                   car.sellerPrice ??
//                   0;

//                 return (
//                   <CarCard
//                     key={car._id}
//                     id={car._id}
//                     image={imageUrl}
//                     brand={car.brand}
//                     variant={car.variant}
//                     year={car.year}
//                     km={car.kmDriven}
//                     fuel={car.fuelType}
//                     price={price}
//                     status={car.status}
//                   />
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="text-center py-16">
//               <p className="text-xl text-muted-foreground mb-4">
//                 No cars found
//               </p>
//               <Button variant="outline" onClick={() => setSearch("")}>
//                 Clear Search
//               </Button>
//             </div>
//           )}
//         </div>
//       </section>

//       <Footer />
//     </div>
//   );
// };

// export default BuyCar;


return (
  <div className="min-h-screen bg-background">
    <Navbar />

    {/* ================= HERO ================= */}
    <section className="pt-32 pb-16 relative overflow-hidden">
      {/* soft background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-100 via-white to-red-200" />
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-200/20 blur-3xl rounded-full" />

      <div className="relative container mx-auto px-4 text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900">
          Find Your Perfect Car
        </h1>

        <p className="text-muted-foreground max-w-xl mx-auto">
          Explore verified vehicles with transparent pricing and trusted history.
        </p>

        {/* SEARCH */}
        <div className="relative max-w-xl mx-auto group">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-blue-600 transition" />

          <Input
            placeholder="Search by brand or model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              pl-14 h-14 rounded-xl border border-gray-300
              shadow-sm
              transition-all duration-300
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              focus:shadow-lg
              hover:border-blue-400
            "
          />
        </div>
      </div>
    </section>

    {/* ================= RESULTS ================= */}
    <section className="pb-16">
      <div className="container mx-auto px-4">

        {/* RESULT HEADER */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-gray-800">
              {filteredCars.length}
            </span>{" "}
            available cars
          </p>
        </div>

        {/* GRID */}
        {filteredCars.length > 0 ? (
          <div
            className="
              grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8
              animate-[fadeIn_.5s_ease]
            "
          >
            {filteredCars.map((car) => {
              const imageUrl =
                car.images?.[0] ||
                "https://via.placeholder.com/400x300?text=No+Image";

              const price =
                car.adminSellingPrice ??
                car.sellerPrice ??
                0;

              return (
                <CarCard
                  key={car._id}
                  id={car._id}
                  image={imageUrl}
                  brand={car.brand}
                  variant={car.variant}
                  year={car.year}
                  km={car.kmDriven}
                  fuel={car.fuelType}
                  price={price}
                  status={car.status}
                />
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="text-center py-24 space-y-6 animate-[fadeIn_.4s_ease]">
            <div className="text-5xl">🚗</div>

            <h3 className="text-2xl font-semibold text-gray-800">
              No Cars Found
            </h3>

            <p className="text-muted-foreground">
              Try adjusting your search to find what you're looking for.
            </p>

            <Button
              variant="outline"
              onClick={() => setSearch("")}
              className="px-6 py-3 hover:bg-gray-100 transition"
            >
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </section>

    <Footer />
  </div>
);
}
export default BuyCar;
