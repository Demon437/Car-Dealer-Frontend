import React, { useEffect, useState } from "react";
import api from "../../api/api";

// Icons from lucide-react for better consistency
import {
    Clock,
    CheckCircle,
    XCircle,
    Car,
    BadgeDollarSign,
    TrendingUp,
} from "lucide-react";

interface DashboardStats {
    pendingRequests: number;
    approvedRequests: number;
    rejectedRequests: number;
    liveCars: number;
    soldCars: number;
    totalRevenue: number;
}

const Dashboard: React.FC = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get("/admin/dashboard-stats");
                setStats(res.data);
            } catch (error) {
                console.error("Failed to load dashboard stats", error);
                setError("Failed to load dashboard stats. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 text-center">
                <div className="bg-red-50 border border-red-200 rounded-xl p-6 inline-block">
                    <p className="text-red-600 text-lg font-medium">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    if (!stats) {
        return (
            <div className="p-8 text-center">
                <p className="text-gray-500 text-lg">No stats available</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen space-y-8">
            {/* HEADER */}
            <div>
                <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-500 mt-2">Welcome back! Here's your business overview.</p>
            </div>

            {/* STATS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Pending Requests"
                    value={stats.pendingRequests}
                    icon={<Clock size={24} />}
                    bgColor="from-amber-50 to-orange-50"
                    iconBg="bg-amber-100"
                    iconColor="text-amber-600"
                    trend={null}
                />
                <StatCard
                    title="Approved Requests"
                    value={stats.approvedRequests}
                    icon={<CheckCircle size={24} />}
                    bgColor="from-green-50 to-emerald-50"
                    iconBg="bg-green-100"
                    iconColor="text-green-600"
                    trend={null}
                />
                <StatCard
                    title="Rejected Requests"
                    value={stats.rejectedRequests}
                    icon={<XCircle size={24} />}
                    bgColor="from-red-50 to-pink-50"
                    iconBg="bg-red-100"
                    iconColor="text-red-600"
                    trend={null}
                />
                <StatCard
                    title="Platform Cars"
                    value={stats.liveCars}
                    icon={<Car size={24} />}
                    bgColor="from-blue-50 to-cyan-50"
                    iconBg="bg-blue-100"
                    iconColor="text-blue-600"
                    trend={`+${stats.liveCars > 0 ? stats.liveCars : 0} this month`}
                />
                <StatCard
                    title="Sold Cars"
                    value={stats.soldCars}
                    icon={<TrendingUp size={24} />}
                    bgColor="from-purple-50 to-violet-50"
                    iconBg="bg-purple-100"
                    iconColor="text-purple-600"
                    trend={null}
                />
                <StatCard
                    title="Total Revenue"
                    value={
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-indigo-700">
                                ₹{(stats.totalRevenue / 100000).toFixed(1)}
                            </span>
                            <span className="text-sm text-gray-500">lakhs</span>
                        </div>
                    }
                    icon={<BadgeDollarSign size={24} />}
                    bgColor="from-indigo-50 to-blue-50"
                    iconBg="bg-indigo-100"
                    iconColor="text-indigo-600"
                    trend={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
                />
            </div>

            {/* SUMMARY SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SummaryCard
                    title="Request Status"
                    content={
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Total Requests</span>
                                <span className="text-2xl font-bold text-gray-900">
                                    {stats.pendingRequests + stats.approvedRequests + stats.rejectedRequests}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-3 pt-4 border-t">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-amber-600">{stats.pendingRequests}</p>
                                    <p className="text-xs text-gray-500 mt-1">Pending</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-600">{stats.approvedRequests}</p>
                                    <p className="text-xs text-gray-500 mt-1">Approved</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-red-600">{stats.rejectedRequests}</p>
                                    <p className="text-xs text-gray-500 mt-1">Rejected</p>
                                </div>
                            </div>
                        </div>
                    }
                />
                <SummaryCard
                    title="Sales Overview"
                    content={
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Total Sold</span>
                                <span className="text-2xl font-bold text-gray-900">
                                    {stats.soldCars}
                                </span>
                            </div>
                            <div className="grid grid-cols-2 gap-3 pt-4 border-t">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                                    <p className="text-xs text-gray-600">Live Cars</p>
                                    <p className="text-2xl font-bold text-blue-600 mt-1">{stats.liveCars}</p>
                                </div>
                                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                                    <p className="text-xs text-gray-600">Revenue</p>
                                    <p className="text-lg font-bold text-green-600 mt-1">
                                        ₹{((stats.totalRevenue / 100000)).toFixed(1)}L
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                />
            </div>
        </div>
    );
};

interface StatCardProps {
    title: string;
    value: React.ReactNode;
    icon: React.ReactNode;
    bgColor: string;
    iconBg: string;
    iconColor: string;
    trend?: string | null;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, bgColor, iconBg, iconColor, trend }) => (
    <div className={`bg-gradient-to-br ${bgColor} border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300`}>
        <div className="flex items-start justify-between mb-4">
            <div className={`${iconBg} p-3 rounded-xl`}>
                <div className={iconColor}>
                    {icon}
                </div>
            </div>
        </div>

        <p className="text-gray-600 text-sm font-medium uppercase tracking-wide">{title}</p>
        <div className="mt-3">
            {typeof value === "number" ? (
                <p className="text-4xl font-bold text-gray-900">{value}</p>
            ) : (
                value
            )}
        </div>

        {trend && (
            <p className="text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
                {trend}
            </p>
        )}
    </div>
);

interface SummaryCardProps {
    title: string;
    content: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ title, content }) => (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>
        {content}
    </div>
);

export default Dashboard;