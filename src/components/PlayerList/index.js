import React, { Component } from 'react';
import './PlayerList.css'

class PlayerList extends Component {

    getPlayers = () => {
        const { players, currentPlayer } = this.props;
        let currentPlayerType = currentPlayer.data().type
            return players.map(player => {
                return (
                    <div className="player">
                        <div key={player.name} className="player-name">{player.name}</div>
                        <div className="player-type">{currentPlayerType === 'Mafia'? player.type : '-'}</div>
                        <div className="player-in-game">{player.inGame ? 'playing' : 'out'}</div>
                        <div className='player-ready'>{player.ready ? 'ready' : '-'}</div>
                    </div>
                )
            })
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
