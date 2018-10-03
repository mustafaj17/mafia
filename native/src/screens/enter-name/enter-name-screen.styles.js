import { StyleSheet } from 'react-native';

export default StyleSheet.create(
	{ 'enter-name-screen':
			{ display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				height: '100%',
				position: 'relative',
				paddingTop: 56
			},
		'header':
			{ fontSize: 48, color: '#01FFC2', marginBottom: 12 },
		'mafia-text':
			{
				width: 179,
				height: 57,
				resizeMode: 'contain',
				marginBottom: 24
			},
		logo:
			{
				width: 123,
				height: 80,
				resizeMode: 'contain'
			},
		'form-holder':
			{
				marginTop: 70,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column' },
		'input-title':
			{ color: '#ffffff',
				fontSize: 18,
				letterSpacing: 2
			},
		'input-text-box':
			{ backgroundColor: '#ffffff',
				shadowOffset: { width: 0, height: 4 },
				shadowRadius: 4,
				shadowColor: 'rgba(0, 0, 0, 0.25)',
				shadowOpacity: 1,
				borderRadius: 2,
				width: 270,
				height: 45,
				borderWidth: 0,
				borderColor: 'black',
				borderStyle: 'solid',
				textAlign: 'center',
				fontSize: 14,
				color: '#161616',
				marginTop: 16 },
		'ok-btn':
			{ width: 58,
				height: 58,
				marginTop: 30 },
		'back-btn': {
			position: 'absolute',
			top: 20,
			left: 20
		}
	}
);
