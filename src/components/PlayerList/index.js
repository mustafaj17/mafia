import React, { Component } from 'react';
import './PlayerList.css'

class PlayerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            players: this.props.players
        }
    }

    getPlayers = () => {
        const { players } = this.props
        return (players.map(player => {
            return (
                <div className="player">
                    <div key={player.name} className="player">{player.name}</div>
                    <div className="player">{player.inGame ? player.type : '-'}</div>
                </div>
            )
        }))
    }

    render(){
        return (
            <div>
                {this.getPlayers()}
            </div>
        )
    }
}

export default PlayerList;
