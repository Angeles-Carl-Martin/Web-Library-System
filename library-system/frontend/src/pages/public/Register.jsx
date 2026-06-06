import { useState } from "react";
import api from "../../services/api.js";

function Register() {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    member_id: "",
    member_type: "student",
    department: "",
    contact_number: ""
  });
  const [message, setMessage] = useState("");

  function updateField(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { data } = await api.post("/auth/register", form);
    setMessage(data.message);
  }

  return (
    <section className="form-page">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        {message && <p className="success">{message}</p>}
        <label>Full Name<input name="full_name" value={form.full_name} onChange={updateField} required /></label>
        <label>Email<input name="email" type="email" value={form.email} onChange={updateField} required /></label>
        <label>Password<input name="password" type="password" value={form.password} onChange={updateField} required /></label>
        <label>Member ID<input name="member_id" value={form.member_id} onChange={updateField} /></label>
        <label>
          Member Type
          <select name="member_type" value={form.member_type} onChange={updateField}>
            <option value="student">Student</option>
            <option value="faculty">Faculty</option>
            <option value="staff">Staff</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>Department<input name="department" value={form.department} onChange={updateField} /></label>
        <label>Contact Number<input name="contact_number" value={form.contact_number} onChange={updateField} /></label>
        <button type="submit">Create Account</button>
      </form>
    </section>
  );
}

export default Register;
