import React, { Component } from 'react';
import firebase from 'firebase/app';
import Players from './components/PlayerList'
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
        this.db = firebase.firestore();
        this.db.settings(settings);
        this.mafiaGamesCollection = this.db.collection('mafia-games');
        this.user = {
            name: `Player ${Math.random().toString()[3] }`,
            type: 'none',
            inGame: true,
            ready: false
        }

        this.state = {
            games: [],
            createGame: false,
            player: this.user
        }
    }

    componentWillMount(){

        this.disconnectFromGames = this.mafiaGamesCollection.onSnapshot(gamesSnapshot => {
            let games = [];
            gamesSnapshot.forEach(doc => {
                games.push(doc);
            });
            this.setState({games});
        }, err => {
            console.log(err);
        });
    }

    getGames = () => {
        return this.state.games.map( gameDoc => {
            return (<div className="game" onClick={() => this.selectGame(gameDoc)}>{gameDoc.data().gameName}</div>)
        })
    }

    selectGame = gameDoc => {
        this.disconnectFromGames();
        this.setState({
            game : gameDoc
        });

        this.disconnectFromGame = gameDoc.ref.onSnapshot( gameDoc => {
            this.setState({
                game : gameDoc
            });
            console.log(gameDoc.data());
        });
        this.mafiaGamesCollection.doc(gameDoc.id).set({ players : [...gameDoc.data().players, this.user]}, { merge: true })

    }

    createGame = () => {
        this.mafiaGamesCollection.add(
           {
               gameName: this.state.inputGameName,
               players: []
           })
        this.setState({
            createGame: false
        })
    }

    playerReady = () => {
        this.user = {
            ...this.user,
            ready: true
        }

        let newPlayerState = this.state.game.data().players.filter(player => {
            if(player.name === this.user.name){
                player.ready = true
            }

            return player;
        })

        this.mafiaGamesCollection.doc(this.state.game.id).set(
           { players : newPlayerState},
           { merge: true }
        )

        this.setState({
            player: this.user
        })
    }

    render() {

        if(this.state.createGame){
            return(
               <div className="App">
                   Game name <input type="text" value={this.state.inputGameName} onChange={ e => { this.setState({inputGameName : e.target.value })}}/>
                   <div className="done-btn" onClick={this.createGame}>Done</div>
               </div>
            )
        }

        if(this.state.game) {

            let game = this.state.game.data();
            return (
               <div className="App">
                   <div>{game.gameName}</div>
                   {!this.state.player.ready && <div className="btn" onClick={this.playerReady}>ready</div>}
                   {this.state.player.ready && <div>IM READYYY</div>}
                   {game.players && <Players players={game.players} />}
               </div>
            )
        }
        return (
           <div className="App">
               {this.getGames()}
               <div className="btn" onClick={ () => { this.setState({createGame: true})}}>Add</div>
           </div>
        );
    }
}

export default App;
