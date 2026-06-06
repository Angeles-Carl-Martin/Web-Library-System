import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar.jsx";
import api from "../../services/api.js";

const links = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/books", label: "Books" },
  { to: "/admin/users", label: "Members" },
  { to: "/admin/borrow-records", label: "Borrow/Return" },
  { to: "/admin/reservations", label: "Reservations" },
  { to: "/admin/fines", label: "Fines" },
  { to: "/admin/reports", label: "Reports" },
  { to: "/admin/activity-logs", label: "Activity Logs" }
];

function AdminDashboard() {
  const [summary, setSummary] = useState({
    total_books: 0,
    total_members: 0,
    borrowed_books: 0,
    overdue_books: 0
  });

  useEffect(() => {
    api.get("/reports/summary")
      .then((response) => setSummary(response.data))
      .catch(() => {});
  }, []);

  return (
    <div className="dashboard">
      <Sidebar links={links} />
      <section>
        <h1>Admin Dashboard</h1>
        <div className="summary-grid">
          <article className="summary-card"><span>Total Books</span><strong>{summary.total_books}</strong></article>
          <article className="summary-card"><span>Members</span><strong>{summary.total_members}</strong></article>
          <article className="summary-card"><span>Borrowed</span><strong>{summary.borrowed_books}</strong></article>
          <article className="summary-card"><span>Overdue</span><strong>{summary.overdue_books}</strong></article>
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;
