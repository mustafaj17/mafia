import React, { Component } from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import styles from './../enter-name/enter-name-screen.styles.js';
import backBtn from '../../assets/back-btn';
import mafiaLogo from '../../assets/logo';
import mafiaText from '../../assets/mafia-text';
import Image from 'react-native-remote-svg';
import SvgUri from 'react-native-svg-uri';


class EnterGameNameScreen extends Component{
	render(){
		return(
			<View style={[styles.screen, styles['enter-name-screen']]}>

				<TouchableOpacity style={styles['back-btn']} onPress={this.props.backToLobby}>
					<SvgUri svgXmlData={backBtn}></SvgUri>
				</TouchableOpacity>

				<View stlye={styles['mafia-text-logo']} >
					<SvgUri svgXmlData={mafiaText}></SvgUri>
				</View>

				<View stlye={styles.logo}>
					<SvgUri svgXmlData={mafiaLogo}></SvgUri>
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
