import React, { Component } from 'react'
import { View, TouchableOpacity, Text, Stylesheet, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import {
    getMetricMetaInfo,
    timeToString,
    getDailyReminderValue,
    clearLocalNotification,
    setLocalNotification
} from '../utils/helpers'

import TextButton from './TextButton'
import { submitDeck, removeDeck } from '../utils/api'
import { addDeck } from '../actions'
import { purple, white } from '../constants/colors'
import SubmitBtn from './SubmitBtn'

class AddQuestion extends Component {
    state = {
        question: '',
        answer: ''
     }

     handleQuestion = (text) => {
        this.setState({ question: text })
     }

     handleAnswer = (text) => {
        this.setState({ answer: text })
     }

    submit = () => {
        this.props.dispatch(addQuestion(question))

        this.setState(() => ({ question: "" }))
        this.setState(() => ({ answer: "" }))

        this.toHome()
        submitDeck(deck)
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({ key: 'AddDeck' }))
    }

    render() {
        return (
            <View style={styles.container}>
                return (
                    <View key={key} style={styles.row}>
                        <TextInput
                            placeholder="Question"
                            placeholderTextColor = "#9a73ef"
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.question}
                        />
                        <TextInput
                            placeholder="Answer"
                            placeholderTextColor = "#9a73ef"
                            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                            onChangeText={(text) => this.setState({text})}
                            value={this.state.answer}
                        />
                    </View>
                )
                <SubmitBtn style={styles.center} onPress={this.submit} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    center: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
})

function mapStateToProps(state) {
    const key = timeToString()
    const deckName = state.deckName
    const question = {deckName: deckName, question: '', answer: ''}

    return {
        question,
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(mapStateToProps)(AddQuestion) 