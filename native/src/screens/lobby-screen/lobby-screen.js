//* eslint-disable */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './lobby-screen.styles';
import mafiaText from '../../assets/mafia-text.png';
import plusIcon from '../../assets/plus-btn.png';

export default class LobbyScreen extends Component{

    getGames = (games) => {
        console.log(games);
        return games.filter(gameDoc => !gameDoc.data().gameInProgress).map(gameDoc => {
			return ( <TouchableOpacity onPress={() => this.props.selectGame(gameDoc)}>
                        <View style={styles['game']}>   
                          <Text style={styles['game-text']}>{gameDoc.data().gameName}</Text>
                         </View>
                      </TouchableOpacity>)
		});
    }
    render(){
        const {createNewGame, games} = this.props
        console.log(games)

        console.log(this.props)
        return(
            <View style={[styles['screen'], styles['lobby-screen']]}>

                <View style={styles['title-container']}>
                    <Image source={mafiaText}></Image>
                    <View >
                        <Text style={styles['header']}>Select game</Text>
                    </View>
                    <View style={styles['games']}>
                        {this.getGames(games)}
                    </View>
                </View>
                <View style={styles['create-game-container']}>
                    <TouchableOpacity style={styles['new-game']} onPress={createNewGame}>
                        <Image style={styles['create-game-button']} source={plusIcon}></Image>
                    </TouchableOpacity>
                    <View ><Text style={styles['new-game-btn-text']}>start new game</Text></View>
                </View>
            </View>
        )
    }
}
