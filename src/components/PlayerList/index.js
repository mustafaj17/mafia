import React, { Component } from 'react';
import './PlayerList.css';
import Tick from './../../icons/Tick';
import Mafia from "../../icons/Mafia";

class PlayerList extends Component {

    castVote = player => {
        this.props.currentPlayer.ref.update('votingFor', player.name)
    }

    getPlayers = () => {
        const { players, game } = this.props;
        let currentPlayer = this.props.currentPlayer.data();

        return players.map(player => {

            let isVoteMode = this.props.voteMode;
            let isCurrentPlayer = currentPlayer.name === player.name;
            let isCurrentPlayerMafia = currentPlayer.type === 'Mafia';
            let isInTheGame = player.inGame;
            let isMafia = player.type === 'Mafia';
            let votedOut = game.votedOut;

            if(isVoteMode && currentPlayer.inGame){
                if(isInTheGame & !isCurrentPlayer){
                    return(
                       <div className="player">
                           <div key={player.name} className="player-name">{player.name}</div>
                           <div>
                               <div className="cast-vote-btn" onClick={() => this.castVote(player)}> Vote </div>
                           </div>
                       </div>
                    )
                }

            }else{
                return (
                   <div className={'player' + (isCurrentPlayer ? ' current-player' : '') + (player.name === votedOut ? ' player-out' : '')} >
                       {!isMafia && isCurrentPlayer && <div className="player-type"><div>{player.type}</div></div>}
                       {isMafia && isCurrentPlayerMafia && <div className="player-type"><Mafia/></div>}
                       <div key={player.name} className="player-name">{isCurrentPlayer ? 'You' : player.name}</div>
                       {!isInTheGame && <div className="player-type">{player.type}</div>}
                       {player.ready  && <div className='player-ready'><Tick/></div>}
                   </div>
                )
            }
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
