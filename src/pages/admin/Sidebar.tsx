import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Clock,
  CheckCircle,
  XCircle,
  Car,
  History,
  PlusCircle,
  LogOut,
  ChevronDown,
  ChevronUp,
  FileText,
  Wallet,
  X,
  BarChart3,
  Users,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openRequests, setOpenRequests] = useState(false);

  // Auto open dropdown if inside requests pages
  useEffect(() => {
    if (
      location.pathname.includes("/admin/pending") ||
      location.pathname.includes("/admin/approved") ||
      location.pathname.includes("/admin/rejected")
    ) {
      setOpenRequests(true);
    }
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200 ${isActive
      ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
      : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }`;

  return (
    <>
      {/* OVERLAY (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 shadow-lg
          flex flex-col z-40
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* HEADER */}
        <div className="px-6 py-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                CarHub
              </h1>
              <p className="text-xs text-gray-500 mt-1">Admin Dashboard</p>
            </div>

            {/* Close button (mobile) */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setOpen(false)}
            >
              <X size={20} className="text-gray-600" />
            </button>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {/* Main Links */}
          <div className="space-y-1 mb-6">
            <NavLink
              to="/admin/dashboard"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard size={18} />
              <span className="font-medium">Dashboard</span>
            </NavLink>
          </div>

          {/* Section Label */}
          <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Management
          </div>

          {/* REQUESTS DROPDOWN */}
          <button
            onClick={() => setOpenRequests(!openRequests)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition duration-200 ${openRequests
                ? "bg-blue-50 text-blue-700 border-l-2 border-blue-600"
                : "text-gray-700 hover:bg-gray-100"
              }`}
          >
            <div className="flex items-center gap-3">
              <Clock size={18} />
              <span className="font-medium">Requests</span>
            </div>
            {openRequests ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {openRequests && (
            <div className="ml-4 mt-2 space-y-1 border-l border-gray-200 pl-3">
              <NavLink
                to="/admin/pending"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <Clock size={16} />
                <span className="text-sm">Pending</span>
              </NavLink>

              <NavLink
                to="/admin/approved"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <CheckCircle size={16} />
                <span className="text-sm">Approved</span>
              </NavLink>

              <NavLink
                to="/admin/rejected"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                <XCircle size={16} />
                <span className="text-sm">Rejected</span>
              </NavLink>
            </div>
          )}

          <NavLink
            to="/admin/live-cars"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <Car size={18} />
            <span className="font-medium">Platform Cars</span>
          </NavLink>

          <NavLink
            to="/admin/sales"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <Wallet size={18} />
            <span className="font-medium">Sales</span>
          </NavLink>

          <NavLink
            to="/admin/documents"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <FileText size={18} />
            <span className="font-medium">Documents</span>
          </NavLink>

          <NavLink
            to="/admin/expenses"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <BarChart3 size={18} />
            <span className="font-medium">Expenses</span>
          </NavLink>

          {/* Section Label */}
          <div className="px-4 py-2 mt-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Settings
          </div>

          <NavLink
            to="/admin/add-offline"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <PlusCircle size={18} />
            <span className="font-medium">Add Offline Car</span>
          </NavLink>

          <NavLink
            to="/admin/history"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <History size={18} />
            <span className="font-medium">History</span>
          </NavLink>

          <NavLink
            to="/admin/dealer"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <Users size={18} />
            <span className="font-medium">Dealer</span>
          </NavLink>

          <NavLink
            to="/admin/individual"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            <User size={18} />
            <span className="font-medium">Individual</span>
          </NavLink>
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition duration-200 font-medium"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
