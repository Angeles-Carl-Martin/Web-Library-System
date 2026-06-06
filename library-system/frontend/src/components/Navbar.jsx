import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <Link className="brand" to="/">Library System</Link>
      <nav>
        <Link to="/catalog">Catalog</Link>
        {user?.role === "member" && <Link to="/member/dashboard">Member</Link>}
        {(user?.role === "admin" || user?.role === "super_admin") && (
          <Link to="/admin/dashboard">Admin</Link>
        )}
        {user?.role === "super_admin" && <Link to="/super-admin/dashboard">Super Admin</Link>}
        {!user ? (
          <Link className="button-link" to="/login">Login</Link>
        ) : (
          <button type="button" onClick={handleLogout}>Logout</button>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
