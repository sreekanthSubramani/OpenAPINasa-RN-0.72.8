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