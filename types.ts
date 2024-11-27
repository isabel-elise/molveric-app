import { ImageSourcePropType } from "react-native"

export interface Element {
    id: string,
    name: string,
    note: string,
    color: string
}

export interface Card {
    id: string,
    description: string,
    figure: string,
    defects: string[]
}

export interface Defect {
    id: string,
    description: string,
    marked: boolean,
    location: string
}

