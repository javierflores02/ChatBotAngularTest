import { Choice, Message } from "./bharatrpatil-chat.component";


export const getChoices = (idQuestion: number): Choice[] => {
    return mockChoice.filter((choice) => choice.question === idQuestion);
}

export const getChoice = (idQuestion: number, optChoice: number, mockChoice: Choice[]): Choice => {
    return mockChoice.find((choice) => choice.question === idQuestion && choice.option === optChoice);
}

export const getQuestion = (idQuestion: number, mockMessages: Message[]): Message => {
    return mockMessages.find((question) => question.id === idQuestion);
}

export const getChoicesStr = (idQuestion: number, first: boolean = false, mockChoice: Choice[]): string => {
    let choice_str = first ? "" : `<p class="bot_rsp_choice">Ingrese <b class="bot_rsp_choice">0</b> para volver a la prregunta anterior</p>`
    mockChoice.map((choice) => {
        if (choice.question === idQuestion){
            choice_str += `<p class="bot_rsp_choice">Ingrese <b class="bot_rsp_choice">${choice.option}</b> para ${choice.text}</p>`
        }
    });
    return choice_str;
}

export const mockMessages: Message[] = [
    {
        id: 1,
        text: "Hola, bienvenid@ al chat de ayuda de Consejeros y corredores de seguros S.A",
        from: 'bot',
        type: "",
        previousQuestion: null
    }, {
        id: 2,
        text: "",
        from: 'bot',
        type: "choices",
        previousQuestion: 1
    }, {
        id: 3,
        text: "",
        from: 'bot',
        type: "choices",
        previousQuestion: 2
    }, {
        id: 4,
        text: "Ingrese el nombre de la persona",
        from: 'bot',
        type: "input",
        previousQuestion: 3,
        url: "https://localhost:7247/Poliza/nombre/"
    }, {
        id: 5,
        text: "",
        from: 'bot',
        type: "choices",
        previousQuestion: 2
    }, {
        id: 6,
        text: "Ingrese el DNI de la persona",
        from: 'bot',
        type: "input",
        previousQuestion: 3,
        url: "https://localhost:7247/Poliza/dni/"
    }
]

export const mockChoice: Choice[] = [
    {
        id: 1,
        text: "consular polizas X",
        question: 2,
        nextQuestion: 3,
        option: 1
    }, {
        id: 2,
        text: "consular polizas Y",
        question: 2,
        nextQuestion: 5,
        option: 2
    }, {
        id: 3,
        text: "X - consular polizas por DNI",
        question: 3,
        nextQuestion: 6,
        option: 1
    }, {
        id: 4,
        text: "X - consular polizas por nombre",
        question: 3,
        nextQuestion: 4,
        option: 2
    }, {
        id: 5,
        text: "Y - consular polizas YX",
        question: 5,
        nextQuestion: 4,
        option: 1
    }, {
        id: 6,
        text: "Y - consular polizas YY",
        question: 5,
        nextQuestion: 4,
        option: 2
    }
]