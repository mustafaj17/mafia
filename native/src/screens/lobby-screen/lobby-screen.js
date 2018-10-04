//* eslint-disable */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './lobby-screen.styles';
import mafiaText from '../../../resources/mafia-text.png';
import plusIcon from '../../../resources/plus-icon.png';
// import Modal from "../../components/modal/modal";

export default class LobbyScreen extends Component{

	getGames = (games) => {
		console.log('games', games);
		return games.filter(gameDoc => !gameDoc.data().gameInProgress).map(gameDoc => {
			return ( <TouchableOpacity key={gameDoc.id} onPress={() => this.props.selectGame(gameDoc)}>
				<View style={styles['game']}>
					<Text style={styles['game-text']}>{gameDoc.data().gameName}</Text>
				</View>
			</TouchableOpacity>)
		});
	}
	render(){
		const {createNewGame, games} = this.props
		console.log(games)

		console.log(this.props)
		return(
			<View style={[styles['screen'], styles['lobby-screen']]}>

				<View style={styles['title-container']}>
					<Image style={styles['mafia-text']} source={mafiaText}></Image>
					<View >
						<Text style={styles['header']}>Select game</Text>
					</View>
					<View style={styles['games']}>
						{games.length ? this.getGames(games) :
							<View>
								<Text>Loading games...</Text>
							</View>
						}
					</View>
				</View>
				<View style={styles['create-game-container']}>
					<TouchableOpacity style={styles['new-game']} onPress={createNewGame}>
						<Image style={styles['create-game-button']} source={plusIcon}></Image>
					</TouchableOpacity>
					<View ><Text style={styles['new-game-btn-text']}>start new game</Text></View>
				</View>
			</View>
		)
	}
}
