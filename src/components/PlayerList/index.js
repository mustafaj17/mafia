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
        const { players } = this.props
        return (players.map(player => {
            return (
                <div className="container">
                    <div key={player.name} className="player">{player.name}</div>
                    <div className="player">{player.inGame ? player.type : '-'}</div>
                </div>
            )
        }))
    }

    isTrue = (status)=>{
        return status === true
    }

    gameReady = ()=>{
        const { players } = this.props
        let statusArray = []
        players.map(player => {
            return statusArray.push(player.inGame)
        })
        return statusArray.every(this.isTrue)
    }

    render(){
        return (
            <div>
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
