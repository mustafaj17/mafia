import React from "react"
import {Component} from "react";
import {View, ScrollView, Text, TouchableOpacity, Animated} from 'react-native';
import styles from "../end-game/end-game.styles";
import PlayerEndGame from '../../components/playerEndGame/playerEndGame';
import peaceIcon from '../../../resources/civilian-icon.png';
import gunIcon from '../../../resources/gun-icon.png';
import LottieView from 'lottie-react-native';

export default class EndGame extends Component {
    state = {
        top: new Animated.Value(10),
        scale: new Animated.Value(0),
        iconRotate: new Animated.Value(0),
    }

    componentDidMount(){
        // Animated.timing(this.state.headingOpacity, {
        //     toValue: 1,
        //     duration: 500,
        // }).start()
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.iconRotate, {
                    toValue: 1,
                    duration: 500
                })
                ,
                Animated.timing(this.state.iconRotate, {
                    toValue: 0,
                    duration: 500
                }),
            ])
        )
            .start()

        Animated.loop(
            Animated.sequence([
                Animated.timing(this.state.scale, {
                    toValue: 1,
                    duration: 600
                })
                ,
                Animated.timing(this.state.scale, {
                    toValue: 0,
                    duration: 600
                })
            ])
        )
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

        const boxScale = this.state.scale.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.05]
        })

        const iconRotate = this.state.iconRotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['-15deg', '15deg']
        })
        return (
            <View style={styles['game-screen']}>
                <LottieView
                    source={game.mafiasWin ? require('../../assets/animations/fireworks') : require('../../assets/animations/fireworks-green')}
                    autoPlay
                    loop
                />

                <View style={styles['winner-view']}>
                    <Animated.Image resizeMode="contain" style={[styles['type-icon'], {
                        height: 50,
                        width: 50,
                        margin: 8,
                        transform:[
                            {rotate: iconRotate},
                            { perspective: 1000},
                            {scaleX: -1}
                        ]
                    }]} source={game.mafiasWin ? gunIcon : peaceIcon}/>

                    <Text style={styles['winner-text']}>{game.mafiasWin ? 'Mafias Win' : 'Civilians Win'}</Text>

                    <Animated.Image resizeMode="contain" style={[styles['type-icon'], {
                        height: 50,
                        width: 50,
                        margin: 8,
                        transform:[
                            {rotate: iconRotate},
                            {perspective: 1000},
                        ]
                    }]} source={game.mafiasWin ? gunIcon : peaceIcon}/>
                </View>
                <View style={styles['title-container']}>
                    <ScrollView contentContainerStyle={styles['games']}>
                        {this.getPlayers("Mafia")}
                        {this.getPlayers("Civilian")}
                    </ScrollView>
                </View>
                <TouchableOpacity onPress={() => this.props.endGame()} style={styles['ready-button-container']}>
                    <Animated.View style={[styles['ready-button'], {
                        transform: [
                            {scale: boxScale}
                        ]
                    }]}>
                        <Text style={styles['ready-text']}>Back to Main Screen</Text>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        )

    }
}
