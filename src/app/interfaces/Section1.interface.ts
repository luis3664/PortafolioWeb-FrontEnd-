export interface Section1 {
    title: string;
    cards: Cards[];
}

interface Cards{
    title: string;
    textEnd: string;
    textBody: Text[];
}

interface Text{
    text:string;
}