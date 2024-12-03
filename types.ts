export interface Element {
    id: string,
    name: string,
    description: string,
    info: string,
    color: string
}

export interface Defect {
    id: string,
    description: string,
    type: string,
    marked: boolean,
    location: string
}

