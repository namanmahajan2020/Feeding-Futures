import React, { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (res.ok) {
      alert("Signup successful!");
    } else {
      const data = await res.json();
      setError(data.message || "An error occurred. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: 400,
        margin: "40px auto",
        padding: 24,
        background: "#191919",
        border: "2px solid #06C167",
        borderRadius: 12,
        boxShadow: "0 2px 20px #0008",
      }}
      aria-label="Signup form"
    >
      <h2 style={{ textAlign: "center", marginBottom: 25 }}>Create your account</h2>

      <label htmlFor="name">User name</label>
      <input
        id="name"
        name="name"
        placeholder="Enter your user name"
        value={formData.name}
        autoComplete="username"
        onChange={handleChange}
        required
        style={{
          width: "100%", padding: 12, marginBottom: 14, fontSize: 16,
          background: "#232323", color: "#fafafa", border: "1.5px solid #444", borderRadius: 6,
        }}
      />

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="Enter your email"
        value={formData.email}
        autoComplete="email"
        onChange={handleChange}
        required
        style={{
          width: "100%", padding: 12, marginBottom: 14, fontSize: 16,
          background: "#232323", color: "#fafafa", border: "1.5px solid #444", borderRadius: 6,
        }}
      />

      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="Password (min 6 characters)"
        value={formData.password}
        autoComplete="new-password"
        minLength={6}
        onChange={handleChange}
        required
        style={{
          width: "100%", padding: 12, marginBottom: 14, fontSize: 16,
          background: "#232323", color: "#fafafa", border: "1.5px solid #444", borderRadius: 6,
        }}
      />

      <label htmlFor="gender">Gender</label>
      <select
        id="gender"
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        required
        style={{
          width: "100%", padding: 12, marginBottom: 18, fontSize: 16,
          background: "#232323", color: "#fafafa", border: "1.5px solid #444", borderRadius: 6,
        }}
      >
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="preferNotToSay">Prefer not to say</option>
      </select>

      <button
        type="submit"
        style={{
          backgroundColor: "#06C167",
          color: "#fff",
          fontSize: 20,
          padding: "12px",
          width: "100%",
          border: "none",
          borderRadius: 7,
          cursor: "pointer",
          letterSpacing: 2,
          marginTop: 8,
          fontWeight: 600,
        }}
      >
        Continue
      </button>
      {error && (
        <p
          role="alert"
          style={{
            color: "#ff5252",
            background: "#2d0808",
            borderRadius: 6,
            marginTop: 16,
            padding: "8px 0",
            textAlign: "center",
          }}
        >
          {error}
        </p>
      )}
    </form>
  );
}

export default Signup;
