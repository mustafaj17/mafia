//* eslint-disable */
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './game-screen.styles';
import gunIcon from'../../assets/gun.png';
import peaceIcon from'../../assets/peace.png';
import Modal from '../../components/modal/modal'
import TimerCountdown from 'react-native-timer-countdown';

export default class GameScreen extends Component{

    getPlayers = () => {
        const { players, game } = this.props;
        let currentPlayer = this.props.currentPlayer.data();

        return players.map(player => {
            if(player.inGame) {
                console.log(player)
                let isVoteMode = this.props.voteMode;
                let isCurrentPlayer = currentPlayer.name === player.name;
                let isCurrentPlayerMafia = currentPlayer.type === 'Mafia';
                let isCurrentPlayerCivilian = currentPlayer.type === 'Civilian';
                let isMafia = player.type === 'Mafia';
                let votedOut = game.votedOut;
                console.log('game:', game)
                if (isVoteMode && currentPlayer.inGame) {
                    if (!isCurrentPlayer) {
                        return (
                            <View style={styles['game']} onClick={() => this.castVote(player)}>
                                <Text key={player.name} style={styles['game-text']}>{player.name}</Text>
                            </View>
                        )
                    }

                } else {
                    console.log(player)
                    return (
                        <View style={player.ready && !game.roundInProgress ? styles['player-ready'] : styles['player']}>
                            {/*className={'player' + (isCurrentPlayer ? ' current-player' : '') + (player.name === votedOut ? ' player-out' : '')}>*/}
                            <View style={styles['icon-name-container']}>
                                {!isMafia && isCurrentPlayerCivilian && <Image resizeMode="contain" style={styles['type-icon']} source={peaceIcon}></Image>}
                                {isCurrentPlayerMafia && isMafia && <Image resizeMode="contain" style={styles['type-icon']} source={gunIcon}></Image>}
                                <Text key={player.name} style={styles['game-text']}>{player.name}</Text>
                            </View>
                            {player.ready && !game.roundInProgress && <Text key={player.name} style={styles['ready-text']}>ready</Text>}
                        </View>
                    )
                }
            }
        })

    }
    render(){
        const {game, currentPlayer, playerReady, endRound} = this.props
        const player = currentPlayer.data()
        console.log('current', currentPlayer.data())
        return(
            <View style={[styles['screen'], styles['lobby-screen']]}>

                <View style={styles['title-container']}>
                    <View >
                        <Text style={styles['header']}>{game.gameName}</Text>
                    </View>
                    {game.votingInProgress && !player.votingFor && <Text className='header'>please vote</Text>}
                    {game.votingInProgress && player.votingFor &&<Text className='header'> Waiting for others to vote...</Text>}
                    {game.roundInProgress &&
                    <TimerCountdown
                        initialSecondsRemaining={1000*60}
                        onTick={secondsRemaining => console.log('tick', secondsRemaining)}
                        onTimeElapsed={endRound}
                        allowFontScaling={true}
                        style={{ fontSize: 20 }}
                    />}


                    {game.isDraw && <div className="draw-game-text">There has been a draw between:</div>}
                    {game.isDraw &&
                    <View>
                        {game.isDraw.map(player =>{return(
                            <View style={styles['player']}>
                                <Text>{player}</Text>
                            </View>
                        )})
                        }
                    </View>}

                    {game.gameComplete && game.mafiasWin && <Modal mafia={true} text='Mafias win'/>}
                    {game.gameComplete && game.civiliansWin && <Modal text='Civilians'/>}


                    <View style={styles['games']}>
                        {this.getPlayers()}
                    </View>
                </View>

                {player.inGame &&
                !player.ready &&
                !game.gameComplete &&
                !game.votingInProgress && <TouchableOpacity onPress={playerReady} style={styles['ready-button']}>
                    <Text>ready</Text>
                </TouchableOpacity>
                }
            </View>
        )
    }
}
