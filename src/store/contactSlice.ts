import { Contact, IdToItem } from "@/types/models";
import { createSlice } from "@reduxjs/toolkit";

type ContactState = {
    contacts?: IdToItem<Contact>[];
}

const initialState: ContactState = {
    contacts: undefined
}

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setContacts: (state, action) => {
            state.contacts = action.payload;
        },
    }
});

export const { setContacts } = contactSlice.actions;
export default contactSlice.reducer;
