//* eslint-disable */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './game-screen.styles';
import gunIcon from '../../../resources/gun-icon.png';
import peaceIcon from '../../../resources/civilian-icon.png';
import Modal from '../../components/modal/modal'
import TimerCountdown from 'react-native-timer-countdown';
import backBtn from '../../../resources/back-icon.png';

export default class GameScreen extends Component{

	constructor(){
		super()
		this.state = {
			hasPlayerSeenType: false,
			hasPlayerSeenVotedOut: false
		}
	}

	castVote = (currentPlayer, player) => {
		if(!currentPlayer.votingFor) {
			this.setState({hasPlayerSeenVotedOut: false});
			this.props.currentPlayer.ref.update('votingFor', player.name)
		}
	}

	getPlayers = () => {
		const { players, game } = this.props;
		let currentPlayer = this.props.currentPlayer.data();

		return players.map(player => {
			if(player.inGame) {
				console.log(player)
				let isVoteMode = this.props.voteMode;
				let isCurrentPlayer = currentPlayer.name === player.name;
				let isCurrentPlayerMafia = currentPlayer.type === 'Mafia';
				let isCurrentPlayerCivilian = currentPlayer.type === 'Civilian';
				let isMafia = player.type === 'Mafia';
				let votedOut = game.votedOut;
				let stylesArray = [];
				console.log('game:', game)
				if (isVoteMode && currentPlayer.inGame) {
					if (!isCurrentPlayer) {
						return (
							<TouchableOpacity
								style={currentPlayer.votingFor === player.name ? styles['player-selected'] : styles['player-vote']}
								onPress={() => this.castVote(currentPlayer, player)}
							>
								<Text key={player.name} style={styles['game-text']}>{player.name}</Text>
							</TouchableOpacity>
						)
					}

				} else {

					stylesArray.push(styles['player']);

					if(player.ready && !game.roundInProgress){
						stylesArray.push(styles['player-ready'])
					}
					if(player.name === votedOut){
						stylesArray.push(styles['player-out'])
					}

					if(isCurrentPlayer){
						stylesArray.push(styles['current-player'])
					}

					return (
						<View style={stylesArray}>
							<View style={styles['icon-name-container']}>

								{!isMafia &&
								isCurrentPlayerCivilian &&
								isCurrentPlayer &&
								<Image resizeMode="contain" style={styles['type-icon']} source={peaceIcon}></Image>}

								{isCurrentPlayerMafia &&
								isMafia &&
								<Image resizeMode="contain" style={styles['type-icon']} source={gunIcon}></Image>}

								<Text key={player.name} style={styles['game-text']}>{player.name}</Text>

							</View>
							{player.ready && !game.roundInProgress && <Text key={player.name} style={styles['ready-text']}>ready</Text>}
						</View>
					)
				}
			}
		})
	}

	getPlayerType = (playerName) => {
		let type;
		this.props.players.forEach(player => {
			if(player.name === playerName){
				type = player.type;
			}
		})
		return type;
	}


	render(){
		const {game, currentPlayer, playerReady, endRound} = this.props
		const player = currentPlayer.data()
		console.log('current', currentPlayer.data())
		return(
			<View style={[styles['screen'], styles['game-screen']]}>
				{game.gameComplete && game.mafiasWin && <Modal mafia={true} text='Mafias win' onPressHandler={() => this.props.endGame()} />}
				{game.gameComplete && game.civiliansWin && <Modal text='Civilians win' onPressHandler={ () => this.props.endGame() } />}
				{!game.gameInProgress && !player.ready &&
				<TouchableOpacity style={styles['back-btn-holder']} onPress={this.props.leaveGame}>
					<Image style={styles['back-btn']} source={backBtn}></Image>
				</TouchableOpacity>
				}
				{!this.state.hasPlayerSeenType && player.type &&
				<Modal text={"You're a " + player.type } mafia={player.type === 'Mafia'} onPressHandler={() => this.setState({hasPlayerSeenType: true})}/>
				}
				{!this.state.hasPlayerSeenVotedOut && game.votedOut &&
				<Modal text={game.votedOut} mafia={this.getPlayerType(game.votedOut) === 'Mafia'} subText={'was voted out'} onPressHandler={() => this.setState({hasPlayerSeenVotedOut: true})}/>
				}


				<View style={styles['title-container']}>
					<View >
						<Text style={styles['header']}>{game.gameName}</Text>
					</View>
					{game.votingInProgress && !player.votingFor && <Text className='header'>please vote</Text>}
					{game.votingInProgress && player.votingFor &&<Text className='header'> Waiting for others to vote...</Text>}
					{game.roundInProgress &&
					<TimerCountdown
						initialSecondsRemaining={1000*5}
						onTick={secondsRemaining => console.log('tick', secondsRemaining)}
						onTimeElapsed={endRound}
						allowFontScaling={true}
						style={{ fontSize: 20 }}
					/>}


					{game.isDraw && <Text style={styles['draw-game-text']}>There has been a draw between:</Text>}
					{game.isDraw &&
					<View>
						{game.isDraw.map(player =>{return(
							<View style={styles['player']}>
								<Text>{player}</Text>
							</View>
						)})
						}
					</View>}

					<View style={styles['games']}>
						{this.getPlayers()}
					</View>
				</View>

				{player.inGame &&
				!player.ready &&
				!game.gameComplete &&
				!game.votingInProgress &&
				<TouchableOpacity onPress={playerReady} style={styles['ready-button']}>
					<Text>ready</Text>
				</TouchableOpacity>
				}
			</View>
		)
	}
}
