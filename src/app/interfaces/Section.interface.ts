import { Item } from "./Item.interface";

export interface Section {
    id: number,
    title: string,
    listTopic: [],
    listItem: Item[]
}