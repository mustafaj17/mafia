import firebase from 'firebase/app';
import 'firebase/firestore';
import React, {Component} from 'react';
import { Text, View, ImageBackground, AsyncStorage, Image} from 'react-native';
import LobbyScreen from "./src/screens/lobby-screen/lobby-screen";
import GameScreen from "./src/screens/game-screen/game-screen";
import EnterNameScreen from "./src/screens/enter-name/enter-name-screen";
import styles from './src/app.style';
import background from './resources/background.png';
import backgroundLobby from './resources/background-lobby.png';
import LoadingSpinner from "./src/components/loadingSpinner/loadingSpinner";


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
			inputGameName: ''
		}
	}

	getUsername = async () => {
		try {
			let value = await AsyncStorage.getItem('@Mafia:username');
			if (value !== null) {
				value = JSON.parse(value);
				this.user.name = value;
				this.setState({hasUser: true, inputUserName: value})
			}else{
				this.setState({hasUser: false})
			}
		} catch (error) {
			return 'error';
		}
	}

	componentWillMount() {
		// this.getGames()
	}

	componentWillUnmount() {
		// window.removeEventListener("beforeunload", this.onUnload)
	}

	// onUnload = (event) => { // the method that will be used for both add and remove event
	//
	// 	if(this.state.gameDocRef) {
	// 		let playersColRef = this.state.gameDocRef.ref.collection('players')
	// 		playersColRef.onSnapshot(playersSnapshot => {
	// 				playersSnapshot.forEach(playerDoc => {
	// 					if (playerDoc.data().name === this.user.name) {
	// 						//todo: remove player
	// 					}
	// 				})
	// 			}
	// 		)
	// 	}
	// 	event.returnValue = "player left"
	// 	// when admin leaves game, select another admin from the list of players.
	// 	// when normal player closes window, we must delete them from the player collection.
	// }

	getGames = () => {
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
		this.setState({
			hasUser: true
		})
		this.user.name =this.state.inputUserName;
		this.set('@Mafia:username', this.state.inputUserName);
	}

	set = (key, value) => {
		value = JSON.stringify(value);
		if (value) return AsyncStorage.setItem(key, value)
		else console.log('not set, stringify failed:', key, value)
	}

	createGame = gameName => {
		this.mafiaGamesCollectionRef.doc(gameName).get().then(doc => {
			if (doc.exists) {
				//cant create game
				//TODO: tell the user
			} else {
				this.setState({
					createGame: false,
					joiningGame: true
				})

				doc.ref.set({
					gameName: gameName,
					roundInProgress: false,
					votingInProgress: false
				})

				this.user.admin = true;
				this.selectGame(doc);
			}
		}).catch( error => {
			//TODO: tell user
		});

	}

	selectGame = gameDoc => {
		this.setState({
			joiningGame: true
		})

		gameDoc = gameDoc.ref || gameDoc;

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
				if (playerDocRef.data().name === this.state.inputUserName) {
					if(playerDocRef.data().admin){
						this.user.admin = true;
					}
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

	endGame = () => {
		this.disconnectFromGame();
		this.setState({gameDocRef: null, players: null, playerRef: null, joiningGame: false});
		this.getGames();
	}

	leaveGame = () => {
		this.disconnectFromGame();
		this.state.playerRef.ref.delete();
		this.setState({gameDocRef: null, players: null, playerRef: null, joiningGame: false});
		this.getGames();
	}

	playerReady = () => {
		this.state.playerRef.ref.update('ready', true);
	}

	runGame = () => {
		if(this.state.players && this.state.players.length) {
			if (this.user && this.user.admin && this.state.gameDocRef) {
				let game = this.state.gameDocRef.data();
				let playersInTheGame = this.state.players.filter(player => player.inGame);
				let playersHaveType= this.state.players.every(player => player.type);
				let allPlayersAreReady = playersInTheGame.every(player => player.ready);
				if (allPlayersAreReady) {
					if(!game.gameInProgress){
						this.state.gameDocRef.ref.update('gameInProgress', true);
					}
					this.setTypes();
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
				this.state.gameDocRef.ref.update('votingInProgress', false, 'isDraw', null, 'votedOut', mostVotedName)
			})
		}

	}

	startGameRound = (allPlayersAreReady, playersHaveType) => {
		if (allPlayersAreReady && playersHaveType) {
			this.state.gameDocRef.ref.update('roundInProgress', true, 'votedOut', null);
		}
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
			})
		}
	}

	joinGame = gameName => {
		if(gameName.length > 3){
			this.mafiaGamesCollectionRef.doc(gameName).get().then(doc => {
				if (doc.exists) {
					this.selectGame(doc);
				} else {
					//TODO: tell the user
				}
			}).catch ( error => {
				//TODO: tell the user
			});
		}
	}

	render() {

		if(this.state.joiningGame){
			return(
				<View>
					<ImageBackground source={background} style={styles.background}>
						<LoadingSpinner/>
						<Text style={styles['loading-text']}>Loading...</Text>
					</ImageBackground>
				</View>
			)
		}

		if(this.state.gameDocRef) {

			let game = this.state.gameDocRef.data && this.state.gameDocRef.data();
			let player = this.state.playerRef && this.state.playerRef.data && this.state.playerRef.data();
			let players = this.state.players;
			if(!player || !game){
				return(
					<View>
						<ImageBackground source={background} style={styles.background}>
							<LoadingSpinner/>
							<Text style={styles['loading-text']}>Loading...</Text>
						</ImageBackground>
					</View>
				)
			}
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
						createNewGame={() => { this.setState({createGame: true})}}
						selectGame={this.selectGame}
						joinGame={this.joinGame}
						createGame={this.createGame}
					/>

				</ImageBackground>

			</View>
		);
	}
}
