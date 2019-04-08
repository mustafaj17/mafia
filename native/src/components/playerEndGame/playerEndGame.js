import React, { Component } from 'react';
import styles from "../../screens/game-screen/game-screen.styles";
import peaceIcon from '../../../resources/civilian-icon.png';
import gunIcon from '../../../resources/gun-icon.png';
import {View, Text, Image, Animated} from 'react-native';


export default class PlayerEndGame extends Component{

    state = {
        playerRotate: new Animated.Value(1),
        playerOpacity: new Animated.Value(0),

    }

    componentDidMount(){
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

        let { player, stylesArray, isMafia, game} = this.props;

        const playerRotate = this.state.playerRotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '60deg']
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
                    <Image resizeMode="contain" style={styles['type-icon']} source={peaceIcon}/>}

                    {isMafia &&
                    <Image resizeMode="contain" style={styles['type-icon']} source={gunIcon}/>}

                    <Text key={player.name} style={styles['game-text']}>{player.name}</Text>

                </View>
                {player.ready && !game.roundInProgress && <Text key={player.name} style={styles['ready-text']}>ready</Text>}
            </Animated.View>
        )
    }
}
