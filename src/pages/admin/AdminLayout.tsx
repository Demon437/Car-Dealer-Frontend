import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, Bell, User } from "lucide-react";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex">

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Section */}
      <div className="flex-1 flex flex-col">

        {/* Top Navigation Bar */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4">

            {/* Left: Menu Button & Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
              >
                <Menu className="h-5 w-5 text-gray-700" />
              </button>
              <div className="hidden md:block">
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Admin Panel
                </h1>
              </div>
            </div>

            {/* Right: Notifications & Profile */}
            <div className="flex items-center gap-3">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition relative">
                <Bell className="h-5 w-5 text-gray-700" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="p-2 rounded-lg hover:bg-gray-100 transition cursor-pointer">
                <User className="h-5 w-5 text-gray-700" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 md:ml-64 overflow-y-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;
