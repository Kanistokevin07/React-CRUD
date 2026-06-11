import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("userId", res.data.user._id);
      alert("Login successful");
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0a0a0a;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        /* Ambient glow blobs */
        .login-root::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%);
          top: -100px;
          left: -100px;
          pointer-events: none;
        }
        .login-root::after {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
          bottom: -80px;
          right: -80px;
          pointer-events: none;
        }

        /* Card */
        .login-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 420px;
          background: rgba(18, 18, 20, 0.85);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          padding: 40px 36px;
          box-shadow:
            0 0 0 1px rgba(99,102,241,0.08),
            0 24px 64px rgba(0,0,0,0.6),
            inset 0 1px 0 rgba(255,255,255,0.06);
        }

        /* Logo mark */
        .login-logo {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 10px;
          margin-bottom: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 16px rgba(99,102,241,0.4);
        }
        .login-logo svg {
          width: 18px;
          height: 18px;
          fill: white;
        }

        /* Header */
        .login-title {
          font-size: 24px;
          font-weight: 700;
          color: #fafaf9;
          letter-spacing: -0.5px;
          margin: 0 0 6px 0;
        }
        .login-subtitle {
          font-size: 14px;
          color: #71717a;
          margin: 0 0 32px 0;
          font-weight: 400;
        }

        /* Field */
        .login-field {
          margin-bottom: 18px;
        }
        .login-label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        .login-label {
          font-size: 13px;
          font-weight: 500;
          color: #a1a1aa;
          letter-spacing: 0.01em;
        }
        .login-forgot {
          font-size: 12px;
          font-weight: 500;
          color: #52525b;
          cursor: pointer;
          transition: color 0.15s;
          text-decoration: none;
        }
        .login-forgot:hover {
          color: #a1a1aa;
        }

        .login-input-wrap {
          position: relative;
        }
        .login-input {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 14px;
          font-family: 'Inter', sans-serif;
          color: #fafaf9;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .login-input::placeholder {
          color: #3f3f46;
        }
        .login-input:focus {
          border-color: rgba(99,102,241,0.6);
          background: rgba(99,102,241,0.05);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        /* Divider */
        .login-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 24px 0;
        }

        /* Button */
        .login-btn {
          width: 100%;
          padding: 13px;
          border: none;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: #fff;
          letter-spacing: 0.01em;
          transition: opacity 0.15s, transform 0.1s, box-shadow 0.2s;
          box-shadow: 0 4px 20px rgba(99,102,241,0.35);
        }
        .login-btn:hover {
          opacity: 0.92;
          box-shadow: 0 6px 28px rgba(99,102,241,0.5);
        }
        .login-btn:active {
          transform: scale(0.99);
          opacity: 1;
        }

        /* Shimmer sweep on button */
        .login-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: skewX(-20deg);
          transition: left 0.4s ease;
        }
        .login-btn:hover::after {
          left: 160%;
        }

        /* Footer */
        .login-footer {
          text-align: center;
          font-size: 13px;
          color: #52525b;
        }
        .login-footer-link {
          color: #818cf8;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.15s;
        }
        .login-footer-link:hover {
          color: #a5b4fc;
        }
      `}</style>

      <div className="login-root">
        <div className="login-card">

          {/* Logo mark */}
          <div className="login-logo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 3L4 14h8l-1 7 9-11h-8l1-7z"/>
            </svg>
          </div>

          {/* Header */}
          <h1 className="login-title">Welcome back</h1>
          <p className="login-subtitle">Sign in to continue to your account</p>

          {/* Email */}
          <div className="login-field">
            <div className="login-label-row">
              <span className="login-label">Email</span>
            </div>
            <div className="login-input-wrap">
              <input
                name="email"
                type="email"
                placeholder="name@company.com"
                onChange={handleChange}
                className="login-input"
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-field">
            <div className="login-label-row">
              <span className="login-label">Password</span>
              <span className="login-forgot">Forgot password?</span>
            </div>
            <div className="login-input-wrap">
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                onChange={handleChange}
                className="login-input"
              />
            </div>
          </div>

          {/* CTA */}
          <button onClick={handleLogin} className="login-btn" style={{ marginTop: "8px" }}>
            Sign in
          </button>

          <div className="login-divider" />

          {/* Footer */}
          <p className="login-footer">
            No account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="login-footer-link"
            >
              Create one free
            </span>
          </p>
        </div>
      </div>
    </>
  );
}