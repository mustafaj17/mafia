import firebase from "firebase/app";
import "firebase/firestore";
import React, {Component} from "react";
import {Animated, AsyncStorage, Image, ImageBackground, Text, View} from "react-native";
import LobbyScreen from "./src/screens/lobby-screen/lobby-screen";
import GameScreen from "./src/screens/game-screen/game-screen";
import EnterNameScreen from "./src/screens/enter-name/enter-name-screen";
import styles from "./src/app.style";
import background from "./resources/background.png";
import LoadingScreen from "./src/screens/loadingScreen/loadingScreen";


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
        this.user = {};
        this.db = firebase.firestore();
        this.mafiaGamesCollectionRef = this.db.collection('mafia-games');
        this.getUsername();
        this.state = {
            inputGameName: '',
            loadingGame: false,
            hasPlayerSeenVotedOut: false,
            errorMessage: null,
            showSpinner: false,
            roundNumber: 1

        }
    }

    resetState = () => {
        this.setState({
            inputGameName: '',
            loadingGame: false,
            errorMessage: null,
            hasPlayerSeenVotedOut: true,
            showSpinner: false,
            roundNumber: 1,
            gameDocRef: null,
            players: null,
            playerRef: null,
            hasGameEnded: false
        })

       this.user.admin = false;
    }

    getUsername = async () => {
        try {
            let value = await AsyncStorage.getItem('@Mafia:username');
            if (value !== null) {
                value = JSON.parse(value);
                this.user.name = value;
                this.setState({hasUser: false, inputUserName: value})
            }else{
                this.setState({hasUser: false})
            }
        } catch (error) {
            return 'error';
        }
    }

    createUser = () => {
        if(this.state.inputUserName.length > 2) {
			  this.setState({
				  hasUser: true
			  })
			  this.user.name = this.state.inputUserName;
			  this.saveUsername('@Mafia:username', this.state.inputUserName);
		  }
    }

	 saveUsername = (key, value) => {
        value = JSON.stringify(value);
        if (value) return AsyncStorage.setItem(key, value)
        else console.log('not set, stringify failed:', key, value)
    }

    createGame = gameName => {

        this.setState({showSpinner: true, errorMessage: null})
        this.mafiaGamesCollectionRef.doc(gameName).get().then(doc => {
            if (doc.exists) {
                this.setState({errorMessage: "Game name already exists", showSpinner: false})
            } else {
                this.setState({
                    createGame: false
                })

                doc.ref.set({
                    gameName: gameName,
                    roundInProgress: false,
                    votingInProgress: false,
                    roundNumber: 1
                })

                this.user.admin = true;
                this.selectGame(doc);
            }
        }).catch( (error) => {
            this.setState({errorMessage: "Error connecting, please try againnnn", showSpinner: false})
        });

    }

    joinGame = gameName => {
            this.setState({errorMessage: null, showSpinner: true})
            this.mafiaGamesCollectionRef.doc(gameName).get().then(doc => {
                if (doc.exists) {
                    if(!doc.data().gameInProgress) {
                        this.setState({showSpinner: false})
                        this.selectGame(doc);
                    }else{
                        this.setState({errorMessage: "This game has started", showSpinner: false})
                    }
                } else {
                    this.setState({errorMessage: "This game does not exist",  showSpinner: false})
                }
            }).catch ( error => {
                this.setState({errorMessage: "Error connecting, please try again",  showSpinner: false})
            });
    }

    resetModalFlags = () => {
        this.setState({hasPlayerSeenVotedOut : false})
    }

    selectGame = gameDoc => {
        this.setState({loadingGame: true})
        gameDoc = gameDoc.ref || gameDoc;

        //connect to the game doc and update state whenever it changes
        this.disconnectFromGame = gameDoc.onSnapshot(gameDocRef => {
            this.state.gameDocRef = gameDocRef;
            this.setState({
                gameDocRef
            })
            if(this.state.loadingGame){
                this.setState({loadingGame: false})
            }
            this.runGame();
            if(((this.state.gameDocRef && this.state.gameDocRef.data().roundNumber !== this.state.roundNumber)) &&
                (this.state.playerRef && this.state.playerRef.data() && !this.state.playerRef.data().admin)){
                this.resetModalFlags()
            }

        });

        let playersColRef = gameDoc.collection('players');

        //connect to the player collection and update when it changes
        this.disconnectFromPlayers = playersColRef.onSnapshot(playersSnapshot => {
            let playersArray = [];
            playersSnapshot.forEach(playerDoc => {
                playersArray.push(playerDoc.data())
            })

            this.setState({
                players: playersArray
            })

            this.runGame();
        })

        playersColRef.add(
            {
                type: null,
                inGame: true,
                ready: false,
                ...this.user
            }).then(playerDocRef => {
            playerDocRef.get().then(playerDoc => {

                this.setState({
                    playerRef: playerDocRef
                });

                this.disconnectFromPlayer = playerDoc.ref.onSnapshot(playerRef => {
                    this.setState({
                        playerRef: playerRef
                    })
                })
            })

        })
    }


    endGame = () => {
        this.resetState();
        this.disconnectFromGame();
        this.disconnectFromPlayer();
        this.disconnectFromPlayers();
    }

    leaveGame = () => {
        this.resetState()
        this.disconnectFromGame();
        this.disconnectFromPlayer();
        this.disconnectFromPlayers();
        this.state.playerRef.ref.delete();
    }

    playerReady = () => {
        this.state.playerRef.ref.update('ready', true);
    }

    runGame = () => {
        if(this.state.players && this.state.players.length) {
            if (this.state.playerRef && this.state.playerRef.data().admin && this.state.gameDocRef) {
                let game = this.state.gameDocRef.data();
                let playersInTheGame = this.state.players.filter(player => player.inGame);
                let playersHaveType= this.state.players.every(player => player.type);
                let allPlayersAreReady = playersInTheGame.every(player => player.ready);
                if (allPlayersAreReady) {
                    if(!game.gameInProgress && this.state.players.length > 2){
                        //setTypes only happens once in the game
                        this.setTypes();
                        this.state.gameDocRef.ref.update('gameInProgress', true);
                    }

                    if(game.gameInProgress && playersHaveType) {
                        this.startGameRound();
                        this.state.gameDocRef.ref.update('roundHasBegun', true, 'roundNumber', this.state.roundNumber + 1);
                    }
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
        let votingCount = {}

        inGamePlayers.forEach(player => {
            if(votingCount[player.votingFor]){
                votingCount[player.votingFor] = votingCount[player.votingFor] + 1
            } else {
                votingCount[player.votingFor] = 1
            }
        })

        let mostVoted;
        let mostVotedName;
        let drawArray = [];
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
                        playerDocRef.ref.update('inGame', false, 'votingFor', null)

                    }else {
                        playerDocRef.ref.update('votingFor', null)
                    }
                })
                this.state.gameDocRef.ref.update('votingInProgress', false, 'isDraw', null, 'votedOut', mostVotedName)
            })
        }

    }

    startGameRound = () => {
        this.state.gameDocRef.ref.update('roundInProgress', true, 'votedOut', null);
        this.setState({hasPlayerSeenVotedOut : false})
    }

    endRound = () => {
        this.state.gameDocRef.ref.collection('players').get().then( playerDocs => {
            playerDocs.forEach(playerDocRef => {
                playerDocRef.ref.update('ready', false)
            })
            this.state.gameDocRef.ref.update('roundInProgress' , false, 'votingInProgress' , true);
        })
    }

    setTypes = () => {
        let players = this.state.players;

        //if players dont have types
        if(players.every( player => player.type === null)){
            //no types are set
            let mafiaCount;
            switch (true){
                case (players.length < 5):
                    mafiaCount = 1;
                    break;
                case (players.length < 8):
                    mafiaCount = 2;
                    break;
                case (players.length < 11):
                    mafiaCount = 3;
                    break;
                case (players.length < 14):
                    mafiaCount = 4;
                    break;
                case (players.length < 16):
                    mafiaCount = 5;
                    break;
                default:
                    mafiaCount = 6;
                    break
            }

            while(mafiaCount){
                let rand = Math.floor(Math.random() * players.length);
                if(!players[rand].type){
                    players[rand].type = 'Mafia';
                    players.ready = false;
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
            })
        }
    }

