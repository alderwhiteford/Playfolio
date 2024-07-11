import { AboutPage, Skill } from "@/types/models";
import { createSlice } from "@reduxjs/toolkit";

type SkillsState = {
    skills: Skill[];
}

const initialState: SkillsState = {
    skills: []
}

const aboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {
        setSkills: (state, action) => {
            state.skills = action.payload;
        },
    }
});

export const { setSkills } = aboutSlice.actions;
export default aboutSlice.reducer;
