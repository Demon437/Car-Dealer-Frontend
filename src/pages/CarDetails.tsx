import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Phone,
  MessageCircle,
  Fuel,
  Calendar,
  Gauge,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import api from "@/api/api";

const PLACEHOLDER = "https://via.placeholder.com/900x600?text=No+Image";


const phoneNumbers = [
  "+919098484153",
  "+917018010668",
];

/* ================= NORMALIZER ================= */

const normalizeCar = (data: any) => {
  // already flat
  if (data.brand) return data;

  // nested structure
  if (data.car) {
    return {
      _id: data._id,
      ...data.car,

      seller: data.seller,
      sellerPrice: data.sellerPrice,
      adminSellingPrice: data.adminSellingPrice,
      status: data.status,
      source: data.source,
      rcDetails: data.rcDetails,
    };
  }

  

  return data;
};

const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [similarCars, setSimilarCars] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetchCar();
      fetchSimilarCars();
    }
  }, [id]);

  /* ================= FETCH MAIN CAR ================= */

  const fetchCar = async () => {
    const res = await api.get(`/cars/${id}`);
    setCar(normalizeCar(res.data));
  };

  /* ================= FETCH SIMILAR ================= */

  const fetchSimilarCars = async () => {
    const res = await api.get("/admin/live-cars");

    const normalized = (res.data || [])
      .map(normalizeCar)
      .filter((c: any) => c._id !== id)
      .slice(0, 3);

    setSimilarCars(normalized);
  };

  if (!car) return <div className="pt-32 text-center">Loading...</div>;

  const price = car.adminSellingPrice || car.sellerPrice;
  const isSold = car.status === "SOLD";
  const images = car.images?.length ? car.images : [PLACEHOLDER];



  // ✅ CALL HANDLER (RETURN SE UPAR)
  const handleCall = () => {
    const randomNumber =
      phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];

    window.location.href = `tel:${randomNumber}`;
  };


  const next = () => setActiveIndex((p) => (p + 1) % images.length);
  const prev = () =>
    setActiveIndex((p) => (p === 0 ? images.length - 1 : p - 1));

  const shareCar = () => {
    const url = window.location.href;
    const text = `Check out this car: ${car.brand} ${car.variant ?? ""} for ₹${price?.toLocaleString()}`;

    if (navigator.share) {
      navigator.share({ title: car.brand, text, url });
    } else {
      window.open(
        `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
        "_blank"
      );
    }
  };
  

  return (
    <>
      <Helmet>
        <title>
          {`${car.brand ?? "Car"} ${car.variant ?? ""} | Buy Used Car`}
        </title>
      </Helmet>

      <Navbar />

      {/* ================= HERO ================= */}
      <section className="pt-28 pb-16 bg-gray-50">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12">

          {/* IMAGE GALLERY */}
          <div>
            <div className="relative overflow-hidden rounded-2xl border bg-white shadow-lg">
              <img
                src={images[activeIndex]}
                className="w-full h-[480px] object-cover"
              />

              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow"
              >
                <ChevronLeft />
              </button>

              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow"
              >
                <ChevronRight />
              </button>
            </div>

            {/* THUMBNAILS */}
            <div className="flex gap-3 mt-4 overflow-x-auto">
              {images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  onClick={() => setActiveIndex(i)}
                  className={`w-28 h-20 object-cover rounded-xl cursor-pointer border-2 ${i === activeIndex
                      ? "border-red-500"
                      : "border-transparent"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* DETAILS */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold">
                {car.brand} {car.variant}
              </h1>
              <p className="text-gray-500 mt-1">
                {car.year || "N/A"} • {car.kmDriven || "N/A"} km •{" "}
                {car.fuelType || "N/A"}
              </p>
            </div>

            {/* PRICE */}
            <div className="bg-white border rounded-2xl p-6 shadow">
              <p className="text-sm text-gray-500">Price</p>
              <p
                className={`text-4xl font-bold ${isSold ? "text-red-600" : "text-red-600"
                  }`}
              >
                {isSold ? "SOLD" : `₹${price?.toLocaleString() || "N/A"}`}
              </p>
            </div>

            {/* SPECS */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Spec label="Year" value={car.year} icon={<Calendar />} />
              <Spec label="KM Driven" value={car.kmDriven} icon={<Gauge />} />
              <Spec label="Fuel" value={car.fuelType} icon={<Fuel />} />
              <Spec
                label="Transmission"
                value={car.transmission || "N/A"}
                icon={<Settings />}
              />
              <Spec
                label="Status"
                value={isSold ? "SOLD" : "Available"}
                icon={<CheckCircle />}
              />
            </div>

            {/* ACTIONS */}
            {/* ACTIONS */}
{/* ACTIONS */}
<div className="flex flex-wrap gap-4">

  {/* CALL (RANDOM) */}
  <Button disabled={isSold} onClick={handleCall}>
    <Phone className="mr-2" /> Call
  </Button>

  {/* WHATSAPP (FIXED / CAN ALSO BE RANDOM IF YOU WANT) */}
  <a
    href="https://wa.me/919098484153"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Button variant="whatsapp" disabled={isSold}>
      <MessageCircle className="mr-2" /> WhatsApp
    </Button>
  </a>

  {/* SHARE */}
  <Button variant="outline" onClick={shareCar}>
    Share
  </Button>

</div>


          </div>
        </div>
      </section>

      {/* ================= SIMILAR ================= */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Similar Cars</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {similarCars.map((c) => (
              <Link
                key={c._id}
                to={`/car/${c._id}`}
                className="rounded-2xl overflow-hidden border bg-white hover:shadow-xl transition"
              >
                <img
                  src={c.images?.[0] || PLACEHOLDER}
                  className="w-full h-56 object-cover"
                />

                <div className="p-5 space-y-2">
                  <h3 className="font-semibold text-lg">
                    {c.brand} {c.variant}
                  </h3>

                  <p className="font-bold text-red-500">
                    ₹{(c.adminSellingPrice || c.sellerPrice)?.toLocaleString()}
                  </p>

                  <p className="text-sm text-gray-500">
                    {c.year} • {c.kmDriven} km • {c.fuelType}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

/* ================= SPEC COMPONENT ================= */

const Spec = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) => (
  <div className="flex gap-3 items-center border bg-white rounded-xl p-4 shadow-sm">
    <div className="text-red-600">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold">{value ?? "N/A"}</p>
    </div>
  </div>
);

export default CarDetails;
