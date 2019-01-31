import React from "react"
import {Component} from "react";
import {View, ScrollView, Text, TouchableOpacity} from 'react-native';
import styles from "../game-screen/game-screen.styles";
import PlayerEndGame from '../../components/playerEndGame/playerEndGame';

export default class EndGame extends Component {
    constructor() {
        super()
        this.state = {
            hasPlayerSeenType: false,
        }
    }

    getPlayers = (type) => {
        const {players, game} = this.props;

        return players.filter(player => player.type === type).map(player => {
            let isMafia = player.type === 'Mafia';
            let stylesArray = [];

            stylesArray.push(styles['player']);

            return (
                <PlayerEndGame stylesArray={stylesArray}
                               player={player}
                               isMafia={isMafia}
                               game={game}
                               endGame
                />
            )
        })
    }

    render() {
        return (
            <View style={[styles['screen'], styles['game-screen']]}>
                <View>
                    {/*ADD MAFIA LOGO HEADING*/}
                    <Text>GAME HAS ENDED</Text>
                    {/*ADD WHO WINS LOGIC*/}
                    {/*FIX STYLING*/}
                    <Text>Mafias</Text>
                    <ScrollView contentContainerStyle={styles['games']}>
                        {this.getPlayers("Mafia")}
                    </ScrollView>
                    <Text>Civilians</Text>
                    <ScrollView contentContainerStyle={styles['games']}>
                        {this.getPlayers("Civilian")}
                    </ScrollView>
                </View>
                <TouchableOpacity onPress={() => this.props.endGame()} style={styles['ready-button-container']}>
                    <Text>Back to Main Screen</Text>
                    {/*ADD LOGIC TO PLAY AGAIN? OR LEAVE FOR V2*/}
                </TouchableOpacity>
            </View>
        )

    }
}
