import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './modal.styles';
import gunIcon from '../../../resources/gun-icon.png';
import peaceIcon from '../../../resources/civilian-icon.png';

export default class Modal extends Component{
	render(){
		return(
			<View style={styles.modal}>
				<View style={styles['modal-box']}>
					<View style={styles.title}>
						<Text style={styles['title-text']}>{this.props.text}</Text>
					</View>
					<Image style={styles.icon} source={this.props.mafia ? gunIcon : peaceIcon}></Image>
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
