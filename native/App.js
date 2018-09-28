/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import firebase from 'firebase/app';
import 'firebase/firestore';
import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);

        if (firebase.apps && ( firebase.apps.length < 1 )) {
            let config = {
                apiKey: "AIzaSyAJoYge9agHxipUEtP-RFulZCUTif9Mi3o",
                authDomain: "mafia-7c60c.firebaseapp.com",
                databaseURL: "https://mafia-7c60c.firebaseio.com",
                projectId: "mafia-7c60c",
                storageBucket: "mafia-7c60c.appspot.com",
                messagingSenderId: "328931836560"
            };

            firebase.initializeApp(config);

        }
        const settings = {timestampsInSnapshots: true};
        this.db = firebase.firestore();
        this.db.settings(settings);
        this.mafiaGamesCollectionRef = this.db.collection('mafia-games');
        // let userName = localStorage.getItem(this.props.username);
        let userName = this.props.username;
        let hasUser = false;
        if (userName) {
            this.user = {
                name: userName
            }
            hasUser = true;
        }
        this.state = {
            games: [],
            createGame: false,
            inputGameName: '',
            hasUser
        }
    }

    componentWillMount() {
        console.log("collectionRef: ", this.mafiaGamesCollectionRef)
        this.disconnectFromGames = this.mafiaGamesCollectionRef.onSnapshot(gamesSnapshot => {
            let games = [];
            console.log("gameSnapshot: ", gamesSnapshot)
            gamesSnapshot.forEach(gameDoc => {
                console.log("gameDoc: ", gameDoc)
                games.push(gameDoc);
            });
            this.setState({games});
        }, err => {
            console.log(err);
        });
    }

    render() {
        console.log("Game state: " ,this.state.games)
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Wagwan My Guy</Text>
                <Text style={styles.welcome}>Debug JS remotely to view you snapshots in the console</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
