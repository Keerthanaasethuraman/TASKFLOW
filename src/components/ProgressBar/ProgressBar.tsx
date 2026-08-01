import "./ProgressBar.css";

type ProgressBarProps = {
  label: string;
  value: number;
  total: number;
};

function ProgressBar({
  label,
  value,
  total,
}: ProgressBarProps) {
  const percentage = Math.round((value / total) * 100);

  return (
    <div className="progress-card">
      <div className="progress-header">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>

      <div className="progress-track">
        <div
          className="progress-fill"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p className="progress-text">
        {value} of {total} tasks completed
      </p>
    </div>
  );
}

export default ProgressBar;