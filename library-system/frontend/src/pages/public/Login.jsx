import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
    account_type: "users"
  });
  const [error, setError] = useState("");

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      const user = await login(form);
      if (user.role === "super_admin") navigate("/super-admin/dashboard");
      else if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/member/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  }

  return (
    <section className="form-page">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <label>
          Account Type
          <select name="account_type" value={form.account_type} onChange={updateField}>
            <option value="users">Member</option>
            <option value="staff">Staff</option>
          </select>
        </label>
        <label>
          Email
          <input name="email" type="email" value={form.email} onChange={updateField} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={form.password} onChange={updateField} required />
        </label>
        <button type="submit">Login</button>
      </form>
    </section>
  );
}

export default Login;
