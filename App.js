import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component {

    startGame = () => {
        alert('starting game');
    }

    joinGame = () => {
        alert('joining game');
    }

    render() {
        return (
           <View style={styles.container}>

               <View>
                   <Text style={styles.title}>Mafia</Text>
               </View>

               <View>
                   <TouchableOpacity onPress={this.startGame} style={styles.button}>
                       <Text>Start Game</Text>
                   </TouchableOpacity>
               </View>

               <View>
                   <TouchableOpacity onPress={this.joinGame} style={styles.button}>
                       <Text>Join Game</Text>
                   </TouchableOpacity>
               </View>



           </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginBottom: 40,
        fontSize: 24
    },
    button: {
        margin: 20,
        padding: 20,
        borderWidth: 1,
        borderColor: 'lightgrey'
    }
});