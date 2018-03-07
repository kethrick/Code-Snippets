import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'

import { fetchDeck } from '../actions'
import { getDeck } from '../utils/api'
import { grey, black, purple, white } from '../constants/colors'

class Deck extends Component{

    async componentDidMount() {
        const { dispatch } = this.props
        const data = await getDeck(this.props.navigation.state.params.title)
        dispatch(fetchDeck(data))
    }
    
    async componentDidUpdate() {
        const { dispatch } = this.props
        const data = await getDeck(this.props.navigation.state.params.title)
        dispatch(fetchDeck(data))
    }

    addQuestion = (title) => {
        this.props.navigation.navigate("AddQuestion", {
            title,
            update: () => this.refreshOnGoBack()
        })
    }

    startQuiz = () => {
        this.props.navigation.navigate("Quiz", {
            title: this.props.navigation.state.params.title
        })
    }

    render() {
        const { deck } = this.props

        return (
            <View style={styles.deck} key={deck.title} >
                <Text style={{ fontSize: 40,textAlign: 'center' }}>
                    {deck.title}
                </Text>
                <Text style={{ fontSize: 16, color: grey, textAlign: 'center' }}>
                    { typeof deck.questions !== 'undefined' ? deck.questions.length : 0 } Cards
                </Text>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                        onPress={ () => this.addQuestion(deck.title) }>
                            <Text style={styles.submitBtnText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                        onPress={ () => this.startQuiz(deck.title) }>
                            <Text style={styles.submitBtnText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    deck: {
        flex: 1,
        flexDirection: 'column',
        padding: 20,
        marginTop: 12
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iosSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtn: {
        backgroundColor: purple,
        padding: 10,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    submitBtnText: {
        color: white,
        fontSize: 22,
        textAlign: 'center',
    },
    bigText: {
        fontSize:40,
        color: black
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
})

export default connect(state => state)(Deck)