import React, { Component } from 'react';
import styles from "../../screens/game-screen/game-screen.styles";
import peaceIcon from '../../../resources/civilian-icon.png';
import gunIcon from '../../../resources/gun-icon.png';
import {View, Text, Image, Animated} from 'react-native';


export default class Player extends Component{

    state = {
        playerRotate: new Animated.Value(1),
        playerOpacity: new Animated.Value(0),
        iconRotate: new Animated.Value(0),

    }

    componentDidMount(){
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
                })
            ])
        )
            .start()

        Animated.sequence([
            Animated.parallel([
                Animated.timing(this.state.playerRotate, {
                    toValue: 0,
                    duration: 1000,
                }),
                Animated.timing(this.state.playerOpacity, {
                    toValue: 1,
                    duration: 1000,
                })
            ])
        ]).start()
    }

    componentWillUnmount(){
        Animated.sequence([
            Animated.parallel([
                Animated.timing(this.state.playerRotate, {
                    toValue: 1,
                    duration: 5000,
                }),
                Animated.timing(this.state.playerOpacity, {
                    toValue: 0,
                    duration: 5000,
                })
            ])
        ]).start()
    }

    render(){

        let { player, isCurrentPlayerCivilian, isCurrentPlayer, stylesArray, isMafia, isCurrentPlayerMafia, game} = this.props;

        const playerRotate = this.state.playerRotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '60deg']
        })

        const iconRotate = this.state.iconRotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['-15deg', '15deg']
        })

        return(
            <Animated.View style={[stylesArray, {
                opacity: this.state.playerOpacity,
                transform:[
                    {rotateX: playerRotate},
                    { perspective: 1000}
                ]
            }]}>
                <View style={styles['icon-name-container']}>

                    {!isMafia &&
                    isCurrentPlayerCivilian &&
                    isCurrentPlayer &&
                    <Animated.Image resizeMode="contain" style={[styles['type-icon'], {
                        height: 30,
                        width: 30,
                        transform:[
                            {rotate: iconRotate},
                            { perspective: 1000}
                        ]
                    }]} source={peaceIcon} />}

                    {isCurrentPlayerMafia &&
                    isMafia &&
                    <Animated.Image resizeMode="contain" style={[styles['type-icon'], {
                        height: 30,
                        width: 30,
                        transform:[
                            {rotate: iconRotate},
                            { perspective: 1000}
                        ]
                    }]} source={gunIcon} />}

                    <Text key={player.name} style={styles['game-text']}>{player.name}</Text>

                </View>
                {player.ready && !game.roundInProgress && <Text key={player.name} style={styles['ready-text']}>ready</Text>}
            </Animated.View>
        )
    }
}
