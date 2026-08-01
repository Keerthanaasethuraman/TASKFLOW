import "./Login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import Button from "../../components/Button/Button";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  function handleLogin() {
    let valid = true;

    setEmailError("");
    setPasswordError("");

    if (email.trim() === "") {
      setEmailError("Email is required.");
      valid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required.");
      valid = false;
    }

    if (!valid) return;

    // Temporary Login
    // Later we will replace this with localStorage / MongoDB

    navigate("/dashboard");
  }

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Brand */}

        <div className="brand">

          <h1>TaskFlow</h1>

          <p>Focus • Plan • Achieve</p>

        </div>

        {/* Welcome */}

        <div className="welcome">

          <h2>Welcome Back 👋</h2>

          <p>
            Sign in to continue managing your tasks.
          </p>

        </div>

        {/* Email */}

        <div>

          <div className="input-box">

            <Mail size={18} />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />

          </div>

          {emailError && (

            <p className="error-text">

              {emailError}

            </p>

          )}

        </div>

        {/* Password */}

        <div>

          <div className="input-box">

            <Lock size={18} />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />

            <button
              type="button"
              className="eye-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >

              {showPassword ? (

                <EyeOff size={18} />

              ) : (

                <Eye size={18} />

              )}

            </button>

          </div>

          {passwordError && (

            <p className="error-text">

              {passwordError}

            </p>

          )}

        </div>

        {/* Options */}

        <div className="login-options">

          <label>

            <input type="checkbox" />

            Remember Me

          </label>

          <a href="#">

            Forgot Password?

          </a>

        </div>

        {/* Login Button */}

        <Button onClick={handleLogin}>

          Sign In

        </Button>

        {/* Divider */}

        <div className="divider">

          <span>OR</span>

        </div>

        {/* Google */}

        <button className="google-btn">

          Continue with Google

        </button>

        {/* Register */}

        <p className="register">

          Don't have an account?{" "}

          <Link to="/register">

            Create Account

          </Link>

        </p>

      </div>

    </div>
  );
}