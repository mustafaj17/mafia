import React, { Component } from 'react';
import './PlayerList.css'

class PlayerList extends Component {

    castVote = player => {
        debugger;
        this.props.currentPlayer.ref.update('votingFor', player.name)
    }

    getPlayers = () => {
        const { players } = this.props;
        let currentPlayer = this.props.currentPlayer.data()
        return players.map(player => {
            return (
               <div className="player">
                   <div key={player.name} className="player-name">{player.name}</div>
                   {!this.props.voteMode &&
                   <div>
                       (<div className="player-type">{currentPlayer.type === 'Mafia'? player.type : '-'}</div>
                       <div className="player-in-game">{player.inGame ? 'playing' : 'out'}</div>
                       <div className='player-ready'>{player.ready ? 'ready' : '-'}</div>
                   </div>}
                   {this.props.voteMode && !currentPlayer.votedFor &&
                   <div>
                       <div className="cast-vote" onClick={() => this.castVote(player)}> Vote </div>
                   </div>
                   }
               </div>
            )
        })
    }

    render(){

        let player = this.props.currentPlayer.data();
        return (
           <div className="players">

               {player.votingFor ?
                  <div> you voted for {player.votingFor}</div> :
                  this.getPlayers()
               }
           </div>
        )
    }
}

export default PlayerList;
