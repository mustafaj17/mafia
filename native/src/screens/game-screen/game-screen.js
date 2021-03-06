//* eslint-disable */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Animated } from 'react-native';
import styles from './game-screen.styles';
import Modal from '../../components/modal/modal'
import Player from '../../components/player/player.component';
import closeIcon from '../../../resources/closeIcon.png';
import CountDown from 'react-native-countdown-component';
import LoadingSpinner from "../../components/loadingSpinner/loadingSpinner";
import LoadingScreen from "../loadingScreen/loadingScreen";
import EndGame from "../end-game/end-game"
import ConfirmModal from '../../components/confirmModal/confirmModal';

export default class GameScreen extends Component{

    constructor(){
        super()
        this.state = {
            hasPlayerSeenType: false,
            readyBtnOpacity: new Animated.Value(0),
            readyBtnScale: new Animated.Value(0),
			   showConfirmModal: false
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
        Animated.parallel([
            // after decay, in parallel:
            Animated.timing(this.state.readyBtnOpacity, {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 1000,
            }),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(this.state.readyBtnScale, {
                        toValue: 1,
                        duration: 600,
                    }),
                    Animated.timing(this.state.readyBtnScale, {
                        toValue: 0,
                        duration: 600,
                    }),
                ]))
        ]).start()
    }

    componentDidUpdate(){
        Animated.parallel([
            // after decay, in parallel:
            Animated.timing(this.state.readyBtnOpacity, {
                toValue: 1,                   // Animate to opacity: 1 (opaque)
                duration: 1000,
            }),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(this.state.readyBtnScale, {
                        toValue: 1,
                        duration: 600,
                    }),
                    Animated.timing(this.state.readyBtnScale, {
                        toValue: 0,
                        duration: 600,
                    }),
                ]))
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


    getPlayerType = (playerName) => {
        let type;
        this.props.players.forEach(player => {
            if(player.name === playerName){
                type = player.type;
            }
        })
        return type;
    }

	confirmModalYesHandler = () =>{
		this.props.leaveGame();
	}
	confirmModalNoHandler = () =>{
		this.setState({showConfirmModal : false})
	}



	render(){
        const {game, currentPlayer, playerReady, endRound, player, players, endGame} = this.props;
        const boxScale = this.state.readyBtnScale.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.05]
        })


        if(!player || !game){
            return <LoadingScreen/>;
        }

        if(game.votingInProgress){
            return <VotingScreen leaveGame={this.props.leaveGame} game={game} player={player} players={players} currentPlayer={currentPlayer}/>;
        }

        if(game.roundInProgress){
            return <InGameScreen leaveGame={this.props.leaveGame} game={game} endRound={endRound}/>
        }

        if(game.gameComplete){
            return <EndGame
                game={game}
                players={players}
                currentPlayer={currentPlayer}
                endGame={endGame}
            />;
        }

        return(
            <View style={[styles['screen'], styles['game-screen']]}>
                {!this.props.hasPlayerSeenVotedOut && game.votedOut && !game.gameComplete &&
                <Modal text={game.votedOut}
                       mafia={this.getPlayerType(game.votedOut) === 'Mafia'}
                       subText={'was voted out'}
                       onPressHandler={this.props.playerHasSeenVotedOut}>
                </Modal>
                }

                {this.state.showConfirmModal &&
					<ConfirmModal
						yesHandler={this.confirmModalYesHandler}
						noHandler={this.confirmModalNoHandler}
					/>}

                <TouchableOpacity style={styles['back-btn-holder']} onPress={()=>this.setState({showConfirmModal : true})}>
                    <Image style={styles['back-btn']} source={closeIcon}/>
                </TouchableOpacity>


                {!this.state.hasPlayerSeenType && player.type &&
                <Modal text={"You're a " + player.type }
                       mafia={player.type === 'Mafia'}
                       onPressHandler={() => this.setState({hasPlayerSeenType: true})}/>
                }


                <View style={styles['title-container']}>
                    <View >
                        <Text style={styles['game-header']}>{game.gameName}</Text>
                    </View>

                    {game.gameInProgress && <View>
                        <Text style={styles['header']}>Mafias left : {this.getMafiasLeft()}</Text>
                    </View>}

                    <ScrollView contentContainerStyle={styles['games']}>
                        {this.getPlayers()}
                    </ScrollView>

						 {(players.length < 3) &&
						 <View style={[styles['error-view']]} >
							 <Text style={[styles['error-text']]}>Minimum of 3 players are required to play</Text>
						 </View>
						 }

                </View>


                {player.inGame &&
                !player.ready &&
                !game.gameComplete &&
                <TouchableOpacity onPress={playerReady} style={styles['ready-button-container']}>
                    <Animated.View  style={[styles['ready-button'], {opacity: this.state.readyBtnOpacity, transform: [
                            {scale: boxScale}
                        ]}]}>
                        <Text>ready</Text>
                    </Animated.View>
                </TouchableOpacity>
                }
            </View>
        )
    }
}


