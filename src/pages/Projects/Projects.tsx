import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import api from "../../services/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setProjects } from "../../redux/projectSlice";
import "./Projects.css";
export default function Projects() {
const dispatch = useAppDispatch();
const projects = useAppSelector((state) => state.project.projects);
const [name, setName] = useState("");
const [description, setDescription] = useState("");
const [showForm, setShowForm] = useState(false);
useEffect(() => {
fetchProjects();
}, []);
async function fetchProjects() {
try {
const res = await api.get("/projects");
dispatch(setProjects(res.data.projects));
} catch (error) {
console.error("Failed to fetch projects:", error);
}
}
async function createProject(e: React.FormEvent) {
e.preventDefault();
if (!name.trim()) return;
try {
const res = await api.post("/projects", {
name,
description,
});
dispatch(setProjects([...projects, res.data.project]));
setName("");
setDescription("");
setShowForm(false);
} catch (error) {
console.error("Failed to create project:", error);
}
}
async function deleteProject(id: string) {
if (!window.confirm("Delete this project?")) return;
try {
await api.delete(`/projects/${id}`);
dispatch(
setProjects(
projects.filter((project) => project._id !== id)
)
);
} catch (error) {
console.error("Failed to delete project:", error);
}
}
return (
<div className="projects-page">
<div className="projects-header">
<div>
<h1>Projects</h1>
<p>Organize your tasks by project</p>
</div>
<button
className="add-project-btn"
onClick={() => setShowForm(!showForm)}
>
<Plus size={18} />
 Add Project
 </button>
 </div>
 {showForm && (
 <form className="project-form" onSubmit={createProject}>
 <input
 type="text"
 placeholder="Project name"
 value={name}
 onChange={(e) => setName(e.target.value)}
 />
 <textarea
 placeholder="Project description"
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 />
 <div className="project-form-actions">
 <button
 type="button"
 onClick={() => setShowForm(false)}
 >
  Cancel
</button>
<button type="submit">
Create Project
</button>
</div>
</form>
)}
{projects.length === 0 ? (
<div className="projects-empty">
<h3>No projects yet</h3>
<p>Create your first project to get started.</p>
</div>
) : (
<div className="projects-grid">
{projects.map((project) => (
<div className="project-card" key={project._id}>
<div>
<h3>{project.name}</h3>
<p>
{project.description || "No description"}
</p>
</div>
<button
className="delete-project-btn"
onClick={() => deleteProject(project._id)}
title="Delete project"
>
<Trash2 size={17} />
</button>
</div>
))}
</div>
)}
</div>
);
}