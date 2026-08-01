import "./Input.css";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

function Input({
  label,
  ...props
}: InputProps) {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}

      <input
        className="input-field"
        {...props}
      />
    </div>
  );
}

export default Input;