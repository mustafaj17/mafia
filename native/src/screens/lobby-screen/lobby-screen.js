import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './lobby-screen.styles';
import mafiaText from '../../assets/mafia-text.png';

export default class LobbyScreen extends Component{
    render(){
        return(
            <View style={[styles['screen'], styles['lobby-screen']]}>

					<Image style={styles['mafia-text-logo']} source={mafiaText}></Image>
					<View >
						<Text style={styles['header']}>Select Game</Text>
					</View>
					<View style={styles['games']}>
						<Text style={styles['game']}>GAMES</Text>
					</View>
					<View style={styles['new-game']} onClick={this.props.createNewGame}>
						<View ><Text style={styles['new-game-btn']}>+</Text></View>
						<View ><Text style={styles['new-game-btn-text']}>start new game</Text></View>
					</View>
				</View>
        )
    }
}
