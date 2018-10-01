//* eslint-disable */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './game-screen.styles';
import gunIcon from'../../assets/gun-icon';
import peaceIcon from'../../assets/peace-icon';
import Modal from '../../components/modal/modal'
import TimerCountdown from 'react-native-timer-countdown';
import backBtn from '../../assets/back-btn';
import SvgUri from 'react-native-svg-uri';

export default class GameScreen extends Component{

	constructor(){
		super()
		this.state = {
			hasPlayerSeenType: false,
			hasPlayerSeenVotedOut: false
		}
	}

	castVote = player => {
		if(!player.votingFor) {
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
				let stlyesArray = [];
				console.log('game:', game)
				if (isVoteMode && currentPlayer.inGame) {
					if (!isCurrentPlayer) {
						return (
							<TouchableOpacity
								style={currentPlayer.votingFor === player.name ? styles['player-selected'] : styles['player-vote']}
								onPress={() => this.castVote(player)}
							>
								<Text key={player.name} style={styles['game-text']}>{player.name}</Text>
							</TouchableOpacity>
						)
					}

				} else {

					stlyesArray.push(styles['player']);

					if(player.ready && !game.roundInProgress){
						stlyesArray.push(styles['player-ready'])
					}
					if(player.name === votedOut){
						stlyesArray.push(styles['player-out'])
					}

					if(isCurrentPlayer){
						stlyesArray.push(styles['current-player'])
					}

					return (
						<View style={stlyesArray}>
							<View style={styles['icon-name-container']}>
								{!isMafia && isCurrentPlayerCivilian && isCurrentPlayer && <SvgUri svgXmlData={peaceIcon}></SvgUri>}
								{isCurrentPlayerMafia && isMafia && <SvgUri svgXmlData={gunIcon}></SvgUri>}
								<Text key={player.name} style={styles['game-text']}>{player.name}</Text>
							</View>
							{player.ready && !game.roundInProgress && <Text key={player.name} style={styles['ready-text']}>ready</Text>}
						</View>
					)
				}
			}
		})

	}

	render(){
		const {game, currentPlayer, playerReady, endRound} = this.props
		const player = currentPlayer.data()
		console.log('current', currentPlayer.data())
		return(
			<View style={[styles['screen'], styles['lobby-screen']]}>
				{game.gameComplete && game.mafiasWin && <Modal mafia={true} text='Mafias win'/>}
				{game.gameComplete && game.civiliansWin && <Modal text='Civilians win'/>}
				{!game.gameInProgress && !player.ready &&
				<TouchableOpacity style={styles['back-btn']} onPress={this.props.leaveGame}>
					<SvgUri svgXmlData={backBtn}></SvgUri>
				</TouchableOpacity>
				}
				{!this.state.hasPlayerSeenType && player.type &&
				<Modal text="You're a civilian" onPressHandler={() => this.setState({hasPlayerSeenType: true})}/>
				}
				{!this.state.hasPlayerSeenVotedOut && game.votedOut &&
				<Modal text="My man got voted out" onPressHandler={() => this.setState({hasPlayerSeenVotedOut: true})}/>
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


					{game.isDraw && <div className="draw-game-text">There has been a draw between:</div>}
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
