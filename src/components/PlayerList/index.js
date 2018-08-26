import React, { Component } from 'react';
import './PlayerList.css'
import ReactCountdownClock from 'react-countdown-clock'

class PlayerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players
        }
    }

    getPlayers = () => {
        const { players } = this.props;
        return (players.map(player => {
            console.log(player);
            return (
                <div className="player">
                    <div key={player.name} className="player-name">{player.name}</div>
                    <div className="player-type">{player.type || '-'}</div>
                    <div className="player-in-game">{player.inGame}</div>
                    <div className='player-ready'>{player.ready ? 'ready' : '-'}</div>
                </div>
            )
        }))
    }

    gameReady = ()=>{
        return this.props.players.every(player =>  player.ready === true)
    };

    render(){
        return (
            <div className="players">
                {this.gameReady() && <ReactCountdownClock seconds={60}
                                     color="#000"
                                     alpha={0.9}
                                     size={150}
                                     onComplete={()=>console.log('time done')} />
                }
                {this.getPlayers()}
            </div>
        )
    }
}

export default PlayerList;