class VotingScreen extends Component{


	state = {
		showConfirmModal : false
	}


	castVote = (currentPlayer, player) => {
        if(!currentPlayer.votingFor) {
            this.props.currentPlayer.ref.update('votingFor', player.name)
        }
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

	confirmModalYesHandler = () =>{
		this.props.leaveGame();
	}
	confirmModalNoHandler = () =>{
		this.setState({showConfirmModal : false})
	}

    render(){

        const {game, player} = this.props;


		 return(
            <View style={[styles['screen'], styles['game-screen']]}>
					<TouchableOpacity style={styles['back-btn-holder']} onPress={()=>this.setState({showConfirmModal : true})}>
						<Image style={styles['back-btn']} source={closeIcon}/>
					</TouchableOpacity>
					{this.state.showConfirmModal &&
					<ConfirmModal
						yesHandler={this.confirmModalYesHandler}
						noHandler={this.confirmModalNoHandler}
					/>}
                {game.votingInProgress &&
                <View style={styles['vote-screen-container']}>
                    <ScrollView contentContainerStyle={styles['players-container']}>

                        {game.votingInProgress && !player.votingFor && player.inGame &&
                        <Text style={styles['header']}>Please vote</Text>}

                        {game.votingInProgress && player.votingFor &&
                        <Text style={styles['header']}> Waiting for others to vote...</Text>}

                        {game.isDraw && <View style={[styles['draw-view']]} ><Text style={styles['header']}>There has been a draw between:</Text></View>}

                        {game.isDraw &&
                        <View style={styles['player-draw-container']}>
                            {game.isDraw.map(player =>{return(
                                <View style={styles['player-draw']}>
                                    <Text style={styles['player-draw-text']}>{player}</Text>
                                </View>
                            )})
                            }
                        </View>}

                        {this.getVotePlayers()}

                    </ScrollView>
                </View>
                }

                {game.votingInProgress && !player.inGame &&
                <View style={styles['timer']}>
                    <LoadingSpinner/>
                    <Text style={styles['header']}> Voting in progress...</Text>
                </View>}

            </View>
        )
    }
}



class InGameScreen extends Component{

    state = {
		 showConfirmModal : false
    }


	confirmModalYesHandler = () =>{
		this.props.leaveGame();
	}
	confirmModalNoHandler = () =>{
		this.setState({showConfirmModal : false})
	}


	render(){
        const {game, endRound} = this.props;

        return(
            <View style={[styles['screen'], styles['game-screen']]}>
					<TouchableOpacity style={styles['back-btn-holder']} onPress={()=>this.setState({showConfirmModal : true})}>
						<Image style={styles['back-btn']} source={closeIcon}/>
					</TouchableOpacity>
					{this.state.showConfirmModal &&
					<ConfirmModal
						yesHandler={this.confirmModalYesHandler}
						noHandler={this.confirmModalNoHandler}
					/>}

                <View >
                    <Text style={styles['game-header']}>{game.gameName}</Text>
                </View>

                <View style={styles['timer']}>
                    <CountDown
                        digitBgColor={'#00FFC2'}
                        until={59}
                        onFinish={endRound}
                        size={80}
                        timeToShow={['S']}
                        labelS={""}/>
                </View>
                <TouchableOpacity style={styles['skip-button']} onPress={endRound}>
                    <Text>Skip</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

