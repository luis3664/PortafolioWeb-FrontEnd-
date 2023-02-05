import { Img } from "./Img.interface";

export interface Item {
    id: number,
    title: string,
    text: string,
    certificate: any,
    imgAssigned: Img[],
    iconAssigned: [],
    textCard: Text
}

interface Text {
    id: number,
    text: string
}
