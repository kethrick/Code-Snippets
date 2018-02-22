import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native'
import { connect } from 'react-redux'

import { timeToString, getDailyReminder } from '../utils/helpers'
import { fetchDecks } from '../actions'
import { getDecks } from '../utils/api'
import { white, black, grey } from '../constants/colors'

class DeckList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            decks: this.props.decks
        }
    }

    async componentDidMount() {
        const { dispatch } = this.props
        const data = await getDecks()
        dispatch(fetchDecks(JSON.parse(data)))
    }

    _onPress(title) {
        const { navigate } = this.props.navigation
        this.props.navigation.navigate('Deck', { title: title })
    }

	render() {
        const { decks } = this.props
        if (decks === null) {
            return (
                <View style={styles.container}>
                    <Text>There are currently no decks in your app.</Text>
                    <Text>Add a new deck by selecting "New Deck"</Text>
                </View>
            )
        }
        
        const data = Object.values(decks)
        
		return (
            <FlatList
                data={data}
                keyExtractor={(item, index) => index}
                renderItem={({item, separators}) => (
                    <TouchableHighlight
                        onPress={() => this._onPress(item.title)}
                        onShowUnderlay={separators.highlight}
                        onHideUnderlay={separators.unhighlight}>
                        <View style={styles.deckContainer}>
                            <Text style={styles.bigText}>{item.title}</Text>
                            <Text>{item.questions.length} Cards</Text>
                        </View>
                    </TouchableHighlight>
                )}
            />
		)
	}
}

const styles = StyleSheet.create({
    deckContainer: {
        margin: 15,
        padding: 15,
        alignItems: 'center',
        borderBottomColor: black,
        borderBottomWidth: 1,
    },
    text: {
        color: black
    },
    bigText: {
        fontSize:40,
        color: black
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(state => state)(DeckList)