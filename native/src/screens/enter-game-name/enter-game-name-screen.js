import React, { Component } from 'react';
import {Text, View, TextInput, TouchableHighlight, Image, TouchableOpacity} from 'react-native';
import styles from './../enter-name/enter-name-screen.styles.js';
import backBtn from '../../../resources/back-icon.png';
import okBtn from '../../../resources/ok-btn.png';
import mafiaLogo from '../../../resources/logo.png';
import mafiaText from '../../../resources/mafia-text.png';


class EnterGameNameScreen extends Component{
	render(){
		return(
			<View style={[styles.screen, styles['enter-name-screen']]}>

				<TouchableOpacity style={styles['back-btn-holder']} onPress={this.props.backToLobby}>
					<Image style={styles['back-btn']} source={backBtn}></Image>
				</TouchableOpacity>

				<Image style={styles['mafia-text']} source={mafiaText}></Image>

				<Image style={styles.logo} source={mafiaLogo}></Image>

				<View style={styles['form-holder']}>

					<View>
						<Text style={styles['input-title']}>Enter game name</Text>
					</View>

					<View>
						<TextInput style={styles['input-text-box']}
									  onChangeText={(text) => this.props.updateGameName(text)}
									  value={this.props.inputGameName}/>
					</View>

					<TouchableOpacity onPress={this.props.createGame}>
						<Image style={styles['ok-btn']} source={okBtn}></Image>
					</TouchableOpacity>
				</View>

			</View>
		)
	}
}

export default EnterGameNameScreen
