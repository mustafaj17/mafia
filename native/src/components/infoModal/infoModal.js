import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './infoModal.styles';
import gunIcon from '../../../resources/gun-icon.png';
import peaceIcon from '../../../resources/civilian-icon.png';

export default class InfoModal extends Component{
	render(){
		return(
			<View style={styles.modal}>
				<View style={styles['modal-box']}>
					<View style={styles.title}>
						<Text style={styles['title-text']}>Game Rules</Text>
					</View>
                    <View style={styles.titleSub}>
                        <Text style={styles['sub-text']}>You will need a minimum of 3 players</Text>
                        <Text style={styles['sub-text']}>Once all players in a game are ready,
							they will be assigned with one of the following types:</Text>
						<Text style={styles['sub-text-center']}>Mafia {<Image style={styles.icon} source={gunIcon}></Image>}     Civilian {<Image style={styles.icon} source={peaceIcon}></Image>}</Text>
                        <Text style={styles['sub-text']}>Mafia's will be able to see other Mafia players on their game screen</Text>
                        <Text style={styles['sub-text']}>The Civilian's will not know each other, and will now need to suss out the Mafia without losing the game</Text>
                        <Text style={styles['sub-text']}>Once the game timer is up, it'll be time to vote out who you think the Mafia is, be careful though...</Text>
                        <Text style={styles['sub-text']}>Probably need to explain more or better</Text>
					</View>
                    <TouchableOpacity onPress={this.props.onPressHandler}>
                        <View style={styles['ok-btn']}>
                            <Text style={styles['ok-btn-txt']}>ok</Text>
                        </View>
                    </TouchableOpacity>
				</View>
			</View>
		)
	}
}
