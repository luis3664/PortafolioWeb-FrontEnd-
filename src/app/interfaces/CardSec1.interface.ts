import { Img } from "./Img.interface";

export interface CardSec1{
    title: string;
    textEnd: string;
    textBody: Text[];
    img: Img[];
}

interface Text{
    text: string;
}