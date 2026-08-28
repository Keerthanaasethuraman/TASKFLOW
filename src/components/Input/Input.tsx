import "./Input.css";
import type { InputHTMLAttributes, ReactNode } from "react";
type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  icon?: ReactNode;
};
function Input({
  label,
  icon,
  ...props
}: InputProps) {
  return (
    <div className="form-group">
     {label && (
  <label className="input-label">
    {icon}
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
