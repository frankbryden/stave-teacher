import React from 'react';
import './App.css';

class RoundResult extends React.Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div>
				<p className={this.props.correct? "correct" : "incorrect"}>{this.props.correct? "Correct answer!" : "Incorrect :("}</p>
			</div>
		)
	}
}

export default RoundResult;