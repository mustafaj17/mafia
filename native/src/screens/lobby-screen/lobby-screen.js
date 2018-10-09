//* eslint-disable */
import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Image, TextInput, Animated} from 'react-native';
import styles from './lobby-screen.styles';
import mafiaText from '../../../resources/mafia-text.png';
import info from '../../../resources/info.png';
import InfoModal from '../../components/infoModal/infoModal'
import plusIcon from '../../../resources/plus-icon.png';
import logo from '../../../resources/logo.png';
// import Modal from "../../components/modal/modal";

export default class LobbyScreen extends Component{

	state = {
		gameName : '',
		viewInfoModal: false,
		textRotation: new Animated.Value(0),
		inputBoxRotation: new Animated.Value(1),
		textOpacity: new Animated.Value(1),
		inputOpacity: new Animated.Value(0)
	}

	runAnimation() {
		Animated.sequence([
			Animated.parallel([
				// after decay, in parallel:
				Animated.timing(this.state.textRotation, {
					toValue: 1,                   // Animate to opacity: 1 (opaque)
					duration: 200,
				}),
				Animated.timing(this.state.inputBoxRotation, {
					// and twirl
					toValue: 2,
					duration: 200
				}),
				Animated.timing(this.state.textOpacity, {
					// and twirl
					toValue: 0,
					duration: 300
				}),
				Animated.timing(this.state.inputOpacity, {
					// and twirl
					toValue: 1,
					duration: 300
				}),
			]),
		]).start()
	}

	joinGame = () => {
		this.textInput.focus();
		this.runAnimation();

	}

	render(){

		const textBoxRotation = this.state.textRotation.interpolate({
			inputRange: [0, 1, 2],
			outputRange: ['0deg', '180deg', '360deg']
		})


		const inputBoxRotation = this.state.inputBoxRotation.interpolate({
			inputRange: [0, 1, 2],
			outputRange: ['0deg', '180deg', '360deg']
		})

		return(
			<View style={[styles['screen'], styles['lobby-screen']]}>
				{this.state.viewInfoModal && <InfoModal onPressHandler={ () => this.setState({viewInfoModal: false}) } />}
				<View style={styles['button-container']}>


					<View style={styles['button-mid']}>

						<Animated.View  style={

							{	zIndex: 1,
								opacity: this.state.textOpacity,
								transform: [
									{ rotateX: textBoxRotation},
									{ perspective: 1000}
								]}}>
							<TouchableOpacity style={styles['text-box-touch']} onPress={this.joinGame}>
								<Text style={styles['text-box']}>Join Game</Text>
							</TouchableOpacity>
						</Animated.View>

						<Animated.View  style={
							{	zIndex: -1,
								opacity: this.state.inputOpacity,
								transform: [
									{ rotateX: inputBoxRotation},
									{ perspective: 1000}
								]}}>
							<TextInput style={styles['input-box']}
										  onChangeText={(text) => this.setState({ gameName : text})}
										  value={this.state.gameName}
										  placeholder='Enter game ID'
										  ref={ elem => this.textInput = elem }/>
						</Animated.View>
					</View>

				</View>

				<View style={styles['logo-container']}>

					<Image style={styles.logo} source={logo}></Image>

				</View>

				<View style={styles['button-container']}>
					<TouchableOpacity style={styles['text-box-touch']} onPress={this.joinGame}>
						<Text style={styles['text-box']}>Start New Game</Text>
					</TouchableOpacity>
				</View>


				<TouchableOpacity style={styles['info']} onPress={ () => this.setState({viewInfoModal: true}) }>
					<Image style={styles['info-img']} source={info}></Image>
				</TouchableOpacity>
			</View>
		)
	}
}
