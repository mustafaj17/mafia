import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './confirmModal.styles';
import FadeIn from '../../components/fadeIn/fadeIn';

class ConfirmModal extends Component{
	render(){
		return(
			<View style={styles.modal}>
				<View style={styles['modal-box']}>

					<View style={styles.title}>
						<Text style={styles['title-text']}>Are you sure you want to leave the game?</Text>
					</View>


					<View style={styles['button-holder']}>
						<TouchableOpacity onPress={this.props.yesHandler}>
							<View style={styles['yes-btn']}>
								<Text style={styles['btn-txt']}>Yes</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity onPress={this.props.noHandler}>
							<View style={styles['no-btn']}>
								<Text style={styles['btn-txt']}>No</Text>
							</View>
						</TouchableOpacity>
					</View>

				</View>

			</View>
		)
	}
}

export default FadeIn(ConfirmModal);
