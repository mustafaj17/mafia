import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './App.css';

class App extends Component {

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
        const settings = {/* your settings... */ timestampsInSnapshots: true};
        this.state = { games: [] }
        this.db = firebase.firestore();
        this.db.settings(settings);
        this.collection = this.db.collection('mafia-games');
    }

    componentWillMount(){

        let games = []
        this.collection.get().then(snapshot => {
            snapshot.forEach(doc => {
                games.push(doc);
                doc.onSnapshot( doc => {
                    this.setState
                })
            });

            this.setState({games})
        });

    }

    getGames = () => {
        return this.state.games.map( gameDoc => {
            return (<div className="game">{gameDoc.data().gameName}</div>)
        })
    }

    render() {
        return (
           <div className="App">

               {this.getGames()}

           </div>
        );
    }
}

export default App;
