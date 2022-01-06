import { Question, Choice } from "./QuestionTest";

// export const main_question: Question = {
//     id: 1,
//     text: 'Hola, soy ConsejerosBot, selecciona una de las siguientes opciones para poder ayudarte. =)',
//     bot: true,
//     type: 'choice',
//     choices: [
//         {
//             id: 1,
//             text: 'Ver polizas de x',
//             nextQuestion: {
//                 id: 1,
//                 text: 'Hola, soy ConsejerosBot, selecciona una de las siguientes opciones para poder ayudarte. =)',
//                 bot: true,
//                 type: 'choice',
//                 choices: [
//                     {
//                         id: 1,
//                         text: 'Polizas x - 1',
//                         nextQuestion: {
//                             id: 1,
//                             text: 'Polizas x - 1',
//                             bot: true,
//                             type: 'choice',
//                             choices: [
//                             ]
//                         }
//                     },
//                     {
//                         id: 1,
//                         text: 'Polizas x - 2',
//                         nextQuestion: {
//                             id: 1,
//                             text: 'Polizas x - 1',
//                             bot: true,
//                             type: 'choice',
//                             choices: [
//                             ]
//                         }
//                     }
//                 ]
//             }
//         },
//         {
//             id: 1,
//             text: 'Ver polizas de seguros',
//             nextQuestion: {
//                 id: 1,
//                 text: 'Hola, soy ConsejerosBot, selecciona una de las siguientes opciones para poder ayudarte. =)',
//                 bot: true,
//                 type: 'choice',
//                 choices: [
//                 ]
//             }
//         }
//     ]
// }

export const mainQuestion: Question = {
    id: 1,
    text: 'Hola, soy ConsejerosBot, selecciona una de las siguientes opciones para poder ayudarte. =)',
    bot: true,
    type: 'choice'
}

const mqc1Question: Question = {
    id: 1,
    text: 'Poliza x - q',
    bot: true,
    type: 'choice'
}

const mqc2Question: Question = {
    id: 1,
    text: 'Poliza y - q',
    bot: true,
    type: 'input'
}

const mqc3Question: Question = {
    id: 1,
    text: 'Ingrese el id de la poliza',
    bot: true,
    type: 'input',
    url: "https://localhost:7247/Poliza/"
}

export const choices: Choice[] = [
    //mq_choice1
    {
        id: 1,
        text: 'Ver polizas de x',
        question: mainQuestion,
        nextQuestion: mqc1Question
    },

    //mq_choice2
    {
        id: 2,
        text: 'Ver polizas de y',
        question: mainQuestion,
        nextQuestion: mqc2Question
    },

    //mq_choice3
    {
        id: 3,
        text: 'Ver polizas de z',
        question: mainQuestion,
        nextQuestion: mqc3Question
    },

    //mq_choice3
    {
        id: 4,
        text: 'Ver polizas de xq',
        question: mqc1Question,
        nextQuestion: mainQuestion
    },
]

export const getChoices = (question: Question, choices: Choice[]): Choice[] => {
    return choices.filter((choice)=>choice.question === question)
}