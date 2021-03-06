import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import styles from './modal.styles';
import gunIcon from '../../../resources/gun-icon.png';
import peaceIcon from '../../../resources/civilian-icon.png';
import FadeIn from '../../components/fadeIn/fadeIn';

class Modal extends Component{
    render(){
        return(
            <View style={styles.modal}>
                <View style={styles['modal-box']}>

                    {this.props.children}
                    <View style={styles.title}>
                        <Text style={styles['title-text']}>{this.props.text}</Text>
                        {this.props.subText && <Text style={styles['sub-text']}>{this.props.subText}</Text>}
                    </View>

                    <Image style={styles.icon} source={this.props.mafia ? gunIcon : peaceIcon}/>

                    {!this.props.noButton && <TouchableOpacity onPress={this.props.onPressHandler}>
                        <View style={styles['ok-btn']}>
                            <Text style={styles['ok-btn-txt']}>ok</Text>
                        </View>
                    </TouchableOpacity>
                    }
                </View>

            </View>
        )
    }
}

export default FadeIn(Modal);
