import  React, { ReactNode } from "react"


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


export type PostRequestforNew = {
    name : string,
    dateOfB : string,
    password : string
}


export type SuccessMessage = (text1 :string, text2 : string)=> void


export type Regions = {
    latitude?: number 
    longitude?: number,
    latitudeDelta : number,
    longitudeDelta : number
}


export type MetaData = {
    name : string,
    state : string,
    country : string,
    lat : number,
    long : number,
    degree : string,
    description : string,
    main : string,
    windSpeed : number,
    pictures? : string[]
}


export type ShowCityModal = {
    showCityModal : boolean,
    setShowCityModal : React.Dispatch<React.SetStateAction<boolean>>,
    distinguishedData? : MetaData,
    loadingState : boolean,
    setMetaData? : React.Dispatch<React.SetStateAction<MetaData>>
}

export type MapillaryAPICall = {
    id : string,
    thumb_256_url : string
}

export type FetchedCal = {
    date : string,
    month : string,
    year : string
}