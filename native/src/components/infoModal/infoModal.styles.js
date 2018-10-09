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
				backgroundColor: '#D4D4D4',
				width: 307,
				height: 500,
				borderWidth: 1,
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
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%'

			},
        titleSub:
            {
                marginBottom: 10,
                display: 'flex',
                justifyContent: 'center',
                width: '100%'

            },
		'title-text':
			{
				fontSize: 24,
				color: '#000000'
			},
		'ok-btn':
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
				marginTop: 5
			},
		'ok-btn-text':
			{
				fontSize: 16,
				color: '#000000'
			},
		'sub-text': {
				marginTop: 12,
          		fontSize: 12,
				letterSpacing:2,
		},
        'sub-text-center': {
            marginTop: 8,
			textAlign: 'center',
            fontSize: 12,
            letterSpacing:3,
			fontWeight: 'bold'

        },
		icon:{
			width: 27,
			height: 16.75,
            resizeMode: 'contain',
		}
	}
);
