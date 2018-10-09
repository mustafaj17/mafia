//* eslint-disable */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import styles from './lobby-screen.styles';
import mafiaText from '../../../resources/mafia-text.png';
import info from '../../../resources/info.png';
import InfoModal from '../../components/infoModal/infoModal'
import plusIcon from '../../../resources/plus-icon.png';
import logo from '../../../resources/logo.png';
// import Modal from "../../components/modal/modal";

export default class LobbyScreen extends Component{

	state = {
		gameName : '',
		viewInfoModal: false,
	}

	render(){

		return(
			<View style={[styles['screen'], styles['lobby-screen']]}>
				{this.state.viewInfoModal && <InfoModal onPressHandler={ () => this.setState({viewInfoModal: false}) } />}

				<View style={styles['button-container']}>
					<Text style={styles['text-box']}>Join Game</Text>
					<TextInput style={styles['input-box']}
								  onChangeText={(text) => this.setState({ gameName : text})}
								  value={this.state.gameName}
								  placeholder='Enter game ID'/>
				</View>

				<View style={styles['logo-container']}>

				<Image style={styles.logo} source={logo}></Image>

				</View>

				<View style={styles['button-container']}>
					<Text style={styles['text-box']}>Start New Game</Text>
				</View>


				<TouchableOpacity style={styles['info']} onPress={ () => this.setState({viewInfoModal: true}) }>
					<Image style={styles['info-img']} source={info}></Image>
				</TouchableOpacity>
			</View>
		)
	}
}
