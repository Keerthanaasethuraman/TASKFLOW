import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Project {
  _id: string;
  name: string;
  description: string;
  status: string;
}

interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },

    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.unshift(action.payload);
    },
  },
});

export const { setProjects, addProject } = projectSlice.actions;

export default projectSlice.reducer;