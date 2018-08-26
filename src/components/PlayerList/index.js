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

    render(){
        return (
            <div className="players">
                {this.getPlayers()}
            </div>
        )
    }
}

export default PlayerList;
