import React, { Component } from 'react';
import {Text, View, TextInput, Image, TouchableOpacity} from 'react-native';
import styles from './../enter-name/enter-name-screen.styles.js';
import mafiaLogo from '../../assets/mafia-logo.png';
import mafiaText from '../../assets/mafia-text.png';

class EnterGameNameScreen extends Component{
    render(){
        return(
			  <View style={[styles.screen, styles['new-game-screen']]}>
				  <Image style={styles['logo']} source={mafiaText}></Image>
				  <Image style={styles['mafia-text-logo']} source={mafiaLogo}></Image>
				  <View style={styles['form-holder']}>
					  <View>
						  <Text style={styles['input-title']}>Enter game name</Text>
					  </View>
					  <View><TextInput style={styles['input-text-box']}
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