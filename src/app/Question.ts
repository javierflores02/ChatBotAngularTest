export interface Question {
    id: number;
    text: string;
    bot: boolean;
    type: string;
    choices?: Choice[];
    previousQuestion?: Question;
    url?: string;
}

export interface Choice{
    id: number;
    text: string;
    question: Question;
    nextQuestion?: Question;
}