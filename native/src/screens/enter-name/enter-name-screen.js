import React, { Component } from 'react';
import {Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import styles from './enter-name-screen.styles.js';
import mafiaLogo from '../../assets/logo';
import mafiaText from '../../assets/mafia-text';
import SvgUri from 'react-native-svg-uri';

export default class EnterNameScreen extends Component{
    render(){
        return(
            <View style={[styles.screen, styles['enter-name-screen']]}>
					<SvgUri style={styles['logo']} svgXmlData={mafiaText}></SvgUri>
					<SvgUri style={styles['mafia-text-logo']} svgXmlData={mafiaLogo}></SvgUri>
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
