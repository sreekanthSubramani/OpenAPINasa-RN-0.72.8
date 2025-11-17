import {configureStore} from '@reduxjs/toolkit'
import openModalReducer  from '../Slices/SignupModalSlice' 


const store = configureStore({
    reducer: {
        modal : openModalReducer
    }
})


export default store
export type Rootstate = ReturnType<typeof store.getState>;