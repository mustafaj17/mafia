import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import styles from './infoModal.styles';
import gunIcon from '../../../resources/gun-icon.png';
import peaceIcon from '../../../resources/civilian-icon.png';
import FadeIn from '../../components/fadeIn/fadeIn';

class InfoModal extends Component{
	render(){
		return(

				<View style={styles.modal}>
					<View style={styles.modal}>
						<View style={styles['modal-box']}>
							<View style={styles.title}>
								<Text style={styles['title-text']}>How to play</Text>
							</View>
							<View style={styles.titleSub}>
								<Text style={styles['sub-text']}>You will need a minimum of 3 players</Text>
								<Text style={styles['sub-text']}>When all players are ready,
									each player will receive a type:</Text>
								<View style={styles.centerIcons}>
									<Text style={styles['sub-text-center']}>Mafia</Text>
									<Image style={styles.icon} source={gunIcon} resizeMode='contain'/>
									<Text style={styles['sub-text-center']}>Civilian</Text>
									<Image style={styles.icon} source={peaceIcon} />
								</View>
								<Text style={styles['sub-text']}>Mafias will see other Mafia players on their game screen</Text>
								<Text style={styles['sub-text']}>Civilians will not know each other</Text>
								<Text style={styles['sub-text']}>Hit ready again and play!</Text>
								<Text style={styles['sub-text']}>Once the time is up, you will need to vote out who you think the Mafia is, then go again until someone wins</Text>
								<Text style={styles['sub-text']}>Remember, Mafias are meant to lie...</Text>
							</View>
							<TouchableOpacity onPress={this.props.onPressHandler}>
								<View style={styles['ok-btn']}>
									<Text style={styles['ok-btn-txt']}>ok</Text>
								</View>
							</TouchableOpacity>
						</View>
					</View>
				</View>
		)
	}
}

export default FadeIn(InfoModal);
