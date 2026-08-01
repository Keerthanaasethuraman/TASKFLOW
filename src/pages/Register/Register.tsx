import "./Register.css";

import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

export default function Register() {

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  return (

    <div className="register-page">

      <div className="register-card">

        <div className="brand">

          <h1>TaskFlow</h1>

          <p>Focus • Plan • Achieve</p>

        </div>

        <div className="welcome">

          <h2>Create Account ✨</h2>

          <p>
            Join TaskFlow and organize your work beautifully.
          </p>

        </div>

        <div className="input-box">

          <User size={18} />

          <input
            type="text"
            placeholder="Full Name"
          />

        </div>

        <div className="input-box">

          <Mail size={18} />

          <input
            type="email"
            placeholder="Email Address"
          />

        </div>

        <div className="input-box">

          <Lock size={18} />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />

          <button
            type="button"
            className="eye-btn"
            onClick={() =>
              setShowPassword(!showPassword)
            }
          >

            {showPassword
              ? <EyeOff size={18}/>
              : <Eye size={18}/>}

          </button>

        </div>

        <div className="input-box">

          <Lock size={18} />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
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
              ? <EyeOff size={18}/>
              : <Eye size={18}/>}

          </button>

        </div>

        <Button>

          Create Account

        </Button>

        <div className="divider">

          <span>OR</span>

        </div>

        <button className="google-btn">

          Continue with Google

        </button>

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