import React, { Component } from 'react';
import {Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import styles from './enter-name-screen.styles.js';
import mafiaLogo from '../../../resources/logo.png';
import mafiaText from '../../../resources/mafia-text.png';
import okBtn from '../../../resources/ok-btn.png';

export default class EnterNameScreen extends Component{
    render(){
        return(
            <View style={[styles.screen, styles['enter-name-screen']]}>
					<Image style={styles['mafia-text']} source={mafiaText}></Image>
					<Image style={styles['logo']} source={mafiaLogo}></Image>
					<View style={styles['form-holder']}>
						<View>
							<Text style={styles['input-title']}>Enter your name</Text>
						</View>
						<View><TextInput style={styles['input-text-box']}
							onChangeText={(text) => this.props.updateName(text)}
							value={this.props.inputUserName}
						/></View>
						<TouchableOpacity onPress={this.props.createUser}>
							<Image style={styles['ok-btn']} source={okBtn}></Image>
						</TouchableOpacity>
					</View>
				</View>
        )
    }
}
