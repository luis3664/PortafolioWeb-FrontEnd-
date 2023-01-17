export interface Section {
    id: string;
    title: string;
    item: Item[];
}

interface Item{
    title: string;
    textMulti: Text[];
    text: string;
    certificate: Certificate[];
}

interface Text{
    text:string;
}

interface Certificate{
    date: string;
    url: string;
}