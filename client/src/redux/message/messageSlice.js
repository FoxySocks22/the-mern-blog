import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    type: null,
    message: null,
}

const messageSlice = createSlice({
    name: "message",
    initialState,
    reducers: {
        setMessageType: (state, action) => {
            state.type = action.payload
        },
        setMessage: (state, action) => {
            state.message = action.payload
        },
        clearMessage: (state) => {
            state.type = null,
            state.message = null
        }
    }
})

export const { 
    setMessageType,
    setMessage,
    clearMessage
} = messageSlice.actions;

export default messageSlice.reducer;