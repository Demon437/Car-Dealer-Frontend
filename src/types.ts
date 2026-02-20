export type Expense = {
  _id?: string; // ✅ MongoDB ID
  person: "Owner One" | "Owner Two";
  title: string;
  amount: number;
  category?: string; // ✅ FIX for TS2339
  createdAt?: string; // ✅ DB date
};