render() {


        if(this.state.loadingGame){
            return(
                <LoadingScreen/>
            )
        }

        //player has a game
        if(this.state.gameDocRef) {

        let game = this.state.gameDocRef.data && this.state.gameDocRef.data();
        let player = this.state.playerRef && this.state.playerRef.data && this.state.playerRef.data();
        let players = this.state.players;

        return (
		<View>
			<ImageBackground source={background} style={{width: '100%', height: '100%'}}>
				<GameScreen
				game={game}
				voteMode={game.votingInProgress}
				players={players}
				currentPlayer={this.state.playerRef}
				playerReady={this.playerReady}
				endRound={this.endRound}
				leaveGame={this.leaveGame}
				endGame={this.endGame}
				player={player}
				hasPlayerSeenVotedOut={this.state.hasPlayerSeenVotedOut}
				playerHasSeenVotedOut={ () => this.setState({hasPlayerSeenVotedOut: true})}
				/>
			</ImageBackground>
		</View>

            )
        }

        if(!this.state.hasUser){
            return (
                <View style={styles.app}>
                    <ImageBackground source={ background } style={{width: '100%', height: '100%'}}>
                        <EnterNameScreen
                            updateName={name=>this.setState({inputUserName : name})}
                            inputUserName={this.state.inputUserName}
                            createUser={this.createUser}/>
                    </ImageBackground>

                </View>
            );
        }

        return (
            <View style={styles.app}>

                <ImageBackground source={ background } style={{width: '100%', height: '100%'}}>

                    <LobbyScreen
                        errorMessage={this.state.errorMessage}
                        createNewGame={() => { this.setState({createGame: true})}}
                        selectGame={this.selectGame}
                        joinGame={this.joinGame}
                        createGame={this.createGame}
                        showSpinner={this.state.showSpinner}
                        resetError={() => this.setState({errorMessage: null, showSpinner: false})}
                    />

                </ImageBackground>

            </View>
        );
    }
}
