import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

import { gray } from '../constants/colors'
import { getDeckMetaInfo } from '../utils/helpers'

export default function DeckCard({ decks }) {
    return (
        <View>
            {
                decks && decks.map((deck) => {
                    return (
                        <View style={styles.deck} key={deck.id} >
                            <Text style={{ fontSize: 20 }}>
                                {deck.name}
                            </Text>
                            <Text style={{ fontSize: 16, color: gray }}>
                                {deck.questions.length} Cards
                            </Text>
                        </View >
                    )
                })
            }
        </View>
        
    )
}

const styles = StyleSheet.create({
    deck: {
        flexDirection: 'row',
        marginTop: 12
    },
}) 