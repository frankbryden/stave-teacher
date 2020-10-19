import React from 'react';
import './App.css';
import Game from './Game';
import 'antd/dist/antd.css';
import { InputNumber, Form, Button, Layout, Row, Col } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			inMenu: true,
			roundCount: 5,
		};
		this.possibleNotes = ["A", "B", "C", "D", "E", "F", "G"];

		this.startGame = this.startGame.bind(this);
		this.roundCountChange = this.roundCountChange.bind(this);
	}

	roundCountChange(value) {
		this.setState({
			roundCount: value
		});
	}


	startGame() {
		this.setState({
			inMenu: false
		});
	}


	render() {
		return (
			<div className="App" >
				{this.state.inMenu ?
					<div>
						<Layout>
							<Content>
								<Row>
								</Row>
								<Form
									layout={{ labelCol: { span: 4 }, wrapperCol: { span: 8 } }}
									name="gameConfig"
									onFinish={this.startGame}
								>
									<Form.Item
										label="Number of rounds"
										name="roundCount"
										rules={[{ required: true }]}>
										<InputNumber min={1} max={30} value={this.state.roundCount} onChange={this.roundCountChange} />
									</Form.Item>
								</Form>
								<Form.Item>
									<Button type="primary" htmlType="submit">
										Submit
        					</Button>
								</Form.Item>
							</Content>
						</Layout>

						<button onClick={this.startGame}>Start game</button>
					</div>

					:
					<Game />
				}
			</div>
		)
	}

}

export default App;
