export interface Message {
    id: number;
    text: string;
    from: string;
    type: string;
    previousQuestion: number;
    url?: string;
    format?: string;
}