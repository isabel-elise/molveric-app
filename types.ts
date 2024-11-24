interface Element {
    id: string,
    name: string,
    note: string,
    color: string
}

interface Card {
    id: string,
    description: string,
    figure: "",
    defects: string[]
}

interface Defect {
    id: string,
    description: string,
    marked: boolean,
    location: string
}

