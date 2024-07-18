import { IdToWork } from "@/types/models";
import { createSlice } from "@reduxjs/toolkit";

type WorkState = {
    works?: IdToWork[];
}

const initialState: WorkState = {
    works: undefined
}

const workSlice = createSlice({
    name: 'works',
    initialState,
    reducers: {
        setWorks: (state, action) => {
            state.works = action.payload;
        },
        resetWorks: (state) => {
            state.works = undefined;
        }
    }
});

export const { setWorks, resetWorks } = workSlice.actions;
export default workSlice.reducer;
