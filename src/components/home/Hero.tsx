// import { motion } from "framer-motion";
// import { Link } from "react-router-dom";
// import { Car, ArrowRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import heroCar from "@/assets/hero-car.png";

// const stats = [
//   { icon: Car, value: "10,000+", label: "Cars Sold" },
//   { icon: Users, value: "50,000+", label: "Happy Customers" },
//   { icon: Star, value: "4.9/5", label: "Rating" },
//   { icon: TrendingUp, value: "₹500Cr+", label: "Value Traded" },
// ];

// import { Users, Star, TrendingUp } from "lucide-react";

// export const Hero = () => (
//   <section className="relative mt-5 py-8 min-h-[95vh] flex items-center overflow-hidden">
//     <motion.div 
//       initial={{ scale: 1.1 }}
//       animate={{ scale: 1 }}
//       transition={{ duration: 1.5 }}
//       className="absolute inset-0"
//     >
//       <img src={heroCar} alt="Hero" className="w-full h-full object-cover" />
//       <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent" />
//     </motion.div>

//     <div className="container mx-auto px-4 relative z-10 pt-20">
//       <motion.div 
//         initial={{ opacity: 0, x: -50 }}
//         animate={{ opacity: 1, x: 0 }}
//         transition={{ duration: 0.8 }}
//         className="max-w-3xl space-y-8"
//       >
//         <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-md px-4 py-2 rounded-full text-sm text-primary font-medium border border-primary/20">
//           <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
//           India's Premier Luxury Car Hub
//         </div>

//         <h1 className="text-6xl md:text-8xl font-display font-bold text-foreground leading-[1.1] tracking-tight">
//           Elevate Your <br />
//           <span className="text-dark">Driving Legacy</span>
//         </h1>

//         <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
//           Experience a seamless journey in buying and selling verified premium cars with complete transparency.
//         </p>

//         <div className="flex flex-wrap gap-5">
//           <Button variant="hero" size="xl" className="group shadow-glow" asChild>
//             <Link to="/buy">
//               <Car className="w-5 h-5 transition-transform group-hover:-rotate-12" />
//               Explore Collection
//             </Link>
//           </Button>
//           <Button variant="outline" size="xl" className="backdrop-blur-sm" asChild>
//             <Link to="/sell">
//               Sell Your Car
//               <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
//             </Link>
//           </Button>
//         </div>

        
//       </motion.div>
//     </div>
//   </section>
// );




import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Car, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCar from "@/assets/car-image.jpeg";

const stats = [
  { icon: Car, value: "10,000+", label: "Cars Sold" },
  { icon: Users, value: "50,000+", label: "Happy Customers" },
  { icon: Star, value: "4.9/5", label: "Rating" },
  { icon: TrendingUp, value: "₹500Cr+", label: "Value Traded" },
];

import { Users, Star, TrendingUp } from "lucide-react";

export const Hero = () => (
  <section className="relative mt-5 min-h-[95vh] flex items-center bg-white overflow-hidden">
    
    <div className="max-w-7xl mx-auto px-6 xl:px-0 w-full">
      {/* ✅ TWO COLUMN LAYOUT */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-3xl space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full text-sm text-red-600 font-medium border border-red-200">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            India's Premier Luxury Car Hub
          </div>

          <h1 className="text-6xl md:text-7xl font-display font-bold text-gray-900 leading-[1.1] tracking-tight">
            Elevate Your <br />
            <span className="text-red-600">Driving Legacy</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-lg leading-relaxed">
            Experience a seamless journey in buying and selling verified premium cars with complete transparency.
          </p>

          <div className="flex flex-wrap gap-5">
            <Button
              variant="hero"
              size="xl"
              className="group bg-red-600 hover:bg-red-700 text-white shadow-[0_10px_30px_rgba(239,68,68,0.35)]"
              asChild
            >
              <Link to="/buy">
                <Car className="w-5 h-5 transition-transform group-hover:-rotate-12" />
                Explore Collection
              </Link>
            </Button>

            <Button
              variant="outline"
              size="xl"
              className="border-gray-300 text-gray-700 hover:bg-gray-100"
              asChild
            >
              <Link to="/sell">
                Sell Your Car
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* ================= RIGHT IMAGE ================= */}
       <motion.div
  initial={{ opacity: 1, scale: 1.05 }}
  animate={{ opacity: 1, scale: 1.50 }}
  transition={{ duration: 1 }}
  className="relative"
>
  <img
    src={heroCar}
    alt="Car"
    className="w-full object-contain drop-shadow-5xl"
  />
</motion.div>

      </div>
    </div>
  </section>
);
