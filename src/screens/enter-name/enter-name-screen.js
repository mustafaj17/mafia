import React, { Component } from 'react';
import Logo from "../../components/logo/logo";
import './enter-name-screen.css';
import MafiaTextLogo from "../../icons/mafia-text-logo-";

export default class EnterNameScreen extends Component{
    render(){
        return(
            <div className='screen enter-name-screen'>
					<MafiaTextLogo/>
					<Logo/>
					<div className="form-holder">
						<div className="input-title">Enter your name </div>
						<input type="text" className="input-text-box" value={this.props.inputUserName}
											 onChange={ e => this.props.updateName(e.target.value )}/>
						{/*{ (this.props.inputUserName && this.props.inputUserName.length > 2) &&*/
						<div className="ok-btn" onClick={this.props.createUser}>ok</div>}
					</div>
				</div>
        )
    }
}
