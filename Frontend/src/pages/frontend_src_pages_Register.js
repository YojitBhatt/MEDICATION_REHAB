import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../api";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [err, setErr] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await api.register(form);
      login(res.data.token);
      navigate("/");
    } catch (e) {
      setErr(e.response?.data?.msg || "Register failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input placeholder="Email" type="email" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
        <input placeholder="Password" type="password" required value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
        <button type="submit">Register</button>
      </form>
      {err && <p style={{ color: "red" }}>{err}</p>}
      <p>Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
}