import type { Activity } from "./kanbanTypes";

type Props = {
  activities: Activity[];
};

export default function ActivityTimeline({
  activities,
}: Props) {
return (
<div className="activity-timeline">
<h3>Activity</h3>
{!activities?.length ? (
<p>No activity yet.</p>
) : (
activities
.slice()
.reverse()
.map((activity, index) => (
 <div
 className="activity-item"
 key={`${activity.createdAt}-${index}`}
>
 <div className="activity-dot" />
<div>
<strong>
 {activity.user?.name || "User"}
</strong>
<p>{activity.action}</p>
<span>
 {new Date(
activity.createdAt
 ).toLocaleString()}
</span>
</div>
</div>
))
)}
</div>
);
}