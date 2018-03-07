import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'

import {
    clearLocalNotification,
    setLocalNotification
} from '../utils/helpers'
import Card from './Card'
import { fetchQuestions } from '../actions'
import { getQuestions } from '../utils/api'
import { grey, black, purple, white, green } from '../constants/colors'

class Quiz extends Component {
    state = {
        index: 0,
        score: 0,
        finished: false,
        showAnswer: false,
    }

    handleAnswer = correct => {
        const title = this.props.navigation.state.params.title

        const questions = this.props.deck.questions
        let { score, index, done } = this.state
    
        score = correct ? score + 1 : score
        index++
        done = index === questions.length
        this.setState({ index: index })
        this.setState({ score: score })
        this.setState({ done: done })
    
        if (done) {
          clearLocalNotification().then(setLocalNotification)
        }
    }

    backToDeck = () => {
        this.props.navigation.goBack()
    }

    restartQuiz = () => {
        this.setState({ index: 0 })
        this.setState({ score: 0 })
        this.setState({ done: false })
    }

    render() {
        const title = this.props.navigation.state.params.title
        const questions = this.props.deck.questions
        const { index, score, done } = this.state

        if (done) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Result: {Math.floor(score / questions.length * 100)}%
                    </Text>
                    <View style={styles.row}>
                        <TouchableOpacity
                            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                            onPress={this.restartQuiz}
                        >
                            <Text style={styles.submitBtnText}>Restart Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                            onPress={this.backToDeck}
                        >
                            <Text style={styles.submitBtnText}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <Text>
                    Correct Answers: {score} out of {questions.length}
                </Text>
                <Text>Questions Remaining: {questions.length - index}</Text>
                <Card question={questions[index]} handleAnswer={this.handleAnswer} />
            </View>
        )

    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    iosSubmitBtn: {
        backgroundColor: green,
        padding: 10,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtn: {
        backgroundColor: green,
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
    }
})

export default connect(state => state)(Quiz)