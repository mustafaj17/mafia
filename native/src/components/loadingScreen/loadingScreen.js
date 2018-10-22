import React, { Component } from 'react';
import {ImageBackground, Text, View, StyleSheet} from "react-native";
import LoadingSpinner from "../loadingSpinner/loadingSpinner";
import background from '../../../resources/background.png'

export default class LoadingScreen extends Component{
    render(){
        return(
			  <View>
				  <ImageBackground source={background} style={styles.background}>
					  <LoadingSpinner/>
					  <Text style={styles['loading-text']}>Loading...</Text>
				  </ImageBackground>
			  </View>
        )
    }
}

const styles = StyleSheet.create({
	background : {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '100%'
	}
})
