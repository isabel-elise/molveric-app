export interface Element {
    id: string,
    name: string,
    description: string,
    note: string,
    color: string
}

export interface Defect {
    id: string,
    description: string,
    type: string,
    marked: boolean,
    location: string
}

