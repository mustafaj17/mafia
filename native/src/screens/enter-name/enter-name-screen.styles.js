import { StyleSheet } from 'react-native';

export default StyleSheet.create(
	{ 'enter-name-screen':
			{ display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				marginTop: 48, },
		'header':
			{ fontSize: 48, color: '#01FFC2', marginBottom: 12 },
		'mafia-text-logo':
			{ marginBottom: 24 },
		logo:
			{ marginBottom: 70 },
		'form-holder':
			{ display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column' },
		'input-title':
			{ color: '#ffffff',
				fontSize: 18
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
				borderRadius: 50,
				backgroundColor: '#00FFC2',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				shadowOffset: { width: 0, height: 4 },
				shadowRadius: 4,
				shadowColor: 'rgba(0, 0, 0, 0.25)',
				shadowOpacity: 1,
				fontSize: 16,
				color: '#000000',
				marginTop: 30 },
      background: {
			position: 'absolute',
			flex: 1,
			resizeMode: 'cover'
      }
	}
);
