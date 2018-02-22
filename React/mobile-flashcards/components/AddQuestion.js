import React, { Component } from 'react'
import { View, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { addQuestion } from '../actions'
import { addCardToDeck } from '../utils/api'
import { purple, white } from '../constants/colors'
import SubmitBtn from './SubmitBtn'

class AddQuestion extends Component {
    state = {
        question: '',
        answer: ''
    }

    submit = () => {
        const title = this.props.navigation.state.params.title
        const question = this.state.question
        const answer = this.state.answer
        this.props.dispatch(addQuestion(title, { question, answer }))
        this.props.navigation.goBack();
        addCardToDeck(title, { question, answer });
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <TextInput
                    multiLine={true}
                    autoGrow={true}
                    autoCapitalize="none"
                    autoFocus={true}
                    placeholder="Question"
                    placeholderTextColor = "#9a73ef"
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(question) => this.setState({question})}
                    value={this.state.question}
                />
                <TextInput
                    multiLine={true}
                    autoGrow={true}
                    autoCapitalize="none"
                    placeholder="Answer"
                    placeholderTextColor = "#9a73ef"
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(answer) => this.setState({answer})}
                    value={this.state.answer}
                />
                <SubmitBtn onPress={this.submit} />
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
})

export default connect()(AddQuestion) 