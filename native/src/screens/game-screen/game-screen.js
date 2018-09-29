//* eslint-disable */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './game-screen.styles';

export default class GameScreen extends Component{

    getPlayers = () => {
        const { players, game } = this.props;
        let currentPlayer = this.props.currentPlayer.data();

        return players.map(player => {
            if(player.inGame) {

                let isVoteMode = this.props.voteMode;
                let isCurrentPlayer = currentPlayer.name === player.name;
                let isCurrentPlayerMafia = currentPlayer.type === 'Mafia';
                let isMafia = player.type === 'Mafia';
                let votedOut = game.votedOut;

                if (isVoteMode && currentPlayer.inGame) {
                    if (!isCurrentPlayer) {
                        return (
                            <View onClick={() => this.castVote(player)}>
                                <Text key={player.name}>{player.name}</Text>
                            </View>
                        )
                    }

                } else {
                    return (
                        <View>
                            {/*className={'player' + (isCurrentPlayer ? ' current-player' : '') + (player.name === votedOut ? ' player-out' : '')}>*/}
                            {/*{!isMafia && isCurrentPlayer && <div className="player-type"><Civilian/></div>}*/}
                            {/*{isMafia && isCurrentPlayerMafia && <div className="player-type"><Mafia/></div>}*/}
                            <Text key={player.name} className="player-name">{isCurrentPlayer ? 'You' : player.name}</Text>
                            {/*{player.ready && <div className='player-ready'><Tick/></div>}*/}
                        </View>
                    )
                }
            }
        })

    }
    render(){
        const {game, voteMode, players, currentPlayer} = this.props
        console.log(this.props)
        return(
            <View style={[styles['screen'], styles['lobby-screen']]}>

                <View style={styles['title-container']}>
                    <View >
                        <Text style={styles['header']}>{game.gameName}</Text>
                    </View>
                    <View style={styles['games']}>
                        {this.getPlayers(players)}
                    </View>
                </View>
            </View>
        )
    }
}
