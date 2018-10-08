//* eslint-disable */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './game-screen.styles';
import gunIcon from '../../../resources/gun-icon.png';
import peaceIcon from '../../../resources/civilian-icon.png';
import Modal from '../../components/modal/modal'
import backBtn from '../../../resources/back-icon.png';
import CountDown from 'react-native-countdown-component';
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";

export default class GameScreen extends Component{

    constructor(){
        super()
        this.state = {
            hasPlayerSeenType: false,
            hasPlayerSeenVotedOut: false
        }
    }

    castVote = (currentPlayer, player) => {
        if(!currentPlayer.votingFor) {
            this.setState({hasPlayerSeenVotedOut: false});
            this.props.currentPlayer.ref.update('votingFor', player.name)
        }
    }

    getPlayers = () => {
        const { players, game } = this.props;
        let currentPlayer = this.props.currentPlayer.data();

        return players.map(player => {
            if(player.inGame) {
                let isCurrentPlayer = currentPlayer.name === player.name;
                let isCurrentPlayerMafia = currentPlayer.type === 'Mafia';
                let isCurrentPlayerCivilian = currentPlayer.type === 'Civilian';
                let isMafia = player.type === 'Mafia';
                let votedOut = game.votedOut;
                let stylesArray = [];

                stylesArray.push(styles['player']);

                if(player.ready && !game.roundInProgress){
                    stylesArray.push(styles['player-ready'])
                }
                if(player.name === votedOut){
                    stylesArray.push(styles['player-out'])
                }

                if(isCurrentPlayer){
                    stylesArray.push(styles['current-player'])
                }

                return (
                    <View style={stylesArray}>
                        <View style={styles['icon-name-container']}>

                            {!isMafia &&
                            isCurrentPlayerCivilian &&
                            isCurrentPlayer &&
                            <Image resizeMode="contain" style={styles['type-icon']} source={peaceIcon}></Image>}

                            {isCurrentPlayerMafia &&
                            isMafia &&
                            <Image resizeMode="contain" style={styles['type-icon']} source={gunIcon}></Image>}

                            <Text key={player.name} style={styles['game-text']}>{player.name}</Text>

                        </View>
                        {player.ready && !game.roundInProgress && <Text key={player.name} style={styles['ready-text']}>ready</Text>}
                    </View>
                )
            }
        })
    }

    getVotePlayers = () => {
        const {players} = this.props;
        let currentPlayer = this.props.currentPlayer.data();

        if (currentPlayer.inGame) {
            return players.map(player => {
                if (player.inGame) {
                    let isCurrentPlayer = currentPlayer.name === player.name;

                    if (!isCurrentPlayer) {
                        return (
                            <TouchableOpacity
                                style={currentPlayer.votingFor === player.name ? styles['player-selected'] : styles['player-vote']}
                                onPress={() => this.castVote(currentPlayer, player)}
                            >
                                <Text key={player.name} style={styles['game-text']}>{player.name}</Text>
                            </TouchableOpacity>
                        )
                    }

                }
            })
        } else {
            return (
                <View>
                    <LoadingSpinner/>
                    <Text className='header'> Voting in progress...</Text>
                </View>
            )
        }
    }

    getPlayerType = (playerName) => {
        let type;
        this.props.players.forEach(player => {
            if(player.name === playerName){
                type = player.type;
            }
        })
        return type;
    }


    render(){
        const {game, currentPlayer, playerReady, endRound} = this.props
        const player = currentPlayer.data()
        console.log('current', currentPlayer.data())
        return(
            <View style={[styles['screen'], styles['game-screen']]}>
                {game.gameComplete && game.mafiasWin && <Modal mafia={true} text='Mafias win' onPressHandler={() => this.props.endGame()} />}
                {game.gameComplete && game.civiliansWin && <Modal text='Civilians win' onPressHandler={ () => this.props.endGame() } />}
                {!game.gameInProgress && !player.ready && !player.admin &&
                <TouchableOpacity style={styles['back-btn-holder']} onPress={this.props.leaveGame}>
                    <Image style={styles['back-btn']} source={backBtn}></Image>
                </TouchableOpacity>
                }
                {!this.state.hasPlayerSeenType && player.type &&
                <Modal text={"You're a " + player.type } mafia={player.type === 'Mafia'} onPressHandler={() => this.setState({hasPlayerSeenType: true})}/>
                }

                {!this.state.hasPlayerSeenVotedOut && game.votedOut &&
                <Modal text={game.votedOut} mafia={this.getPlayerType(game.votedOut) === 'Mafia'} subText={'was voted out'} onPressHandler={() => this.setState({hasPlayerSeenVotedOut: true})}/>
                }

                {!player.inGame && game.votedOut && !game.gameComplete &&
                <Modal text={game.votedOut} noButton mafia={this.getPlayerType(game.votedOut) === 'Mafia'} subText={'was voted out'} />
                }


                <View style={styles['title-container']}>
                    <View >
                        <Text style={styles['header']}>{game.gameName}</Text>
                    </View>
                    {game.votingInProgress && !player.votingFor && <Text className='header'>please vote</Text>}
                    {game.votingInProgress && player.votingFor &&<Text className='header'> Waiting for others to vote...</Text>}


                    {game.isDraw && <Text style={styles['draw-game-text']}>There has been a draw between:</Text>}
                    {game.isDraw &&
                    <View style={styles['player-draw-container']}>
                        {game.isDraw.map(player =>{return(
                            <View style={styles['player-draw']}>
                                <Text style={styles['player-draw-text']}>{player}</Text>
                            </View>
                        )})
                        }
                    </View>}

                    {game.votingInProgress &&
                    <View style={styles['games']}>
                        {this.getVotePlayers()}
                    </View>
                    }

                    {!game.roundInProgress &&
                     !game.votingInProgress &&
                    <View style={styles['games']}>
                        {this.getPlayers()}
                    </View>
                    }
                </View>

                {game.roundInProgress &&
                <View style={styles['timer']}>
                    <CountDown
                        digitBgColor={'#00FFC2'}
                        until={10}
                        onFinish={endRound}
                        size={80}
                        timeToShow={['S']}
                        labelS={""}
                    />
                </View>}

                {player.inGame &&
                !player.ready &&
                !game.gameComplete &&
                !game.votingInProgress &&
                <TouchableOpacity onPress={playerReady} style={styles['ready-button']}>
                    <Text>ready</Text>
                </TouchableOpacity>
                }
            </View>
        )
    }
}
