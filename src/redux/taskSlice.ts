import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type {
  KanbanTask,
  Columns,
  Activity,
} from "../components/kanban/kanbanTypes";

interface TaskState {
  tasks: KanbanTask[];
  selectedTask: KanbanTask | null;
  loading: boolean;
  columns: Columns;
  activities: Activity[];
  activeTask: KanbanTask | null;
}

const initialState: TaskState = {
  tasks: [],
  selectedTask: null,
  loading: false,

  columns: {
    Todo: [],
    "In Progress": [],
    Review: [],
    Done: [],
  },

  activities: [],

  activeTask: null,
};

const taskSlice = createSlice({
  name: "tasks",

  initialState,

  reducers: {

    setTasks: (
      state,
      action: PayloadAction<KanbanTask[]>
    ) => {
      state.tasks = action.payload;
    },

    setLoading: (
      state,
      action: PayloadAction<boolean>
    ) => {
      state.loading = action.payload;
    },
    setColumns: (
  state,
  action: PayloadAction<Columns>
) => {
  state.columns = action.payload;
},

setActivities: (
  state,
  action: PayloadAction<Activity[]>
) => {
  state.activities = action.payload;
},

setActiveTask: (
  state,
  action: PayloadAction<KanbanTask | null>
) => {
  state.activeTask = action.payload;
},

    setSelectedTask: (
      state,
      action: PayloadAction<KanbanTask | null>
    ) => {
      state.selectedTask = action.payload;
    },

   updateTask: (
  state,
  action: PayloadAction<KanbanTask>
) => {

  state.tasks = state.tasks.map(task =>
    task._id === action.payload._id
      ? action.payload
      : task
  );

  Object.keys(state.columns).forEach(status => {
    state.columns[
      status as keyof Columns
    ] = state.columns[
      status as keyof Columns
    ].filter(
      task => task._id !== action.payload._id
    );
  });

  state.columns[
    action.payload.status
  ].push(action.payload);

  state.selectedTask = action.payload;

},
    deleteTask: (
  state,
  action: PayloadAction<string>
) => {

  state.tasks = state.tasks.filter(
    task => task._id !== action.payload
  );

  Object.keys(state.columns).forEach(status => {

    state.columns[
      status as keyof Columns
    ] = state.columns[
      status as keyof Columns
    ].filter(
      task => task._id !== action.payload
    );

  });

},
    addTask: (
  state,
  action: PayloadAction<KanbanTask>
) => {

  state.tasks.push(action.payload);

  state.columns[action.payload.status].push(
    action.payload
  );

},

  },

});

export const {
  setTasks,
  setLoading,
  setColumns,
  setActivities,
  setActiveTask,
  setSelectedTask,
  updateTask,
  deleteTask,
} = taskSlice.actions;

export default taskSlice.reducer;