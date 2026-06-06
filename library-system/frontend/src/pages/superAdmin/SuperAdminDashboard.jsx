import Sidebar from "../../components/Sidebar.jsx";

const links = [
  { to: "/super-admin/dashboard", label: "Dashboard" },
  { to: "/super-admin/staff", label: "Staff" },
  { to: "/super-admin/settings", label: "Settings" },
  { to: "/super-admin/reports", label: "Reports" },
  { to: "/super-admin/activity-logs", label: "Activity Logs" }
];

function SuperAdminDashboard() {
  return (
    <div className="dashboard">
      <Sidebar links={links} />
      <section>
        <h1>Super Admin Dashboard</h1>
        <div className="summary-grid">
          <article className="summary-card"><span>Staff Accounts</span><strong>0</strong></article>
          <article className="summary-card"><span>System Settings</span><strong>4</strong></article>
          <article className="summary-card"><span>Activity Logs</span><strong>0</strong></article>
        </div>
      </section>
    </div>
  );
}

export default SuperAdminDashboard;
