import {configureStore} from '@reduxjs/toolkit'
import openModalReducer  from '../Slices/SignupModalSlice.js' 
import profileState from '../Slices/ProfileSection.js'


const store = configureStore({
    reducer: {
        modal : openModalReducer,
        profile : profileState
    }
})


export default store
export type Rootstate = ReturnType<typeof store.getState>;