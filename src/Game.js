import React from 'react';
import logo from './logo.svg';
import './App.css';
//import {VexTab, Artist, Vex} from 'vextab';
import Vex from 'vexflow';
import RoundResult from './RoundResult';

const VF = Vex.Flow;

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			score: 0,
			currentRound: 0,
			totalRounds: 30,
			enteredData: "",
			currentNote: "C",
			roundResult: true,
			state: "playing", //possible states are "playing", "result"
		};
		this.possibleNotes = ["A", "B", "C", "D", "E", "F", "G"];

		this.dataEntered = this.dataEntered.bind(this);
		this.guessPlayed = this.guessPlayed.bind(this);
		this.startRound = this.startRound.bind(this);
		
	}

	dataEntered(e) {
		this.setState({
			enteredData: e.target.value
		});
	}

	componentDidMount() {
		this.startRound();
	}

	startRound() {
		let currentNote = this.possibleNotes[Math.floor(Math.random()*this.possibleNotes.length)];
		console.log(currentNote);
		this.drawNote(currentNote);
		this.setState({
			state: "playing",
			currentRound: this.state.currentRound + 1,
			currentNote: currentNote
		});
	}

	clearStaff(){
		let staff = document.getElementById("boo");
		while (staff.hasChildNodes()) {
			staff.removeChild(staff.lastChild);
		}
	}

	guessPlayed(e) {
		e.preventDefault();
		let score = this.state.score;
		let correct = false;
		if (this.state.currentNote == this.state.enteredData.toUpperCase()){
			console.log("Yeah!");
			correct = true;
			score++;
		}

		this.setState({
			score: score,
			roundResult: correct,
			state: "roundEnd",
			enteredData: "",
		});
		
	}

	drawNote(note){
		this.clearStaff();
		let vf = new VF.Factory({renderer: {elementId: 'boo'}});
		let system = vf.System();
		let score = vf.EasyScore();
		console.log(`${note}5/w`);
		system.addStave({
			voices: [
				score.voice(score.notes(`${note}5/w`)),
			]
		});
		vf.draw();
	}

	
	render() {
		return (
			<div className="App" >
				<h2>Current Round: {this.state.currentRound}/{this.state.totalRounds}</h2>
				<h3>Score: {this.state.score}</h3>
				<div id="boo"></div>
				{this.state.state == "playing" ? 
					<form onSubmit={this.guessPlayed}>
						<input type="text" value={this.state.enteredData} onChange={this.dataEntered} />
					</form>
					 :
					<div>
						<RoundResult correct={this.state.roundResult} answer={this.state.currentNote} />
						<button onClick={this.startRound}>Next round</button>
					</div>
					
				}
				
			</div>
		)
	}

}

export default Game;
