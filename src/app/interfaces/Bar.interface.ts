export interface Bar{
    id: number | null,
    title: string,
    value: number,
    icon: Icon
};

interface Icon {
    id: number | null,
    name: string,
    identity: string,
    url: string,
    svg: boolean
};