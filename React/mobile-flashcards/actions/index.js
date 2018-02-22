import { 
    getDecks,
    saveDeckTitle,
    getDeck,
    addCardToDeck,
 }  from '../utils/api'
 
import {
    FETCH_DECKS,
    ADD_DECK,
    FETCH_DECK,
    ADD_QUESTION,
    FETCH_QUESTIONS
} from '../constants/action-types'

export function fetchDecks(decks) {
    return {
        type: FETCH_DECKS,
        decks,
    }
}

export function addDeck(title) {
    return {
        type: ADD_DECK,
        title,
    }
}

export function fetchDeck(deck) {
    return {
        type: FETCH_DECK,
        deck,
    }
}

export function addQuestion(title, question) {
    return {
        type: ADD_QUESTION,
        title,
        question,
    }
}

export function fetchQuestions(questions) {
    return {
        type: FETCH_QUESTIONS,
        questions,
    }
}