import { StyleSheet } from 'react-native';

export default StyleSheet.create(
	{ 'lobby-screen':
			{ display: 'flex',
				height: '100%',
				width: '100%',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				marginTop: 24,
				position: 'relative'
			},
		'mafia-text': {
			width: 179,
			height: 57,
			resizeMode: 'contain'
		},
		'info': {
			position: 'absolute',
			resizeMode: 'contain',
			bottom: 40,
			right: 20,
			width: 58,
			height: 58,
			shadowOffset: { width: 0, height: 4 },
			shadowRadius: 4,
			shadowColor: 'rgba(0, 0, 0, 0.25)',
			shadowOpacity: 1,
		},
		'info-img': {
			resizeMode: 'contain',
			width: 58,
			height: 58,
			shadowOffset: { width: 0, height: 4 },
			shadowRadius: 4,
			shadowColor: 'rgba(0, 0, 0, 0.25)',
			shadowOpacity: 1,
		},
		logo:
			{
				width: 123,
				height: 80,
				resizeMode: 'contain'
			},
		'header': { fontSize: 18, color: '#EFEFEF', paddingTop: 8, paddingBottom: 8, letterSpacing: 3 },
		'button-container': {
			display: 'flex',
			width: '100%',
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		'button-mid': {
			position: 'relative',
			backgroundColor: 'red',
		},
		'logo-container': {
			display: 'flex',
			justifyContent:'center',
			alignItems: 'center'
		},
		'input-box': {
			position: 'absolute',
			width: 250,
			height: 50,
			backgroundColor: 'white',
			marginLeft: -125,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			zIndex: -1,
			marginTop: -25,
			textAlign: 'center',
			fontSize: 18,
			letterSpacing: 2,
			borderRadius: 2

		},
		'text-box-touch': {
			position: 'absolute',
			width: 250,
			height: 50,
			backgroundColor: '#00FFC2',
			shadowOffset: { width: 0, height: 4 },
			shadowRadius: 4,
			shadowColor: 'rgba(0, 0, 0, 0.25)',
			shadowOpacity: 1,
			marginLeft: -125,
			marginTop: -25,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: 2,
			zIndex: -1
		},
		'text-box': {
			display: 'flex',
			justifyContent: 'center',
			textAlign: 'center',
			fontSize: 18,
			letterSpacing: 2,

		}
	}
);
