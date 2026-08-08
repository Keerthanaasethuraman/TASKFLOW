import api from "./api";

export const getProjects = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const createProject = async (project: any) => {
  const token = localStorage.getItem("token");

  const response = await api.post("/projects", project, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};