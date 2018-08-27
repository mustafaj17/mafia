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
        this.mafiaGamesCollectionRef.add( { gameName: this.state.inputGameName } ).then( gameDocRef => {
            this.user.admin = true;
            this.selectGame(gameDocRef);
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

        gameDoc = gameDoc.ref || gameDoc;
        this.disconnectFromGames();

        //connect to the game doc and update state whenever it changes
        this.disconnectFromGame = gameDoc.onSnapshot( gameDocRef => {
            this.state.gameDocRef = gameDocRef;
            this.setState({
                gameDocRef
            })
        });

        let playersColRef = gameDoc.collection('players');

        //connect to the player collection and update when it changes
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

        playersColRef.get().then(playerDocsRefs => {
            playerDocsRefs.forEach(playerDocRef => {
                if(playerDocRef.data().name === this.user.name){
                    currentPlayerRef = playerDocRef;
                    playerDocRef.ref.onSnapshot( playerRef => {
                        this.setState({
                            playerRef: playerRef
                        })
                    })
                    console.log('player exists');
                }
            })

            if(!currentPlayerRef){
                playersColRef.add(this.user).then(playerDocRef => {
                    console.log('added new player');
                    playerDocRef.get().then( playerDoc => {
                        currentPlayerRef = playerDoc;
                        playerDoc.ref.onSnapshot( playerRef => {
                            this.setState({
                                playerRef: playerRef
                            })
                        })
                    })

                })

            }
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

    runGame = () => {

        if(this.state.players.length > 0 &&
           this.state.players.every( player => player.ready === true)){
            if(this.user.admin){
                this.setTypes()
            }

            if(this.state.gameDocRef.data().voteMode){
                if(this.state.players.filter( player => player.inGame).every( player => player.votingFor)){
                    this.votingComplete();
                }
            }
            else {
                this.setState({
                    roundInProgress: true
                })
            }

        }
    }

    votingComplete = () => {
        let inGamePlayers = this.state.players.filter( player => player.inGame)
        let votes = inGamePlayers.map( player => player.votingFor)
        let votingCount = {}

        votes.forEach( vote => {
            if(votingCount[vote]){
                votingCount[vote] = votingCount[vote] + 1
            }else {
                votingCount[vote] = 1
            }
        })

        let mostVoted;
        let mostVotedName;

        Object.keys(votingCount).forEach( player => {
            if(mostVoted){
                if(mostVoted < votingCount[player]){
                    mostVoted = votingCount[player];
                    mostVotedName = player
                }
            }else{
                mostVoted = votingCount[player];
                mostVotedName = player
            }
        })

        this.state.gameDocRef.ref.collection('players').get().then( playerDocs => {
            playerDocs.forEach(playerDocRef => {
                if(playerDocRef.data().name === mostVotedName){
                    playerDocRef.ref.update('inGame', false)

                }
                playerDocRef.ref.update('votingFor', null)
                playerDocRef.ref.update('ready', false)
            })
        })

        this.state.gameDocRef.ref.update('voteMode' , false)

    }

    endRound = () => {
        this.setState({
            roundInProgress : false
        })

        this.state.gameDocRef.ref.update('voteMode' , true)
    }

    setTypes = () => {

        if(this.state.players.length > 1 &&
           this.state.players.every( player => player.type === null)){
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

            this.state.gameDocRef.ref.collection('players').get().then( playerDocs => {

                   playerDocs.forEach ( playerDoc => {
                       let playerType = null;
                       this.state.players.forEach( player => {
                           if(player.name === playerDoc.data().name){
                               playerType = player.type
                           }
                       })
                       playerDoc.ref.update('type', playerType);
                   })

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

            let game = this.state.gameDocRef.data && this.state.gameDocRef.data();
            let player = this.state.playerRef && this.state.playerRef.data();
            if(!player || !game){
                return(
                   <div>loading</div>
                )
            }
            return (
               <div className="app">
                   <div className="header">{game && game.gameName}</div>

                   {game.voteMode && <div>please vote</div>}
                   {this.state.roundInProgress &&
                   <ReactCountdownClock seconds={10}
                                        color="#000"
                                        alpha={0.9}
                                        size={150}
                                        onComplete={this.endRound} />
                   }

                   {this.state.players && <Players voteMode={game.voteMode} players={this.state.players} currentPlayer={this.state.playerRef}/>}

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