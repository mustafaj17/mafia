//* eslint-disable */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from './lobby-screen.styles';
import mafiaText from '../../../resources/mafia-text.png';
import info from '../../../resources/info.png';
import InfoModal from '../../components/infoModal/infoModal'
import plusIcon from '../../../resources/plus-icon.png';
// import Modal from "../../components/modal/modal";

export default class LobbyScreen extends Component{

	state = {
		gameName : '',
		viewInfoModal: false,
	}

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

		return(
			<View style={[styles['screen'], styles['lobby-screen']]}>
				{this.state.viewInfoModal && <InfoModal onPressHandler={ () => this.setState({viewInfoModal: false}) } />}
				<View style={styles['title-container']}>
					<Image style={styles['mafia-text']} source={mafiaText}></Image>
				</View>

				<View style={styles['join-game-container']}>
					<TextInput style={styles['input-text-box']}
								  onChangeText={(text) => this.setState({ gameName : text})}
								  value={this.state.gameName}
									placeholder='Enter game ID'/>
					<TouchableOpacity style={styles['join-game']} onPress={() => this.props.joinGame(this.state.gameName)}>
						<View style={styles['join-game-btn']}>
							<Text style={styles['join-game-btn-text']}>join game</Text>
						</View>
					</TouchableOpacity>

					<TouchableOpacity style={styles['join-game']} onPress={() => this.props.createGame(this.state.gameName)}>
						<View style={styles['join-game-btn']}>
							<Text style={styles['join-game-btn-text']}>start new game</Text>
						</View>
					</TouchableOpacity>
				</View>
                <TouchableOpacity style={styles['info']} onPress={ () => this.setState({viewInfoModal: true}) }>
                	<Image style={styles['info-img']} source={info}></Image>
				</TouchableOpacity>
			</View>
		)
	}
}
