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
        this.mafiaGamesCollectionRef = this.db.collection('mafia-games');
        let userName = localStorage.getItem('mafiaUserName');
        let hasUser = false;
        if(userName){
            this.user = {
                name: userName,
                type: 'none',
                inGame: true,
                ready: false
            }
            hasUser = true;
        }
        this.state = {
            games: [],
            createGame: false,
            hasUser
        }
    }

    componentWillMount(){

        this.disconnectFromGames = this.mafiaGamesCollectionRef.onSnapshot(gamesSnapshot => {
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

        this.disconnectFromGame = gameDoc.ref.onSnapshot( gameDocRef => {

            let playersColRef = gameDocRef.ref.collection('players');
            playersColRef.onSnapshot(playersSnapshot => {
                let playersArray = []
                playersSnapshot.forEach( playerDoc => {
                    playersArray.push(playerDoc.data())
                })
                this.setState({
                    players: playersArray
                })
            })
            let currentPlayerRef;
            playersColRef.get().then(playerDocsRefs => {
                let playersArray = [];
                let playersDocRefs = [];
                playerDocsRefs.forEach(playerDocRef => {
                    if(playerDocRef.data().name === this.user.name){
                        currentPlayerRef = playerDocRef;
                        console.log('playerRef exists');
                    }

                    playersArray.push(playerDocRef.data())
                })

                if(!currentPlayerRef){
                    console.log('hello world')
                    playersColRef.add(this.user).then(player => {
                        player.get().then( playerObj => {
                            currentPlayerRef = playerObj;
                            playersArray.push(playerObj.data())
                            this.setState({
                                gameDocRef,
                                playerRef: currentPlayerRef,
                                players: playersArray
                            });
                        })

                    })

                }else{
                    this.setState({
                        gameDocRef,
                        playerRef: currentPlayerRef,
                        playersDocRefs,
                        players: playersArray
                    });
                }



            })
        });

        // this.mafiaGamesCollectionRef.doc(gameDoc.id).set({ players : [...gameDoc.data().players, this.user]}, { merge: true })

    }

    createGame = () => {
        this.mafiaGamesCollectionRef.add(
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
        this.state.playerRef.ref.set(this.user)
    }

    createUser = () => {
        this.user = {
            name: this.state.inputUserName,
            type: 'none',
            inGame: true,
            ready: false
        }

        localStorage.setItem('mafiaUserName', this.state.inputUserName);

        this.setState({
            hasUser: true
        })
    }

    render() {

        if(!this.state.hasUser){
            return(
                <div className="App">
                    Username <input type="text" value={this.state.inputUserName} onChange={ e => { this.setState({inputUserName : e.target.value })}}/>
                    <div className="done-btn" onClick={this.createUser}>Done</div>
                </div>
            )
        }

        if(this.state.createGame){
            return(
                <div className="App">
                    Game name <input type="text" value={this.state.inputGameName} onChange={ e => { this.setState({inputGameName : e.target.value })}}/>
                    <div className="done-btn" onClick={this.createGame}>Done</div>
                </div>
            )
        }

        if(this.state.gameDocRef) {

            let game = this.state.gameDocRef.data();
            let player = this.state.playerRef && this.state.playerRef.data();
            console.log(this.state.players);
            return (
                <div className="App">
                    <div>{game.gameName}</div>
                    {player && !player.ready && <div className="btn" onClick={this.playerReady}>ready</div>}
                    {player && player.ready && <div>IM READYYY</div>}
                    {this.state.players && <Players players={this.state.players} />}
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
