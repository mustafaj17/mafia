import React, { Component } from 'react';
import {Text, View, TextInput, Image} from 'react-native';
import styles from './enter-name-screen.styles.js';
import mafiaLogo from '../../assets/mafia-logo.png';
import background from '../../assets/background.png';

export default class EnterNameScreen extends Component{
    render(){
        return(
            <View style={[styles.screen, styles['enter-name-screen']]}>
					<Image style={styles.background} source={background}/>
					<Image source={mafiaLogo}/>
					<View style={styles['form-holder']}>
						<View>
							<Text style={styles['input-title']}>Enter your name</Text>
						</View>
						<View><TextInput style={styles['input-text-box']}
							onChangeText={(text) => this.props.updateName({text})}
							value={this.props.inputUserName}
						/></View>

						<View style={styles['ok-btn']}>
							<Text>ok</Text>
						</View>
					</View>
				</View>
        )
    }
}
