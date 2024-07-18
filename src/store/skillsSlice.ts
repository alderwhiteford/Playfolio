import { Skill } from "@/types/models";
import { createSlice } from "@reduxjs/toolkit";

type SkillsState = {
    skills?: Skill[];
}

const initialState: SkillsState = {
    skills: undefined
}

const aboutSlice = createSlice({
    name: 'skills',
    initialState,
    reducers: {
        setSkills: (state, action) => {
            state.skills = action.payload;
        },
    }
});

export const { setSkills } = aboutSlice.actions;
export default aboutSlice.reducer;
