import React from 'react';
import styled from 'styled-components/native';
import { Player, MediaStates } from "@react-native-community/audio-toolkit";

declare var global: { HermesInternal: null | {} };


interface IState {
	playerState: MediaStates;
	error: string;
}

class App extends React.Component<{}, IState> {

	private _player: Player;

	public state: IState = {
		playerState: MediaStates.IDLE,
		error: null
	};

	constructor( props: any ) {
		super( props );

		this.onPressPlay = this.onPressPlay.bind( this );
		this.update = this.update.bind( this );
	}

	public componentDidMount(): void {
		this._player = new Player("basis.mp3");
		
		setInterval( this.update, 1000 / 30 );
	}

	private onPressPlay(): void {
		if( this._player.state === MediaStates.PLAYING ) {
			this._player.pause()
		} else {
			this._player.play( ( err ) => {
				this.setState({ error: err.message });
			});
		}
	}

	private update(): void {
		this.setState({ playerState: this._player.state });
	}

	public render(): React.ReactNode {
		return (
			<Container>
				<Touch onPress={ this.onPressPlay }>
					<Text>{ this.state.playerState === MediaStates.PLAYING ? `Pause` : `Play` }</Text>
				</Touch>
				<StateText>{`Player State ${this.state.playerState.toString()}`}</StateText>
				{ this.state.error &&
					<Error>{`Player State ${ this.state.error }`}</Error>
				}
			</Container>
		)
	}
}

const Container = styled.View`
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
	color: #FFF;
	font-weight: bold;
	text-transform:uppercase;
	font-size: 18px;
`;

const StateText = styled.Text`
	font-size: 16px;
	color: #000;
	padding: 10px 20px;
	text-align: center;
`;

const Error = styled(StateText)`
	color: #FF0000;
`;

const Touch = styled.TouchableOpacity`
	padding: 15px 60px;
	background-color: orange;
	border-radius: 40px;
	margin-bottom: 20px;
`;

export default App;
