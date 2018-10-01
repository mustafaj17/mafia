//* eslint-disable */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './lobby-screen.styles';
import mafiaText from '../../assets/loading1';
// import plusIcon from '../../assets/start-game-btn';
import Modal from "../../components/modal/modal";
import LoadingSpinner from '../../assets/loading1';
import Image from 'react-native-remote-svg';
import SvgUri from 'react-native-svg-uri';

export default class LobbyScreen extends Component{

	getGames = (games) => {
		console.log('games', games);
		return games.filter(gameDoc => !gameDoc.data().gameInProgress).map(gameDoc => {
			return ( <TouchableOpacity onPress={() => this.props.selectGame(gameDoc)}>
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

			<LoadingSpinner/>

				<View style={styles['title-container']}>
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
                        <View ><Text style={styles['new-game-btn-text']}>start new game</Text></View>
					</TouchableOpacity>

				</View>
			</View>
		)
	}
}
