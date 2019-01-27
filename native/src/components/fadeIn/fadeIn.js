import React, { Component } from 'react';
import { Animated } from 'react-native';

export default class FadeIn extends Component{

	state = {
		modalSacle: new Animated.Value(0),
		modalOpacity: new Animated.Value(0)
	}

	componentDidMount(){
		Animated.sequence([
			Animated.parallel([
				Animated.timing(this.state.modalSacle, {
					toValue: 1,
					duration: 250,
				}),
				Animated.timing(this.state.modalOpacity, {
					toValue: 1,
					duration: 250,
				})
			])
		]).start()
	}


	render(){

		const modalOpacity = this.state.modalOpacity.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 1]
		})

		const modalSacle = this.state.modalSacle.interpolate({
			inputRange: [0, 1],
			outputRange: [0.8, 1]
		})

		return(
			<Animated.View style={[{zIndex: 10, position: 'absolute', top: 0, left: 0, height: '100%', width: '100%'}, {
				opacity: modalOpacity,
				transform:[
					{
						scaleY: modalSacle
					},
					{
						scaleX: modalSacle
					}
				]
			}]}>
				{this.props.children}
			</Animated.View>
		)
	}
}
