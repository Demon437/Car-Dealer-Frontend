import React, { useEffect, useState } from "react";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseList from "../components/ExpenseList";
import ExpenseChart from "../components/ExpenseChart";
import { Expense } from "../types";
import api from "@/api/api";

const Expenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [activePerson, setActivePerson] =
    useState<"RAHUL MUKATI" | "NILESH PRAJAPATI">("RAHUL MUKATI");
  const [loading, setLoading] = useState(true);

  // 🔥 DEFAULT = TODAY
  const today = new Date().toISOString().split("T")[0];
  const [fromDate, setFromDate] = useState<string>(today);
  const [toDate, setToDate] = useState<string>(today);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await api.get("/expenses");
      setExpenses(res.data || []);
    } catch (err) {
      console.error("❌ Failed to fetch expenses", err);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Expense) => {
    try {
      const payload = {
        person: expense.person,
        title: expense.title,
        amount: Number(expense.amount),
        category: expense.category,
      };

      const res = await api.post("/expenses", payload);
      setExpenses((prev) => [res.data.expense, ...prev]);
    } catch {
      alert("Expense not saved");
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await api.delete(`/expenses/${id}`);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("❌ Failed to delete expense", err);
    }
  };

  /* ================= FILTER ================= */
  const filtered = expenses.filter((e) => {
    if (e.person !== activePerson) return false;

    const expenseDate = new Date(e.createdAt || "").setHours(0, 0, 0, 0);

    if (fromDate) {
      const from = new Date(fromDate).setHours(0, 0, 0, 0);
      if (expenseDate < from) return false;
    }

    if (toDate) {
      const to = new Date(toDate).setHours(0, 0, 0, 0);
      if (expenseDate > to) return false;
    }

    return true;
  });

  /* ================= CALCULATIONS ================= */
  const totalIncome = filtered
    .filter((e) => e.amount > 0)
    .reduce((sum, e) => sum + e.amount, 0);

  const totalExpense = Math.abs(
    filtered
      .filter((e) => e.amount < 0)
      .reduce((sum, e) => sum + e.amount, 0)
  );

  const netBalance = totalIncome - totalExpense;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-gray-500">
        Loading expenses…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-6 sm:py-8">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col gap-4 sm:gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Expense Dashboard
          </h1>
          <p className="text-sm text-gray-500">
            Track income & expenses professionally
          </p>
        </div>

        {/* PERSON SWITCH */}
        <div className="flex bg-white rounded-full p-1 shadow-sm border w-full sm:w-auto overflow-x-auto">
          {["RAHUL MUKATI", "NILESH PRAJAPATI"].map((person) => (
            <button
              key={person}
              onClick={() =>
                setActivePerson(person as "RAHUL MUKATI" | "NILESH PRAJAPATI")
              }
              className={`
                px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition
                whitespace-nowrap
                ${
                  activePerson === person
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-600 hover:bg-gray-100"
                }
              `}
            >
              {person}
            </button>
          ))}
        </div>
      </div>

      

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 sm:gap-8">

        {/* LEFT */}
        <div className="xl:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border">
            <h3 className="text-lg sm:text-xl font-semibold mb-1">
              Today Overview
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              Expense distribution
            </p>
            <ExpenseChart expenses={filtered} />
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border">
            <h3 className="text-lg sm:text-xl font-semibold mb-4">
              Add Entry
            </h3>
            <ExpenseForm onAdd={addExpense} />
          </div>
        </div>

        {/* RIGHT */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border">

            {/* HEADER + FILTER */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg sm:text-xl font-semibold">
                  {activePerson} Records
                </h3>
                <span className="text-sm text-gray-500">
                  Total: {filtered.length}
                </span>
              </div>

              {/* DATE FILTER */}
              <div className="flex flex-wrap gap-3">
                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">From</label>
                  <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex flex-col">
                  <label className="text-xs text-gray-500 mb-1">To</label>
                  <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    className="rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {(fromDate || toDate) && (
                  <button
                    onClick={() => {
                      setFromDate("");
                      setToDate("");
                    }}
                    className="text-sm text-blue-600 hover:underline self-end"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <ExpenseList expenses={filtered} onDelete={deleteExpense} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
