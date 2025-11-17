import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    isOpen : false
}


const openModals = createSlice({
    name : "openModal",
    initialState : intialState,
    reducers : {
        openModal(state){
            state.isOpen = !state.isOpen
        },
        closeModal(state){
            state.isOpen = !state.isOpen
        }

    }
})


export const { openModal, closeModal } = openModals.actions
export default openModals.reducer