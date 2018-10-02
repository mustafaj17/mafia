import React, { Component } from 'react';
import {Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import styles from './enter-name-screen.styles.js';
import mafiaLogo from '../../../resources/mafia-logo.png';
import mafiaText from '../../../resources/mafia-text.png';

export default class EnterNameScreen extends Component{
    render(){
        return(
            <View style={[styles.screen, styles['enter-name-screen']]}>
					<Image style={styles['logo']} source={mafiaText}></Image>
					<Image style={styles['mafia-text-logo']} source={mafiaLogo}></Image>
					<View style={styles['form-holder']}>
						<View>
							<Text style={styles['input-title']}>Enter your name</Text>
						</View>
						<View><TextInput style={styles['input-text-box']}
							onChangeText={(text) => this.props.updateName(text)}
							value={this.props.inputUserName}
						/></View>
						<TouchableOpacity onPress={this.props.createUser}>
						<View style={styles['ok-btn']}>
							<Text >ok</Text>
						</View>
						</TouchableOpacity>
					</View>
				</View>
        )
    }
}
