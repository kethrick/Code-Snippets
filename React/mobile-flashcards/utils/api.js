import { AsyncStorage } from 'react-native'

import { DECK_STORAGE_KEY } from '../constants/util-constants'

export function getDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY, (err, decks) => {
        if (decks === null) {
          return {}
        }
        return decks
    })
}

export function saveDeckTitle(title) {
    let deck = { title: title, questions: []}
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({ [title]: deck }))
}

export function getDeck(title) {
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(decks => {
        
        if(decks === null) {
            return {}
        }
        decks = JSON.parse(decks)
        deck = decks[title]
        return deck
    })
}

export function addCardToDeck(title, card) {

    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(origDecks => {
        const decks = JSON.parse(origDecks)
        decks[title].questions.push(card)
        AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(decks))
    })
}

export function getQuestions(title) {
    console.log('api',title)
    return AsyncStorage.getItem(DECK_STORAGE_KEY).then(decks => {
        
        if(decks === null) {
            return {}
        }
        decks = JSON.parse(decks)
        questions = decks[title].questions
        return questions
    })
}