import React, { Component } from 'react';
import './modal.css';
import GunIcon from "../../icons/GunIcon";

export default class Modal extends Component{
    render(){
        return(
            <div className='modal'>
					<div className="modal-box">
						<div className="title">You’re a Mafia</div>
						<GunIcon/>
						<div className="ok-btn">ok</div>

					</div>
				</div>
        )
    }
}
