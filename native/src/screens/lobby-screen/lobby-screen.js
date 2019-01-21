//* eslint-disable */
import React, { Component } from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image, TextInput, Animated, Platform} from 'react-native';
import styles from './lobby-screen.styles';
import mafiaText from '../../../resources/mafia-text.png';
import info from '../../../resources/info.png';
import InfoModal from '../../components/infoModal/infoModal'
import plusIcon from '../../../resources/plus-icon.png';
import logo from '../../../resources/logo.png';
// import Modal from "../../components/modal/modal";
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

export default class LobbyScreen extends Component{

    state = {
        gameName : '',
        viewInfoModal: false,
        textRotation: new Animated.Value(0),
        inputBoxRotation: new Animated.Value(1),
        textOpacity: new Animated.Value(1),
        inputOpacity: new Animated.Value(0),
        joinGameTranslationY: new Animated.Value(0),
        logoTranslationY: new Animated.Value(0),
        uiInputMode: false,
        joinGameSelected: false
    }

    componentDidMount () {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
        if(Platform.OS === 'android') {
            AndroidKeyboardAdjust.setAdjustNothing();
        }
    }

    componentWillUnmount () {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = () => {
        // this.setState({uiInputMode: true})
    }

    _keyboardDidHide = () => {
        // this.setState({uiInputMode: false})
    }

    runAnimation() {
        if(this.state.uiInputMode){
            Animated.sequence([
                Animated.parallel([
                    // after decay, in parallel:
                    Animated.timing(this.state.textRotation, {
                        toValue: 0,                   // Animate to opacity: 1 (opaque)
                        duration: 500,
                    }),
                    Animated.timing(this.state.inputBoxRotation, {
                        // and twirl
                        toValue: 1,
                        duration: 500
                    }),
                    Animated.timing(this.state.joinGameTranslationY, {
                        // and twirl
                        toValue: 0,
                        duration: 500
                    }),
                    Animated.timing(this.state.logoTranslationY, {
                        // and twirl
                        toValue: 0,
                        duration: 500
                    }),
                    Animated.timing(this.state.textOpacity, {
                        // and twirl
                        toValue: 1,
                        duration: 500
                    }),
                    Animated.timing(this.state.inputOpacity, {
                        // and twirl
                        toValue: 0,
                        duration: 500
                    }),
                ]),
            ]).start()

            this.setState({uiInputMode: false})
        }else {
            Animated.sequence([
                Animated.parallel([
                    // after decay, in parallel:
                    Animated.timing(this.state.textRotation, {
                        toValue: 1,                   // Animate to opacity: 1 (opaque)
                        duration: 500,
                    }),
                    Animated.timing(this.state.inputBoxRotation, {
                        // and twirl
                        toValue: 2,
                        duration: 500
                    }),
                    Animated.timing(this.state.joinGameTranslationY, {
                        // and twirl
                        toValue: 50,
                        duration: 500
                    }),
                    Animated.timing(this.state.logoTranslationY, {
                        // and twirl
                        toValue: -50,
                        duration: 500
                    }),
                    Animated.timing(this.state.textOpacity, {
                        // and twirl
                        toValue: 0,
                        duration: 500
                    }),
                    Animated.timing(this.state.inputOpacity, {
                        // and twirl
                        toValue: 1,
                        duration: 500
                    }),
                ]),
            ]).start()
            this.setState({uiInputMode: true})
        }
    }

    runScreenTransitionAnimation  = () => {
        Animated.sequence([
            Animated.parallel([
                // after decay, in parallel:
                Animated.timing(this.state.logoTranslationY, {
                    // and twirl
                    toValue: -80,
                    duration: 500
                }),
            ]),
        ]).start()
    }

    startGame = () => {
        this.setState({joinGameSelected: false})
        this.textInput.focus();
        this.runAnimation();

    }

    createGame = () => {
        this.setState({joinGameSelected: true})
        this.textInput.focus();
        this.runAnimation();

    }

    handleScreenPress = () => {
        if(this.state.uiInputMode) {
            this.props.resetError()
            Keyboard.dismiss();
            this.runAnimation();
        }
    }

    startOrJoin = () => {
        Keyboard.dismiss();
        if(this.state.joinGameSelected) {
            this.props.joinGame(this.state.gameName)
        }else {
            this.props.createGame(this.state.gameName)
        }
    }

    render(){

        const textBoxRotation = this.state.textRotation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['0deg', '180deg', '360deg']
        })


        const inputBoxRotation = this.state.inputBoxRotation.interpolate({
            inputRange: [0, 1, 2],
            outputRange: ['0deg', '180deg', '360deg']
        })

        return(
            <TouchableWithoutFeedback onPress={() => {this.handleScreenPress()}}>
                <View style={styles['lobby-screen']}>
                    {this.state.viewInfoModal && <InfoModal onPressHandler={ () => this.setState({viewInfoModal: false}) } />}

                    <View style={[styles['button-container'], styles['button-container--top']]}>

                        <Animated.View  style={{zIndex: this.state.inputOpacity, display: 'flex', alignItems: 'center'} }>
                            <Animated.View  style={
                                {	zIndex: this.state.inputOpacity,
                                    opacity: this.state.inputOpacity,
                                }
                            }>
                                <TextInput style={styles['input-box']}
                                           onChangeText={(text) => this.setState({ gameName : text})}
                                           disable={!this.state.uiInputMode}
                                           value={this.state.gameName}
                                           placeholder='Enter game ID'
                                           ref={ elem => this.textInput = elem }/>

                            </Animated.View>
                            {this.props.errorMessage && <Text>{this.props.errorMessage}</Text>}
                            {this.props.showSpinner && <Text>Loading</Text>}

                            <Animated.View  style={
                                {	zIndex: this.state.inputOpacity,
                                    opacity: this.state.inputOpacity,
                                    marginTop:20
                                }
                            }>
                                <TouchableOpacity onPress={this.startOrJoin} editable={!this.state.uiInputMode}>
                                    <View style={styles['go-btn']}>
                                        <Text style={{fontSize: 18, letterSpacing:2}}>Go</Text>
                                    </View>
                                </TouchableOpacity>
                            </Animated.View>

                        </Animated.View>

                        <Animated.View  style={
                            {	zIndex: this.state.textOpacity,
                                opacity: this.state.textOpacity,
                            }}>

                            <TouchableOpacity style={styles['text-box-touch']} onPress={this.createGame}>

                                <Text style={styles['text-box']}>Join Game</Text>
                            </TouchableOpacity>


                        </Animated.View>

                    </View>

                    <Animated.View  style={
                        {transform: [
                                { translateY: this.state.logoTranslationY }
                            ]}}>
                        <View style={styles['logo-container']}>

                            <Image style={styles.logo} source={logo}></Image>
                            <Image style={styles['mafia-text']} source={mafiaText}></Image>

                        </View>
                    </Animated.View>

                    <View style={[styles['button-container'], styles['button-container--bottom']]}>
                        <Animated.View  style={
                            {	zIndex: this.state.textOpacity,
                                opacity: this.state.textOpacity,
                            }}>

                            <TouchableOpacity style={styles['text-box-touch']} onPress={this.startGame}>
                                <Text style={styles['text-box']}>Start New Game</Text>
                            </TouchableOpacity>

                        </Animated.View>
                    </View>


                    <TouchableOpacity style={styles['info']} onPress={ () => this.setState({viewInfoModal: true}) }>
                        <Image style={styles['info-img']} source={info}></Image>
                    </TouchableOpacity>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
