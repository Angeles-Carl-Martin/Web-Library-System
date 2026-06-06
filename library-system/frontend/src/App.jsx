import { Navigate, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Home from "./pages/public/Home.jsx";
import Catalog from "./pages/public/Catalog.jsx";
import BookDetails from "./pages/public/BookDetails.jsx";
import Login from "./pages/public/Login.jsx";
import Register from "./pages/public/Register.jsx";
import MemberDashboard from "./pages/member/MemberDashboard.jsx";
import BorrowedBooks from "./pages/member/BorrowedBooks.jsx";
import MemberReservations from "./pages/member/MemberReservations.jsx";
import MemberFines from "./pages/member/MemberFines.jsx";
import MemberHistory from "./pages/member/MemberHistory.jsx";
import MemberProfile from "./pages/member/MemberProfile.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import ManageBooks from "./pages/admin/ManageBooks.jsx";
import ManageUsers from "./pages/admin/ManageUsers.jsx";
import ManageBorrowRecords from "./pages/admin/ManageBorrowRecords.jsx";
import ManageReservations from "./pages/admin/ManageReservations.jsx";
import ManageFines from "./pages/admin/ManageFines.jsx";
import Reports from "./pages/admin/Reports.jsx";
import ActivityLogs from "./pages/admin/ActivityLogs.jsx";
import SuperAdminDashboard from "./pages/superAdmin/SuperAdminDashboard.jsx";
import ManageStaff from "./pages/superAdmin/ManageStaff.jsx";
import SystemSettings from "./pages/superAdmin/SystemSettings.jsx";
import AccessDenied from "./pages/public/AccessDenied.jsx";

function App() {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/access-denied" element={<AccessDenied />} />

          <Route element={<ProtectedRoute allowedRoles={["member"]} />}>
            <Route path="/member/dashboard" element={<MemberDashboard />} />
            <Route path="/member/borrowed-books" element={<BorrowedBooks />} />
            <Route path="/member/reservations" element={<MemberReservations />} />
            <Route path="/member/fines" element={<MemberFines />} />
            <Route path="/member/history" element={<MemberHistory />} />
            <Route path="/member/profile" element={<MemberProfile />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["admin", "super_admin"]} />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/books" element={<ManageBooks />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/borrow-records" element={<ManageBorrowRecords />} />
            <Route path="/admin/reservations" element={<ManageReservations />} />
            <Route path="/admin/fines" element={<ManageFines />} />
            <Route path="/admin/reports" element={<Reports />} />
            <Route path="/admin/activity-logs" element={<ActivityLogs />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["super_admin"]} />}>
            <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
            <Route path="/super-admin/staff" element={<ManageStaff />} />
            <Route path="/super-admin/settings" element={<SystemSettings />} />
            <Route path="/super-admin/reports" element={<Reports />} />
            <Route path="/super-admin/activity-logs" element={<ActivityLogs />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
