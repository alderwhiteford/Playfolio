import { AboutPage } from "@/types/models";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AboutPage = {
    greeting: '',
    introduction: ''
}

const aboutSlice = createSlice({
    name: 'about',
    initialState,
    reducers: {
        setAbout: (state, action) => {
            state.greeting = action.payload.greeting;
            state.introduction = action.payload.introduction;
        },
    }
});

export const { setAbout } = aboutSlice.actions;
export default aboutSlice.reducer;
