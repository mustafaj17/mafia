import React, { Component } from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import styles from './../enter-name/enter-name-screen.styles.js';
import backBtn from '../../../resources/back-icon.png';
import mafiaLogo from '../../../resources/logo.png';
import mafiaText from '../../../resources/mafia-text.png';


class EnterGameNameScreen extends Component{
	render(){
		return(
			<View style={[styles.screen, styles['enter-name-screen']]}>

				<TouchableOpacity style={styles['back-btn']} onPress={this.props.backToLobby}>
					<Image source={backBtn}></Image>
				</TouchableOpacity>

				<View stlye={styles['mafia-text-logo']} >
					<Image source={mafiaText}></Image>
				</View>

				<View stlye={styles.logo}>
					<Image source={mafiaLogo}></Image>
				</View>

				<View style={styles['form-holder']}>

					<View>
						<Text style={styles['input-title']}>Enter game name</Text>
					</View>

					<View>
						<TextInput style={styles['input-text-box']}
										  onChangeText={(text) => this.props.updateGameName(text)}
										  value={this.props.inputGameName}
					/></View>

					<TouchableOpacity onPress={this.props.createGame}>
						<View style={styles['ok-btn']}>
							<Text >ok</Text>
						</View>
					</TouchableOpacity>

				</View>
			</View>
		)
	}
}

export default EnterGameNameScreen
