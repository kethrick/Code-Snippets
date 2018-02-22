import {
    FETCH_DECKS,
    ADD_DECK,
    FETCH_DECK,
    FETCH_QUESTIONS,
    ADD_QUESTION,
} from '../constants/action-types'

const initialState = {
    decks: {},
    deck: {},
    questions: [],
}

function flashcards(state = initialState, action) {
    switch (action.type) {
        case FETCH_DECKS:
            return {
                ...state, decks: action.decks
            }
        case ADD_DECK:
            return {
                ...state, decks: {
                    ...state.decks, [action.title]: { title: action.title, questions: [] }
                }
            }
        case FETCH_DECK:
            return {
                ...state, deck: action.deck,
            }
        case ADD_QUESTION:
            const { title, question } = action
            return {
                ...state, decks: {
                    ...state.decks, [title]: {
                        ...state.decks[title], questions: [...state.decks[title].questions, question]
                    }
                }
            }
        case FETCH_QUESTIONS:
            return {
                ...state, questions: action.questions
            }
        default:
            return state
    }
}

export default flashcards