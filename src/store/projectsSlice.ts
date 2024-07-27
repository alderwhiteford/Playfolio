import { IdToItem, Project } from "@/types/models";
import { createSlice } from "@reduxjs/toolkit";

type ProjectState = {
    projects?: IdToItem<Project>[];
}

const initialState: ProjectState = {
    projects: undefined
}

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        },
        resetProjects: (state) => {
            state.projects = undefined;
        }
    }
});

export const { setProjects, resetProjects } = projectSlice.actions;
export default projectSlice.reducer;
