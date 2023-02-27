import { Certificate } from "./Certificate.interface";
import { Img } from "./Img.interface";
import { Text } from "./Text.interface";

export interface Item {
    id: number,
    title: string,
    text: string,
    certificate: Certificate,
    imgAssigned: Array<Img>,
    iconAssigned: [],
    textCard: Text
}
