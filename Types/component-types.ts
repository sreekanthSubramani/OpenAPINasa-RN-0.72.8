import { ReactNode } from "react"

export type HomeLayoutType = {
    colors : string[],
    children : ReactNode
}


export type ButtonProps = {
    heightNum : number,
    widthNum : number,
    colors?: string[],
    content : string,
    txtCol? : string,
    pressFunc? : ()=> void
}

export type SignupModalType = {
    visible : boolean,
    onCloseModal: ()=> void
}

export type DOB = {
    date?: number,
    month?: number,
    year?: number
}


export type FormikandDate = {
    dateSet?: number
    handleChange : ()=> void
}


export type SubmitValuesFormik = {
    name : string,
    dateOfB : string
}