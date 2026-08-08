import "./Register.css";

import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import { register } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const data = await register({
        name,
        email,
        password,
      });

      alert(data.message);

      navigate("/login");

    } catch (error: any) {

      alert(
        error?.response?.data?.message ||
        "Registration Failed"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="register-page">
      <div className="register-card">

        {/* Brand */}

        <div className="brand">
          <h1>TaskFlow</h1>
          <p>Focus • Plan • Achieve</p>
        </div>

        {/* Welcome */}

        <div className="welcome">
          <h2>Create Account ✨</h2>
          <p>
            Join TaskFlow and organize your work beautifully.
          </p>
        </div>

        {/* Name */}

        <div className="input-box">
          <User size={18} />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        {/* Email */}

        <div className="input-box">
          <Mail size={18} />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        {/* Password */}

        <div className="input-box">
          <Lock size={18} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >
            {showPassword
              ? <EyeOff size={18} />
              : <Eye size={18} />}
          </button>
        </div>

        {/* Confirm Password */}

        <div className="input-box">
          <Lock size={18} />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
          >
            {showConfirmPassword
              ? <EyeOff size={18} />
              : <Eye size={18} />}
          </button>
        </div>

        {/* Register Button */}

        <Button
          onClick={handleRegister}
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Account"}
        </Button>

        {/* Divider */}

        <div className="divider">
          <span>OR</span>
        </div>

        {/* Google */}

        <button className="google-btn">
          Continue with Google
        </button>

        {/* Login */}

        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}