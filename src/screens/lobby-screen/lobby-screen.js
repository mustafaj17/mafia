import React, { Component } from 'react';
import './lobby-screen.css';
import MafiaTextLogo from "../../icons/mafia-text-logo-";
import LogoBig from "../../icons/LogoBig";

export default class LobbyScreen extends Component{
    render(){
        return(
            <div className='screen lobby-screen'>
					<MafiaTextLogo/>
					<div className="header">Select Game</div>
					<div className="games">
						{this.props.games}
					</div>
					<LogoBig/>
					<div className="new-game" onClick={this.props.createNewGame}>
						<div className="new-game-btn">+</div>
						<div className="new-game-btn-text">start new game</div>

					</div>
				</div>
        )
    }
}
