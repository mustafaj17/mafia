import React, { Component } from 'react';

export default class EndGameScreen extends Component{

    render(){

    	console.log(this.props.game);
    	console.log(this.props.players);
    	console.log(this.props.player);

        return(
            <div>
					Game has ended
				</div>
        )
    }
}
