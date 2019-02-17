import { StyleSheet } from 'react-native';

export default StyleSheet.create(
	{ modal:
			{ backgroundColor: 'rgba(61, 61, 61, 0.91)',
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: 99,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center' },
		'modal-box':
			{
				backgroundColor: '#e6fff9',
				width: 307,
				borderWidth: 4,
				borderStyle: 'solid',
				borderColor: '#00FFC2',
				shadowOffset: { width: 0, height: 4 },
				shadowRadius: 4,
				shadowColor: 'rgba(0, 0, 0, 0.25)',
				shadowOpacity: 1,
				borderRadius: 4,
				paddingTop: 30,
				paddingRight: 30,
				paddingBottom: 30,
				paddingLeft: 30,
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center' },
		title:
			{
				textAlign: 'center',
				marginBottom: 40,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%'

			},
		'title-text':
			{
				fontSize: 24,
				color: '#000000'
			},
		'yes-btn':
			{
				width: 58,
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
				margin: 10
			},
		'no-btn':
			{
				width: 58,
				height: 58,
				borderRadius: 50,
				backgroundColor: '#e2e0e1',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				shadowOffset: { width: 0, height: 4 },
				shadowRadius: 4,
				shadowColor: 'rgba(0, 0, 0, 0.25)',
				shadowOpacity: 1,
				fontSize: 16,
				color: '#000000',
				margin: 10
			},
		'btn-text':
			{
				fontSize: 16,
				color: '#000000'
			},
		'button-holder':{
			display : 'flex',
			flexDirection: 'row'
		}
	}
);
