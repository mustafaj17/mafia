import React, { Component } from 'react';
import './PlayerList.css';
import Tick from './../../icons/Tick';
import Mafia from "../../icons/Mafia";
import Civilian from "../../icons/Civilian";

class PlayerList extends Component {

    castVote = player => {
        this.props.currentPlayer.ref.update('votingFor', player.name)
    }

    getPlayers = () => {
        const { players, game } = this.props;
        let currentPlayer = this.props.currentPlayer.data();

        return players.map(player => {
            if(player.inGame) {

                let isVoteMode = this.props.voteMode;
                let isCurrentPlayer = currentPlayer.name === player.name;
                let isCurrentPlayerMafia = currentPlayer.type === 'Mafia';
                let isMafia = player.type === 'Mafia';
                let votedOut = game.votedOut;

                if (isVoteMode && currentPlayer.inGame) {
                    if (!isCurrentPlayer) {
                        return (
                           <div className={"player vote-mode" + (currentPlayer.votingFor === player.name ? ' selected' : '')} onClick={() => this.castVote(player)}>
                               <div key={player.name} className="player-name">{player.name}</div>
                           </div>
                        )
                    }

                } else {
                    return (
                       <div
                          className={'player' + (isCurrentPlayer ? ' current-player' : '') + (player.name === votedOut ? ' player-out' : '')}>
                           {!isMafia && isCurrentPlayer && <div className="player-type"><Civilian/></div>}
                           {isMafia && isCurrentPlayerMafia && <div className="player-type"><Mafia/></div>}
                           <div key={player.name} className="player-name">{isCurrentPlayer ? 'You' : player.name}</div>
                           {player.ready && <div className='player-ready'><Tick/></div>}
                       </div>
                    )
                }
            }
        })

    }


    getPlayersWhoAreOut = () => {
        const { players, game } = this.props;
        let currentPlayer = this.props.currentPlayer.data();
        return players.map(player => {

            let isCurrentPlayer = currentPlayer.name === player.name;
            let isMafia = player.type === 'Mafia';
            let votedOut = game.votedOut;

            if(!player.inGame) {
                return (
                   <div
                      className={'player' + (isCurrentPlayer ? ' current-player' : '') + (player.name === votedOut ? ' player-out' : '')}>
                       {isMafia && <div className="player-type"><Mafia/></div>}
                       {!isMafia && <div className="player-type"><Civilian/></div>}
                       <div key={player.name} className="player-name">{isCurrentPlayer ? 'You' : player.name}</div>
                   </div>
                )
            }
        })

    }


    render(){

        return (
           <div className="players">

               <div className="players-ingame">
                   {this.getPlayers()}
               </div>

               {!this.props.voteMode && this.props.players.reduce( (x, player) => x || !player.inGame, false) &&
               <div className="players-out">
                   <div className="title">Out</div>
                   <div className="players">
                       {this.getPlayersWhoAreOut()}
                   </div>
               </div>
               }

           </div>
        )
    }
}

export default PlayerList;
