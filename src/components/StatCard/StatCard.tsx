import "./StatCard.css";
import { TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number;
  subtitle: string;
  icon: LucideIcon;
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="stat-card">

      <div className="stat-header">

        <div className="stat-icon">
          <Icon size={24} />
        </div>

        <div className="stat-growth">
          <TrendingUp size={15} />
          <span>+12%</span>
        </div>

      </div>

      <div className="stat-content">

        <h2>{value}</h2>

        <h4>{title}</h4>

        <p>{subtitle}</p>

      </div>

    </div>
  );
}