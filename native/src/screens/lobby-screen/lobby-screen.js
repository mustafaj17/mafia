//* eslint-disable */
import React, { Component } from 'react';
import {View, Text, TouchableOpacity, Keyboard, Image, TextInput, Animated} from 'react-native';
import styles from './lobby-screen.styles';
import mafiaText from '../../../resources/mafia-text.png';
import info from '../../../resources/info.png';
import backBtnIcon from '../../../resources/back-icon.png';
import InfoModal from '../../components/infoModal/infoModal'
import logo from '../../../resources/logo.png';

export default class LobbyScreen extends Component{

	state = {
		gameName : '',
		viewInfoModal: false,
		textOpacity: new Animated.Value(1),
		inputOpacity: new Animated.Value(0),
		joinGameTranslationY: new Animated.Value(0),
		logoTranslationY: new Animated.Value(0),
		uiInputMode: false,
		joinGameSelected: false
	}

	runAnimation() {
		if(this.state.uiInputMode){
			Animated.sequence([
				Animated.parallel([
					// after decay, in parallel:
					Animated.timing(this.state.joinGameTranslationY, {
						// and twirl
						toValue: 0,
						duration: 500
					}),
					Animated.timing(this.state.logoTranslationY, {
						// and twirl
						toValue: 0,
						duration: 500
					}),
					Animated.timing(this.state.textOpacity, {
						// and twirl
						toValue: 1,
						duration: 500
					}),
					Animated.timing(this.state.inputOpacity, {
						// and twirl
						toValue: 0,
						duration: 500
					}),
				]),
			]).start()

			this.setState({uiInputMode: false})
		}else {
			Animated.sequence([
				Animated.parallel([
					// after decay, in parallel:
					Animated.timing(this.state.joinGameTranslationY, {
						// and twirl
						toValue: 50,
						duration: 500
					}),
					Animated.timing(this.state.logoTranslationY, {
						// and twirl
						toValue: -50,
						duration: 500
					}),
					Animated.timing(this.state.textOpacity, {
						// and twirl
						toValue: 0,
						duration: 500
					}),
					Animated.timing(this.state.inputOpacity, {
						// and twirl
						toValue: 1,
						duration: 500
					}),
				]),
			]).start()
			this.setState({uiInputMode: true})
		}
	}

	startGame = () => {
		this.setState({joinGameSelected: false})

		this.runAnimation();

		setTimeout(() => {
			this.textInput.focus();
		}, 500)

	}

	createGame = () => {
		this.setState({joinGameSelected: true})
		this.runAnimation();
		setTimeout( () => {
			this.textInput.focus();
		}, 500)

	}

	handleBackBtnPress = () => {
		if(this.state.uiInputMode) {
			this.props.resetError();
			Keyboard.dismiss();
			this.runAnimation();
		}
	}

	startOrJoin = () => {
		if(this.state.gameName.length > 2) {
			Keyboard.dismiss();
			if (this.state.joinGameSelected) {
				this.props.joinGame(this.state.gameName)
			} else {
				this.props.createGame(this.state.gameName)
			}
		}
	}

	render(){

		return(
			<View style={styles['lobby-screen']}>
				{this.state.viewInfoModal && <InfoModal onPressHandler={ () => this.setState({viewInfoModal: false}) } />}

				<View style={[styles['button-container'], styles['button-container--top']]}>

					<Animated.View  style={{zIndex: this.state.inputOpacity, display: 'flex', alignItems: 'center'} }>
						{this.props.errorMessage && <View style={styles['error-view']}><Text style={styles['error-text']}>{this.props.errorMessage}</Text></View>}
						{this.props.showSpinner && <View style={styles['error-view']}><Text style={styles['error-text']}>Loading</Text></View>}

						<Animated.View  style={
							{
								opacity: this.state.inputOpacity
							}
						}>
							<TextInput style={styles['input-box']}
										  onChangeText={(text) => this.setState({ gameName : text})}
										  editable={this.state.uiInputMode}
										  disable={!this.state.uiInputMode}
										  value={this.state.gameName}
										  placeholder='Enter game ID'
										  ref={ elem => this.textInput = elem }/>

						</Animated.View>


						{this.state.uiInputMode &&
						<Animated.View  style={
							{	zIndex: this.state.inputOpacity,
								opacity: this.state.inputOpacity,
								marginTop:20
							}}>

							<TouchableOpacity onPress={this.startOrJoin} editable={!this.state.uiInputMode}>
								<View style={styles['go-btn']}>
									<Text style={{fontSize: 18, letterSpacing: 2}}>Go</Text>
								</View>
							</TouchableOpacity>

						</Animated.View>}

					</Animated.View>

					<Animated.View  style={
						{	zIndex: this.state.textOpacity,
							opacity: this.state.textOpacity,
						}}>

						<TouchableOpacity style={styles['text-box-touch']} onPress={this.createGame}>

							<Text style={styles['text-box']}>Join Game</Text>
						</TouchableOpacity>


					</Animated.View>

				</View>

				<Animated.View  style={
					{transform: [
							{ translateY: this.state.logoTranslationY }
						]}}>
					<View style={styles['logo-container']}>

						<Image style={styles.logo} source={logo}></Image>
						<Image style={styles['mafia-text']} source={mafiaText}></Image>

					</View>
				</Animated.View>

				<View style={[styles['button-container'], styles['button-container--bottom']]}>
					<Animated.View  style={
						{	zIndex: this.state.textOpacity,
							opacity: this.state.textOpacity,
						}}>

						<TouchableOpacity style={styles['text-box-touch']} onPress={this.startGame}>
							<Text style={styles['text-box']}>Start New Game</Text>
						</TouchableOpacity>

					</Animated.View>
				</View>


				{ this.state.uiInputMode
					?
					<TouchableOpacity style={styles['back-btn']} onPress={ this.handleBackBtnPress }>
						<Image style={styles['back-icon']} source={backBtnIcon}></Image>
					</TouchableOpacity>
					:
					<TouchableOpacity style={styles['info']} onPress={ () => this.setState({viewInfoModal: true}) }>
						<Image style={styles['info-img']} source={info}></Image>
					</TouchableOpacity>
				}
			</View>
		)
	}
}
