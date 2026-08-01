import "./Badge.css";
import type { ReactNode } from "react";

type BadgeVariant =
  | "high"
  | "medium"
  | "low"
  | "completed"
  | "pending"
  | "default";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
};

function Badge({
  children,
  variant = "default",
}: BadgeProps) {
  return (
    <span className={`badge ${variant}`}>
      {children}
    </span>
  );
}

export default Badge;