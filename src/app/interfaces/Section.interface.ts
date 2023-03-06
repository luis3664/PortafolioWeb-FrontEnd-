import { Item } from "./Item.interface";
import { Topic } from "./Topic.interface";

export interface Section {
    id: number,
    title: string,
    listTopic: Topic[],
    listItem: Item[]
}