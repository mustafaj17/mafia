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
        const settings = {timestampsInSnapshots: true};
        this.db = firebase.firestore();
        this.db.settings(settings);
        this.mafiaGamesCollectionRef = this.db.collection('mafia-games');
        let userName = localStorage.getItem('mafiaUserName');
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
            hasUser
        }
    }

    componentWillMount() {

        window.addEventListener("beforeunload", this.onUnload)
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

    componentWillUnmount() {
        window.removeEventListener("beforeunload", this.onUnload)
    }

    onUnload = (event) => { // the method that will be used for both add and remove event
        let playersColRef = this.state.gameDocRef.ref.collection('players')
        playersColRef.onSnapshot(playersSnapshot => {
                playersSnapshot.forEach(playerDoc => {
                    if (playerDoc.data().name === this.user.name) {
                    }
                })
            }
        )
        event.returnValue = "player left"
        // when admin leaves game, select another admin from the list of players.
        // when normal player closes window, we must delete them from the player collection.
    }

    createUser = () => {
        this.user = {
            name: this.state.inputUserName
        }

        localStorage.setItem('mafiaUserName', this.state.inputUserName);

        this.setState({
            hasUser: true
        })
    }

    createGame = () => {
        this.setState({
            createGame: false,
            joiningGame: true
        })
        this.mafiaGamesCollectionRef.add(
            {
                gameName: this.state.inputGameName,
                roundInProgress: false,
                votingInProgress: false
            }
        ).then(gameDocRef => {
            this.user.admin = true;
            this.selectGame(gameDocRef);
        })
    }

    getGames = () => {
        return this.state.games.filter(gameDoc => !gameDoc.data().gameInProgress).map(gameDoc => {
            return (<div className="game"
                         onClick={() => this.selectGame(gameDoc)}
                         onDoubleClick={ e => e.preventDefault()}>{gameDoc.data().gameName}</div>)
        })
    }

    selectGame = gameDoc => {
        this.setState({
            createGame: false,
            joiningGame: true
        })

        gameDoc = gameDoc.ref || gameDoc;
        this.disconnectFromGames();

        //connect to the game doc and update state whenever it changes
        this.disconnectFromGame = gameDoc.onSnapshot(gameDocRef => {
            this.state.gameDocRef = gameDocRef;
            this.setState({
                gameDocRef
            })
            if(this.state.joiningGame){
                this.setState({joiningGame: false})
            }
            this.runGame();
        });

        let playersColRef = gameDoc.collection('players');

        //connect to the player collection and update when it changes
        playersColRef.onSnapshot(playersSnapshot => {
            let playersArray = [];
            playersSnapshot.forEach(playerDoc => {
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
                if (playerDocRef.data().name === this.user.name) {
                    playerDocRef.ref.onSnapshot(playerRef => {
                        this.setState({
                            playerRef: playerRef
                        })
                    })
                    this.setState({
                        playerRef: playerDocRef
                    })
                    currentPlayerRef = playerDocRef
                    console.log('player exists');
                }
            })

            if (!currentPlayerRef) {
                console.log('this shouldnt be running')
                playersColRef
                    .add(
                        {
                            type: null,
                            inGame: true,
                            ready: false,
                            ...this.user
                        }).then(playerDocRef => {
                    playerDocRef.get().then(playerDoc => {
                        this.setState({
                            playerRef: playerDocRef
                        })
                        playerDoc.ref.onSnapshot(playerRef => {
                            this.setState({
                                playerRef: playerRef
                            })
                        })
                        console.log('added new player');
                    })

                })

            }
        })
    }



    playerReady = () => {
        this.state.playerRef.ref.update('ready', true);
    }

    runGame = () => {
        if(this.state.players && this.state.players.length) {
            if (this.user.admin) {

                let game = this.state.gameDocRef.data();
                let playersInTheGame = this.state.players.filter(player => player.inGame);
                let playersHaveType= this.state.players.every(player => player.type);
                let allPlayersAreReady = playersInTheGame.every(player => player.ready);
                if (allPlayersAreReady) {
                    if(!game.gameInProgress){
                        this.state.gameDocRef.ref.update('gameInProgress', true);
                    }
                    this.setTypes()
                    this.startGameRound(allPlayersAreReady, playersHaveType);
                }

                if (game.votingInProgress) {
                    let allPlayersHaveVoted = playersInTheGame.every(player => player.votingFor);
                    if (allPlayersHaveVoted) {
                        this.votingComplete();
                    }
                }
                this.hasGameEnded();
            }
        }
    }

    hasGameEnded = () => {
        if (this.state.players && this.state.players.length) {
            if (this.user.admin) {
                if (this.state.players.every(player => player.type)) {

                    let playersInTheGame = this.state.players.filter(player => player.inGame)
                    let civilianCount = playersInTheGame.filter(player => player.type === 'Civilian')
                    let mafiaCount = playersInTheGame.filter(player => player.type === 'Mafia')

                    if (mafiaCount.length === 0) {
                        debugger
                        this.state.gameDocRef.ref.update('gameComplete', true, 'civiliansWin', true);
                    }


                    if (mafiaCount.length >= civilianCount.length) {
                        this.state.gameDocRef.ref.update('gameComplete', true, 'mafiasWin', true);
                    }

                }
            }
        }
    }

    votingComplete = () => {
        let inGamePlayers = this.state.players.filter( player => player.inGame)
        let votes = inGamePlayers.map( player => player.votingFor)
        let votingCount = {}

        inGamePlayers.forEach(player => {
            if(votingCount[player.votingFor]){
                votingCount[player.votingFor] = votingCount[player.votingFor] + 1
            } else {
                votingCount[player.votingFor] = 1
            }
        })

        let mostVoted
        let mostVotedName;
        let drawArray = []
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

        drawArray.push(mostVotedName)

        Object.keys(votingCount).forEach(player => {
            if((votingCount[player] === mostVoted) && (mostVotedName !== player)){
                drawArray.push(player)
            }
        })

        if(drawArray.length > 1){
            this.state.gameDocRef.ref.collection('players').get().then(playerDocs => {
                playerDocs.forEach(playerDocRef => {
                    playerDocRef.ref.update('votingFor', null)
                })
                this.state.gameDocRef.ref.update('isDraw', drawArray)
            })


        } else {

            this.state.gameDocRef.ref.collection('players').get().then(playerDocs => {
                playerDocs.forEach(playerDocRef => {
                    if (playerDocRef.data().name === mostVotedName) {
                        playerDocRef.ref.update('inGame', false)

                    }
                    playerDocRef.ref.update('votingFor', null)
                })
                this.state.gameDocRef.ref.update('votingInProgress', false, 'isDraw', null)
            })
        }

    }

    startGameRound = (allPlayersAreReady, playersHaveType) => {
        if (allPlayersAreReady && playersHaveType) {
            debugger
            this.state.gameDocRef.ref.update('roundInProgress', true);
        }
    }

    endRound = () => {
        this.state.gameDocRef.ref.collection('players').get().then( playerDocs => {
            playerDocs.forEach(playerDocRef => {
                playerDocRef.ref.update('ready', false)
            })
            this.state.gameDocRef.ref.update('roundInProgress' , false);
            this.state.gameDocRef.ref.update('votingInProgress' , true)
        })

    }

    setTypes = () => {
        let players = this.state.players
        if(players.length > 1 &&
            players.every( player => player.type === null)){
            //no types are set
            let mafiaCount;
            switch (true){
                case (players.length < 6):
                    mafiaCount = 1;
                    break;
                case (players.length < 9):
                    mafiaCount = 2;
                    break;
                default:
                    break
            }

            while(mafiaCount){
                let rand = Math.floor(Math.random() * players.length);
                if(!players[rand].type){
                    players[rand].type = 'Mafia';
                    players.ready = false
                    mafiaCount--;
                }
            }

            players.forEach( player => {
                if(!player.type) {
                    player.type = 'Civilian'
                    player.ready = false
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
                        playerDoc.ref.update('type', playerType, 'ready', false);
                    })

                }
            )
        }
    }

    render() {
        if(this.state.joiningGame){
            return(
                <div>loading</div>
            )
        }

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
                        <div className="footer-btn create-game-btn" onClick={this.createGame}>Done</div>
                    </div>
                </div>
            )
        }

        if(this.state.gameDocRef) {

            let game = this.state.gameDocRef.data && this.state.gameDocRef.data();
            let player = this.state.playerRef && this.state.playerRef.data && this.state.playerRef.data();
            if(!player || !game){
                return(
                    <div>loading</div>
                )
            }
            return (
                <div className="app">
                    <div className="header">{game.gameName}</div>

                    {game.votingInProgress && !player.votingFor && <div>please vote</div>}

                    {game.roundInProgress &&
                    <ReactCountdownClock seconds={10}
                                         color="#000"
                                         alpha={0.9}
                                         size={150}
                                         onComplete={this.endRound} />
                    }

                    {game.isDraw && <div>There has been a draw between:</div>}
                    {game.isDraw && game.isDraw.map(player =>{
                        return(
                            <div>{player}</div>
                        )
                    })}

                    {this.state.players &&
                    <Players
                        voteMode={game.votingInProgress}
                        players={this.state.players}
                        currentPlayer={this.state.playerRef}/>}

                    {player.admin && <div> You are admin</div>}

                    {game.gameComplete && game.mafiasWin && <div>Mafias Win</div>}
                    {game.gameComplete && game.civiliansWin && <div>Civilians Win</div>}

                    {player.inGame &&
                    !player.ready &&
                    !game.gameComplete &&
                    !game.votingInProgress  &&
                    <div className="footer-btn" onClick={this.playerReady}>ready</div>}
                </div>
            )
        }
        return (
            <div className="app">
                <div className="header">Mafia</div>
                <div className="name-heading">Hello {this.user.name}</div>
                {this.getGames()}
                <div className="footer-btn" onClick={ () => { this.setState({createGame: true})}}>Start New Game</div>
            </div>
        );
    }
}

export default App;