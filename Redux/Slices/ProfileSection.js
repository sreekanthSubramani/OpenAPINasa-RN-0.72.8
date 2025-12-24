import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayName : "",
    email : "",
    photoURL : "",

}


const profileState = createSlice({
    name : "profilename",
    initialState : initialState,
    reducers : {
        addStateInfo : (state, action)=>{
                state.displayName = action.payload.name;
                state.email = action.payload.email;
                state.photoURL = action.payload.photo
        }
    }

})



export const {addStateInfo} = profileState.actions
export default profileState.reducer