import { StyleSheet } from 'react-native';

export default StyleSheet.create(
	{
		'app-holder': {
			display: 'flex', flexWrap: 'wrap'
		},
		app:
			{
				display: 'flex',
				width: '100%',
				height: '100%',
				position: 'relative',
				flexDirection: 'column',
				padding: 0,
				margin: 0,
				flex: 1,
			},
		'screen-title':
			{ paddingTop: 8,
				paddingRight: 8,
				paddingBottom: 8,
				paddingLeft: 8,
				marginTop: 8,
				marginRight: 8,
				marginBottom: 8,
				marginLeft: 8,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(20, 189, 235, 1)',
				fontSize: 18,
				color: 'white' },
		'footer-btn':
			{ display: 'flex',
				justifyContent: 'center',
				position: 'absolute',
				bottom: 0,
				left: 0,
				right: 0,
				backgroundColor: 'rgba(239, 62, 54, 1)',
				marginTop: 8,
				marginRight: 8,
				marginBottom: 8,
				marginLeft: 8,
				color: 'white',
				paddingTop: 15,
				paddingRight: 5,
				paddingBottom: 15,
				paddingLeft: 5 },
		'form-holder':
			{ display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				marginTop: 100 },
		'input-title':
			{ fontSize: 18,
				paddingTop: 8,
				paddingRight: 8,
				paddingBottom: 8,
				paddingLeft: 8,
				marginTop: 8,
				marginRight: 8,
				marginBottom: 8,
				marginLeft: 8 },
		'name-heading': { display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: 8 },
		'draw-game-text':
			{ paddingTop: 8,
				paddingRight: 8,
				paddingBottom: 4,
				paddingLeft: 8,
				marginTop: 8,
				marginRight: 'auto',
				marginBottom: 0,
				marginLeft: 'auto',
				backgroundColor: '#202020',
				color: '#f6f6f6' },
		'drawn-players':
			{ display: 'flex',
				flexDirection: 'row',
				flexWrap: 'wrap',
				paddingTop: 8,
				paddingRight: 8,
				paddingBottom: 8,
				paddingLeft: 8,
				justifyContent: 'center' },
		'player-draw':
			{ paddingTop: 8,
				paddingRight: 8,
				paddingBottom: 8,
				paddingLeft: 8,
				marginTop: 4,
				marginRight: 4,
				marginBottom: 4,
				marginLeft: 4,
				backgroundColor: '#f0f0f0',
				textTransform: 'capitalize'
			},
		'loading-text':{
			letterSpacing:2,
			color: 'white',
			marginTop: 10
		},
		'player-draw':
			{	height: 40,
				marginRight: 16,
				marginLeft: 16,
				paddingRight:8,
				paddingLeft: 8,
				color: '#161616',
				backgroundColor: '#FFFFFF',
				shadowOffset: { width: 2, height: 4 },
				shadowRadius: 2,
				shadowColor: 'rgba(34, 23, 83, 0.27)',
				shadowOpacity: 1,
				borderRadius: 4,
				marginBottom: 16,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center'
			},
		'player-draw-container': {
			display: 'flex',
			flexDirection: 'row',
			flexWrap: 'wrap',
			alignItems: 'center',
			justifyContent: 'center'
		},
		'player-draw-text': {
			fontSize: 18,
			letterSpacing: 2
		}
	}
);
