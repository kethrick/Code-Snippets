import React, { Component } from 'react'
import { View, KeyboardAvoidingView, TouchableOpacity, Text, StyleSheet, Platform, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'
import { purple, white } from '../constants/colors'
import SubmitBtn from './SubmitBtn'

class AddDeck extends Component {
    state = {
        title: '',
    }

    componentWillUnmount() {
        this.setState({ title: "" })
    }

    submit = () => {
        const title = this.state.title
        this.props.dispatch(addDeck(title))
        this.setState(() => ({ title: "" }))

        this.toHome(title)
        saveDeckTitle(title)
    }

    toHome = (title) => {
        this.props.navigation.navigate("Deck", { title })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text>What is the title of your new deck? </Text>
                <TextInput
                    id="title"
                    style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(title) => this.setState({title})}
                    value={this.state.title}
                />
                <SubmitBtn style={styles.center} onPress={this.submit} />
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
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
})


export default connect()(AddDeck) 