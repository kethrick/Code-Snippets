import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { grey, black, purple, white, green, red } from '../constants/colors'

class Card extends Component {
    state = {
        showAnswer: false,
    }

    flipCard = () => {
        this.setState({ showAnswer: !this.state.showAnswer })
    }

    render() {
        const card = this.props.question
        if (this.state.showAnswer) {
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>Answer:</Text>
                    <Text style={styles.text}>{card.answer}</Text>
                    <TouchableOpacity style={styles.btnContainer} onPress={this.flipCard}>
                        <Text style={styles.btnText}>Question</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosSubmitBtnGreen : styles.AndroidSubmitBtnGreen}
                        onPress={() => {
                            this.flipCard()
                            this.props.handleAnswer(true)
                        }}
                    >
                        <Text style={styles.btnTitle}>Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={Platform.OS === 'ios' ? styles.iosSubmitBtnRed : styles.AndroidSubmitBtnRed}
                        onPress={() => {
                            this.flipCard()
                            this.props.handleAnswer(false)
                        }}
                    >
                        <Text style={styles.btnTitle}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            )
        }
        
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Question:</Text>
                <Text style={styles.text}>{card.question}</Text>
                <TouchableOpacity 
                    style={Platform.OS === 'ios' ? styles.iosSubmitBtn : styles.AndroidSubmitBtn}
                    onPress={this.flipCard}>
                    <Text style={styles.btnText}>Answer</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 30
    },
    text: {
        fontSize: 15,
        margin: 15
    },
    iosSubmitBtnGreen: {
        backgroundColor: green,
        margin: 10,
        padding: 20,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtnGreen: {
        backgroundColor: green,
        margin: 10,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iosSubmitBtnRed: {
        backgroundColor: red,
        margin: 10,
        padding: 20,
        borderRadius: 7,
        height: 45,
        marginLeft: 40,
        marginRight: 40,
    },
    AndroidSubmitBtnRed: {
        backgroundColor: red,
        margin: 10,
        padding: 20,
        paddingLeft: 30,
        paddingRight: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: red,
        fontSize: 22,
        textAlign: 'center',
    },
})

export default Card