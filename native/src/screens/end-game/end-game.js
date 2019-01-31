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

    getPlayers = () => {
        const {players, game} = this.props;

        return players.map(player => {
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
                <Text>GAME HAS ENDED</Text>
                <ScrollView contentContainerStyle={styles['games']}>
                    {this.getPlayers()}
                </ScrollView>

                <TouchableOpacity onPress={this.props.endGame()} style={styles['ready-button-container']}>
                        <Text>Back to Main Screen</Text>
                </TouchableOpacity>
            </View>
        )

    }
}
