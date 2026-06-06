import Sidebar from "../../components/Sidebar.jsx";

const links = [
  { to: "/member/dashboard", label: "Dashboard" },
  { to: "/member/borrowed-books", label: "Borrowed Books" },
  { to: "/member/reservations", label: "Reservations" },
  { to: "/member/fines", label: "Fines" },
  { to: "/member/history", label: "History" },
  { to: "/member/profile", label: "Profile" }
];

function MemberDashboard() {
  return (
    <div className="dashboard">
      <Sidebar links={links} />
      <section>
        <h1>Member Dashboard</h1>
        <div className="summary-grid">
          <article className="summary-card"><span>Borrowed</span><strong>0</strong></article>
          <article className="summary-card"><span>Reservations</span><strong>0</strong></article>
          <article className="summary-card"><span>Unpaid Fines</span><strong>0</strong></article>
        </div>
      </section>
    </div>
  );
}

export default MemberDashboard;
