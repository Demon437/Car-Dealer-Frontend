// import { Link, useLocation } from "react-router-dom";
// import { Menu, X, Phone, Calculator } from "lucide-react";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();

//   const navLinks = [
//     { href: "/", label: "Home" },
//     { href: "/buy", label: "Buy Car" },
//     { href: "/sell", label: "Sell Car" },
//     { href: "/emi-calculator", label: "EMI Calculator" },
//     { href: "/contact", label: "Contact" },
//   ];

//   const isActive = (path: string) => location.pathname === path;

//   return (
//     <>
//       {/* ================= LOGO GLOW + ACTIVE LINE CSS ================= */}
//       <style>
//         {`
//           @keyframes logoGlow {
//             0% {
//               filter:
//                 drop-shadow(0 0 6px rgba(59,130,246,0.45))
//                 drop-shadow(0 0 18px rgba(59,130,246,0.25));
//             }
//             50% {
//               filter:
//                 drop-shadow(0 0 14px rgba(59,130,246,0.85))
//                 drop-shadow(0 0 32px rgba(59,130,246,0.6));
//             }
//             100% {
//               filter:
//                 drop-shadow(0 0 6px rgba(59,130,246,0.45))
//                 drop-shadow(0 0 18px rgba(59,130,246,0.25));
//             }
//           }

//           .logo-glow {
//             animation: logoGlow 3.2s ease-in-out infinite;
//           }

//           .nav-link {
//             position: relative;
//           }

//           .nav-link::after {
//             content: "";
//             position: absolute;
//             left: 0;
//             bottom: -6px;
//             height: 2px;
//             width: 0%;
//             background: linear-gradient(to right, #f6ea3b, #ece742);
//             transition: width 0.3s ease;
//           }

//           .nav-link.active::after {
//             width: 100%;
//           }
//         `}
//       </style>

//       {/* ================= NAVBAR ================= */}
//       <nav className="
//         fixed top-0 left-0 right-0 z-50
//         bg-gradient-to-b from-black via-black/75 to-black/90
//         backdrop-blur-md
//         border-b border-blue-500/20
//       ">
//         <div className="container mx-auto px-6">
//           <div className="flex items-center justify-between h-20">

//             {/* ================= LOGO ================= */}
//             <Link to="/" className="flex items-center gap-4">
//               <img
//                 src="/logo.png"
//                 alt="Prajapati Mukati Motors Logo"
//                 className="h-12 w-20 object-contain logo-glow transition-transform duration-300 hover:scale-105"
//               />

//               <span className="hidden sm:block text-xl font-bold text-white leading-tight tracking-wide"
// >
//                 Prajapati Mukati
//                 <span className="block text-[rgb(194_171_49)]">
//                   Motors
//                 </span>
//               </span>
//             </Link>

//             {/* ================= DESKTOP NAV ================= */}
//             <div className="hidden md:flex items-center gap-10">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   to={link.href}
//                   className={`nav-link text-sm font-medium tracking-wide transition-colors ${
//                     isActive(link.href)
//                       ? "text-[rgb(194_171_49)] active"
//                       : "text-gray-300 hover:text-white"
//                   }`}
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </div>

//             {/* ================= DESKTOP ACTIONS ================= */}
//             <div className="hidden md:flex items-center gap-5">
//               <Phone className="w-6 h-6 text-white" />
//               <div>

                
//                 <a
//                 href="tel:+919098484153"
//                 className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
//               >
//                 {/* <Phone className="w-4 h-4" /> */}
//                 +91 9098484153 
//               </a>
            
//               <a
//                 href="tel:+917018010668"
//                 className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition"
//               >
//                 {/* <Phone className="w-4 h-4" /> */}
//                 +91 7018010668
//               </a>
//               </div>


//               <Button
//                 variant="hero"
//                 className="
//                   bg-[rgb(194_171_49)] hover:bg-[rgb(233_213_71)] text-white
//                   shadow-[0_8px_25px_rgba(59,130,246,0.45)]
//                 "
//                 asChild
//               >
//                 <Link to="/sell">Sell Your Car</Link>
//               </Button>
//             </div>

//             {/* ================= MOBILE MENU BUTTON ================= */}
//             <div className="md:hidden">
//               <button
//                 className="p-2 text-white"
//                 onClick={() => setIsOpen(!isOpen)}
//               >
//                 {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//               </button>
//             </div>
//           </div>

//           {/* ================= MOBILE NAV ================= */}
//           {isOpen && (
//             <div className="md:hidden bg-black border-t border-blue-500/20 py-5 animate-fade-in">
//               <div className="flex flex-col gap-5">
//                 {navLinks.map((link) => (
//                   <Link
//                     key={link.href}
//                     to={link.href}
//                     className={`text-lg font-medium transition ${
//                       isActive(link.href)
//                         ? "text-blue-500"
//                         : "text-gray-300 hover:text-white"
//                     }`}
//                     onClick={() => setIsOpen(false)}
//                   >
//                     {link.label === "EMI Calculator" && (
//                       <Calculator className="w-5 h-5 inline mr-2" />
//                     )}
//                     {link.label}
//                   </Link>
//                 ))}

