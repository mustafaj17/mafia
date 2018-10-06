import React, { Component } from 'react';
import { View, Image, Animated } from 'react-native';

import styles from './loadingSpinner.styles'
import logo from '../../../resources/logo-hatless.png'
import hat from '../../../resources/hat.png'


export default class LoadingSpinner extends Component{
	state = {
		top: new Animated.Value(-5),  // Initial value for opacity: 0
		rotation: new Animated.Value(0),  // Initial value for opacity: 0
	}

	componentDidMount(){
		this.runAnimation();
	}


	runAnimation() {
		Animated.loop(
			Animated.sequence([
				Animated.parallel([
					// after decay, in parallel:
					Animated.timing(this.state.top, {
						toValue: -30,                   // Animate to opacity: 1 (opaque)
						duration: 300,
					}),
					Animated.timing(this.state.rotation, {
						// and twirl
						toValue: 1,
						duration: 300
					}),
				]),
				Animated.parallel([
					// after decay, in parallel:
					Animated.timing(this.state.top, {
						toValue: -5,                   // Animate to opacity: 1 (opaque)
						duration: 300,
					}),
					Animated.timing(this.state.rotation, {
						// and twirl
						toValue: 2,
						duration: 200
					})
				]),

			])
		).start()

		// Animated.timing(                  // Animate over time
		// 	this.state.top,            // The animated value to drive
		// 	{
		// 		toValue: -30,                   // Animate to opacity: 1 (opaque)
		// 		duration: 300,              // Make it take a while
		// 	},
		// 	{
		// 		toValue: -5,                   // Animate to opacity: 1 (opaque)
		// 		duration: 300,              // Make it take a while
		// 	}
		// ).start(
		// 	() => this.runAnimation()
		// );
	}

	componentDidMount() {
		this.runAnimation()
	}

	render() {
		let { top } = this.state;

		const spin = this.state.rotation.interpolate({
			inputRange: [0, 1, 2],
			outputRange: ['0deg', '180deg', '360deg']
		})

		return (
			<View style={styles['spinner-holder']}>
				<Animated.View                 // Special animatable View
					style={{
						top: top,
						position: 'absolute',
						width: '100%',
						display: 'flex',
						alignItems: 'center',
						transform: [{rotate: spin}]
					}}
				>
					<Image source={hat} style={styles['hat']}></Image>
				</Animated.View>

				<Image source={logo} style={styles['logo']}></Image>
			</View>
		);
	}
}
