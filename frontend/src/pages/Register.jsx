import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await API.post("/auth/register", form);
      alert("Registered successfully");
      navigate("/");
    } catch (err) {
      alert("Error registering");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

        .reg-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #0a0a0a;
          font-family: 'Inter', sans-serif;
          position: relative;
          overflow: hidden;
        }

        .reg-root::before {
          content: '';
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(139,92,246,0.16) 0%, transparent 70%);
          top: -120px;
          right: -80px;
          pointer-events: none;
        }
        .reg-root::after {
          content: '';
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
          bottom: -100px;
          left: -80px;
          pointer-events: none;
        }

        .reg-card {
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

        .reg-logo {
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
        .reg-logo svg {
          width: 18px;
          height: 18px;
          fill: white;
        }

        .reg-title {
          font-size: 24px;
          font-weight: 700;
          color: #fafaf9;
          letter-spacing: -0.5px;
          margin: 0 0 6px 0;
        }
        .reg-subtitle {
          font-size: 14px;
          color: #71717a;
          margin: 0 0 32px 0;
          font-weight: 400;
        }

        .reg-field {
          margin-bottom: 18px;
        }
        .reg-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #a1a1aa;
          letter-spacing: 0.01em;
          margin-bottom: 8px;
        }
        .reg-input {
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
        .reg-input::placeholder {
          color: #3f3f46;
        }
        .reg-input:focus {
          border-color: rgba(99,102,241,0.6);
          background: rgba(99,102,241,0.05);
          box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
        }

        .reg-terms {
          font-size: 12px;
          color: #52525b;
          margin: 4px 0 20px 0;
          line-height: 1.5;
        }
        .reg-terms span {
          color: #818cf8;
          cursor: pointer;
        }
        .reg-terms span:hover {
          color: #a5b4fc;
        }

        .reg-btn {
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
        .reg-btn:hover {
          opacity: 0.92;
          box-shadow: 0 6px 28px rgba(99,102,241,0.5);
        }
        .reg-btn:active {
          transform: scale(0.99);
          opacity: 1;
        }
        .reg-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          transform: skewX(-20deg);
          transition: left 0.4s ease;
        }
        .reg-btn:hover::after {
          left: 160%;
        }

        .reg-divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 24px 0;
        }

        .reg-footer {
          text-align: center;
          font-size: 13px;
          color: #52525b;
        }
        .reg-footer-link {
          color: #818cf8;
          font-weight: 600;
          cursor: pointer;
          transition: color 0.15s;
        }
        .reg-footer-link:hover {
          color: #a5b4fc;
        }
      `}</style>

      <div className="reg-root">
        <div className="reg-card">

          {/* Logo mark */}
          <div className="reg-logo">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 3L4 14h8l-1 7 9-11h-8l1-7z" />
            </svg>
          </div>

          {/* Header */}
          <h1 className="reg-title">Create an account</h1>
          <p className="reg-subtitle">Get started — it only takes a moment</p>

          {/* Name */}
          <div className="reg-field">
            <label className="reg-label">Full Name</label>
            <input
              name="name"
              type="text"
              placeholder="John Doe"
              onChange={handleChange}
              className="reg-input"
            />
          </div>

          {/* Email */}
          <div className="reg-field">
            <label className="reg-label">Email</label>
            <input
              name="email"
              type="email"
              placeholder="name@company.com"
              onChange={handleChange}
              className="reg-input"
            />
          </div>

          {/* Password */}
          <div className="reg-field">
            <label className="reg-label">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="reg-input"
            />
          </div>

          <p className="reg-terms">
            By creating an account you agree to our{" "}
            <span>Terms of Service</span> and <span>Privacy Policy</span>.
          </p>

          {/* CTA */}
          <button onClick={handleSubmit} className="reg-btn">
            Create account
          </button>

          <div className="reg-divider" />

          {/* Footer */}
          <p className="reg-footer">
            Already have an account?{" "}
            <span onClick={() => navigate("/")} className="reg-footer-link">
              Sign in
            </span>
          </p>
        </div>
      </div>
    </>
  );
}