//                 <div className="pt-4 border-t border-blue-500/20 space-y-4">
//                   <a
//                     href="tel:+919098484153"
//                     className="flex items-center gap-2 text-gray-300 hover:text-white"
//                   >
//                     <Phone className="w-5 h-5" />
//                     +91 9098484153
//                   </a>

//                   <Button
//                     variant="hero"
//                     className="w-full bg-blue-600 hover:bg-blue-700 text-white"
//                     asChild
//                   >
//                     <Link to="/sell" onClick={() => setIsOpen(false)}>
//                       Sell Your Car
//                     </Link>
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;



import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Calculator } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

/* ================= CSS ================= */
const NavbarStyles = () => (
  <style>
    {`
      @keyframes logoGlow {
        0% {
          filter:
            drop-shadow(0 0 6px rgba(239,68,68,0.35))
            drop-shadow(0 0 18px rgba(239,68,68,0.20));
        }
        50% {
          filter:
            drop-shadow(0 0 14px rgba(239,68,68,0.65))
            drop-shadow(0 0 32px rgba(239,68,68,0.35));
        }
        100% {
          filter:
            drop-shadow(0 0 6px rgba(239,68,68,0.35))
            drop-shadow(0 0 18px rgba(239,68,68,0.20));
        }
      }

      .logo-glow {
        animation: logoGlow 3.2s ease-in-out infinite;
      }

      .nav-link {
        position: relative;
      }

      .nav-link::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -6px;
        height: 2px;
        width: 0%;
        background: linear-gradient(to right, #ef4444, #dc2626);
        transition: width 0.3s ease;
      }

      .nav-link.active::after {
        width: 100%;
      }
    `}
  </style>
);

/* ================= LOGO ================= */
const Logo = () => (
  <Link to="/" className="flex items-center gap-4">
    {/* <img
      src="/logo.png"
      alt="Prajapati Mukati Motors Logo"
      className="h-12 w-20 object-contain logo-glow transition-transform duration-300 hover:scale-105"
    /> */}

    <span className="hidden sm:block text-xl font-bold text-gray-900 leading-tight tracking-wide">
      Saksham Sharma
      <span className="block text-red-600">Motors</span>
    </span>
  </Link>
);

/* ================= DESKTOP NAV ================= */
const DesktopNav = ({ navLinks, isActive }: any) => (
  <div className="hidden md:flex items-center gap-10">
    {navLinks.map((link: any) => (
      <Link
        key={link.href}
        to={link.href}
        className={`nav-link text-sm font-medium tracking-wide transition-colors ${
          isActive(link.href)
            ? "text-red-600 active"
            : "text-gray-600 hover:text-red-600"
        }`}
      >
        {link.label}
      </Link>
    ))}
  </div>
);

/* ================= DESKTOP ACTIONS ================= */
const DesktopActions = () => (
  <div className="hidden md:flex items-center gap-5">
    <Phone className="w-6 h-6 text-red-600" />

    <div>
      <a
        href="tel:+919098484153"
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition"
      >
        +91 9098484153
      </a>

      <a
        href="tel:+917018010668"
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition"
      >
        +91 7018010668
      </a>
    </div>

    <Button
      variant="hero"
      className="bg-red-600 hover:bg-red-700 text-white shadow-[0_8px_25px_rgba(239,68,68,0.35)]"
      asChild
    >
      <Link to="/sell">Sell Your Car</Link>
    </Button>
  </div>
);

/* ================= MOBILE MENU ================= */
const MobileMenu = ({ navLinks, isActive, setIsOpen }: any) => (
  <div className="md:hidden bg-white border-t border-gray-200 py-5">
    <div className="flex flex-col gap-5">
      {navLinks.map((link: any) => (
        <Link
          key={link.href}
          to={link.href}
          className={`text-lg font-medium transition ${
            isActive(link.href)
              ? "text-red-600"
              : "text-gray-700 hover:text-red-600"
          }`}
          onClick={() => setIsOpen(false)}
        >
          {link.label === "EMI Calculator" && (
            <Calculator className="w-5 h-5 inline mr-2" />
          )}
          {link.label}
        </Link>
      ))}

      <div className="pt-4 border-t border-gray-200 space-y-4">
        <a
          href="tel:+919098484153"
          className="flex items-center gap-2 text-gray-700 hover:text-red-600"
        >
          <Phone className="w-5 h-5" />
          +91 9098484153
        </a>

        <Button
          variant="hero"
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          asChild
        >
          <Link to="/sell" onClick={() => setIsOpen(false)}>
            Sell Your Car
          </Link>
        </Button>
      </div>
    </div>
  </div>
);

/* ================= MAIN NAVBAR ================= */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/buy", label: "Buy Car" },
    { href: "/sell", label: "Sell Car" },
    { href: "/emi-calculator", label: "EMI Calculator" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <NavbarStyles />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">

            <Logo />

            <DesktopNav navLinks={navLinks} isActive={isActive} />

            <DesktopActions />

            {/* MOBILE BUTTON */}
            <div className="md:hidden">
              <button
                className="p-2 text-gray-800"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {isOpen && (
            <MobileMenu
              navLinks={navLinks}
              isActive={isActive}
              setIsOpen={setIsOpen}
            />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
