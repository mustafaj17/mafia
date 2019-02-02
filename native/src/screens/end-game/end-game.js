import React from "react"
import {Component} from "react";
import {View, ScrollView, Text, TouchableOpacity, Animated} from 'react-native';
import styles from "../end-game/end-game.styles";
import PlayerEndGame from '../../components/playerEndGame/playerEndGame';

export default class EndGame extends Component {
    constructor() {
        super()
        this.state = {
            headingOpacity: new Animated.Value(0)
        }
    }

    componentDidMount(){
        Animated.timing(this.state.headingOpacity, {
            toValue: 1,
            duration: 1000,
        })
            .start()
    }


    getPlayers = (type) => {
        const {players, game} = this.props;
        let playersArr = []

        players.filter(player => player.type === type).map(player => {
            let isMafia = player.type === 'Mafia';

            playersArr.push(
                <PlayerEndGame stylesArray={styles['player']}
                               player={player}
                               isMafia={isMafia}
                               game={game}
                               endGame
                />
            )
        })
        return(
            <View>
                <View style={styles['sub-heading']}>
                    <Text style={styles['sub-heading-text']}>{type}s</Text>
                </View>
                {playersArr}
            </View>
        )
    }

    render() {
        const {game} = this.props;
        const {headingOpacity} = this.state;

        return (
            <View style={styles['game-screen']}>
                <View>
                    <Animated.View style={[{zIndex: 10, top: 10, left: 0, height: 34, alignItems: 'center', margin: 16}, {
                        opacity: headingOpacity,
                    }]}>
                        <Text style={styles['winner-text']}>{game.mafiasWin ? 'Mafias Win' : 'Civilians Win'}</Text>
                    </Animated.View>
                    <ScrollView contentContainerStyle={styles['games']}>
                        {this.getPlayers("Mafia")}
                        {this.getPlayers("Civilian")}
                    </ScrollView>
                </View>
                <TouchableOpacity onPress={() => this.props.endGame()} style={styles['ready-button-container']}>
                    <View style={styles['ready-button']}>
                        <Text style={styles['ready-text']}>Back to Main Screen</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )

    }
}
