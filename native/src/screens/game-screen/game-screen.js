//* eslint-disable */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import styles from './game-screen.styles';
import Modal from '../../components/modal/modal'
import Player from '../../components/player/player.component';
import backBtn from '../../../resources/back-icon.png';
import CountDown from 'react-native-countdown-component';
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";

export default class GameScreen extends Component{

    constructor(){
        super()
        this.state = {
            hasPlayerSeenType: false,
            hasPlayerSeenVotedOut: false,
            readyBtnOpacity: new Animated.Value(0),
        }
    }

    castVote = (currentPlayer, player) => {
        if(!currentPlayer.votingFor) {
            this.setState({hasPlayerSeenVotedOut: false});
            this.props.currentPlayer.ref.update('votingFor', player.name)
        }
    }

    getMafiasLeft = ()=>{
        const { players } = this.props;
        return players.reduce ( (acc, player) => {
            if(player.inGame && player.type === 'Mafia'){
                return acc + 1
            }
            return acc
        } , 0)
    }

    componentDidMount(){
        Animated.sequence([
            // after decay, in parallel:
            Animated.timing(this.state.readyBtnOpacity, {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 1000,
            }),
        ]).start()
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
                    <Player stylesArray={stylesArray}
                            player={player}
                            isMafia={isMafia}
                            isCurrentPlayerCivilian={isCurrentPlayerCivilian}
                            isCurrentPlayer={isCurrentPlayer}
                            isCurrentPlayerMafia={isCurrentPlayerMafia}
                            game={game}
                    />
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
                        <Text style={styles['game-header']}>{game.gameName}</Text>
                    </View>

                    {game.gameInProgress && !game.votingInProgress && <View>
                        <Text style={styles['header']}>Mafias left : {this.getMafiasLeft()}</Text>
                    </View>}
                    {game.votingInProgress && !player.votingFor && player.inGame && <Text style={styles['header']}>Please vote</Text>}
                    {game.votingInProgress && player.votingFor &&<Text style={styles['header']}> Waiting for others to vote...</Text>}


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
                    <ScrollView contentContainerStyle={styles['games']}>
                        {this.getPlayers()}
                    </ScrollView>
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

                {game.votingInProgress && !player.inGame &&
                <View style={styles['timer']}>
                    <LoadingSpinner/>
                    <Text style={styles['header']}> Voting in progress...</Text>
                </View>
                }

                {player.inGame &&
                !player.ready &&
                !game.gameComplete &&
                !game.votingInProgress &&
                <Animated.View  style={[styles['ready-button'], {opacity: this.state.readyBtnOpacity}]}>
                    <TouchableOpacity onPress={playerReady} >
                        <Text>ready</Text>
                    </TouchableOpacity>
                </Animated.View>

                }
            </View>
        )
    }
}
