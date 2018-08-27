import React, { Component } from 'react';
import firebase from 'firebase/app';
import Players from './components/PlayerList'
import 'firebase/firestore';
import './App.css';
import ReactCountdownClock from 'react-countdown-clock';

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
        const settings = { timestampsInSnapshots: true };
        this.db = firebase.firestore();
        this.db.settings(settings);
        this.mafiaGamesCollectionRef = this.db.collection('mafia-games');
        let userName = localStorage.getItem('mafiaUserName');
        let hasUser = false;
        if(userName){
            this.user = {
                name: userName,
                type: null,
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
            gamesSnapshot.forEach(gameDoc => {
                games.push(gameDoc);
            });
            this.setState({games});
        }, err => {
            console.log(err);
        });
    }

    createUser = () => {
        this.user = {
            name: this.state.inputUserName,
            type: null,
            inGame: true,
            ready: false
        }

        localStorage.setItem('mafiaUserName', this.state.inputUserName);

        this.setState({
            hasUser: true
        })
    }

    createGame = () => {
        this.mafiaGamesCollectionRef.add( { gameName: this.state.inputGameName } ).then( gameDoc => {
            this.user.admin = true;
            this.selectGame(gameDoc);
            this.setState({
                createGame: false
            })
        })
    }

    getGames = () => {
        return this.state.games.map( gameDoc => {
            return (<div className="game" onClick={() => this.selectGame(gameDoc)}>{gameDoc.data().gameName}</div>)
        })
    }

    selectGame = gameDoc => {

        gameDoc = gameDoc.ref || gameDoc
        this.disconnectFromGames();

        this.disconnectFromGame = gameDoc.onSnapshot( gameDocRef => {


            let playersColRef = gameDocRef.ref.collection('players');


            playersColRef.onSnapshot(playersSnapshot => {
                let playersArray = [];
                playersSnapshot.forEach( playerDoc => {
                    playersArray.push(playerDoc.data())
                })

                this.setState({
                    players: playersArray
                })

                this.runGame();
            })

            let currentPlayerRef;
            let playersArray = [];

            playersColRef.get().then(playerDocsRefs => {
                playerDocsRefs.forEach(playerDocRef => {
                    if(playerDocRef.data().name === this.user.name){
                        currentPlayerRef = playerDocRef;
                        playerDocRef.ref.onSnapshot( playerRef => {
                            this.setState({
                                playerRef: playerRef
                            })
                        })
                        console.log('playerRef exists');
                    }
                    playersArray.push(playerDocRef.data())
                })

                if(!currentPlayerRef){
                    playersColRef.add(this.user).then(playerDocRef => {
                        playerDocRef.get().then( playerDoc => {
                            currentPlayerRef = playerDoc;
                            playersArray.push(playerDoc.data())
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
                        players: playersArray
                    });
                }



            })
        });

    }

    playerReady = () => {
        this.user = {
            ...this.user,
            ready: true
        }
        this.state.playerRef.ref.set(this.user)
    }

    runGame = () => {

        if(this.state.players.every( player => player.ready === true)){
            if(this.user.admin){
                this.setTypes()
            }

            this.setState({
                roundInProgress : true
            })

        }
    }

    setTypes = () => {

        if(this.state.players.every( player => player.type === null)){
            //no types are set
            let mafiaCount = 1;
            this.state.players.forEach( player => {
                if(mafiaCount) {
                    player.type = 'Mafia';
                    mafiaCount--;
                }else{
                    player.type = 'Civilian'
                }
            });

            this.state.gameDocRef.ref.collection('players').get().then( playerDoc => {
                let playerType = null;
                this.state.players.forEach( player => {
                    if(player.name === playerDoc.data().name){
                        playerType = player.type
                    }
                })
                playerDoc.ref.update('type', playerType);
               }
            )
        }
    }

    render() {

        if(!this.state.hasUser){
            return(
               <div className="app">
                   <div className="header">Mafia</div>
                   Username <input type="text" value={this.state.inputUserName} onChange={ e => { this.setState({inputUserName : e.target.value })}}/>
                   <div className="footer-btn" onClick={this.createUser}>Done</div>
               </div>
            )
        }

        if(this.state.createGame){
            return(
               <div className="app">

                   <div className="header">Mafia</div>
                   <div className="create-game">

                       <div className="input-title">Game name </div>
                       <input className="input-text-box" type="text" value={this.state.inputGameName}
                              onChange={ e => { this.setState({inputGameName : e.target.value })}}/>
                       <div className="footer-btn" onClick={this.createGame}>Done</div>
                   </div>
               </div>
            )
        }

        if(this.state.gameDocRef) {

            let game = this.state.gameDocRef.data();
            let player = this.state.playerRef && this.state.playerRef.data();
            return (
               <div className="app">
                   <div className="header">{game.gameName}</div>

                   {this.state.voteInProgress && <div>please vote</div>}
                   {this.state.roundInProgress &&
                   <ReactCountdownClock seconds={10}
                                        color="#000"
                                        alpha={0.9}
                                        size={150}
                                        onComplete={()=>this.setState({roundInProgress: false, voteInProgress: true})} />
                   }

                   {this.state.players && <Players players={this.state.players} />}

                   {player.admin && <div> IM THE GUY</div>}

                   {!player.ready && <div className="footer-btn" onClick={this.playerReady}>ready</div>}
               </div>
            )
        }
        return (
           <div className="app">
               <div className="header">Mafia</div>
               {this.getGames()}
               <div className="footer-btn" onClick={ () => { this.setState({createGame: true})}}>Start New Game</div>
           </div>
        );
    }
}

export default App;