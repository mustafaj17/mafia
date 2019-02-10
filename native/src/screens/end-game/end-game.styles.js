import { StyleSheet } from 'react-native';

export default StyleSheet.create(
    { 'game-screen':
            { display: 'flex',
                height: '100%',
                width: '100%',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: 24,
                zIndex:2,
                position: 'relative'},
        'ready-button':
            { width: 250,
                height: 40,
                color: '#161616',
                backgroundColor: '#00FFC2',
                shadowOffset: { width: 2, height: 4 },
                shadowRadius: 2,
                shadowColor: 'rgba(34, 23, 83, 0.27)',
                shadowOpacity: 1,
                borderRadius: 4,
                marginBottom: 16,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            },
        'ready-text':
            {
                paddingRight: 8,
                letterSpacing: 1
            },
        'ready-button-container':{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            bottom: '5%',
        },
        'winner-view':
            {
                marginTop: 16,
                width: '95%',
                height: 100,
                backgroundColor: '#e6fff9',
                shadowOffset: { width: 2, height: 4 },
                shadowRadius: 2,
                shadowColor: 'rgba(34, 23, 83, 0.27)',
                shadowOpacity: 1,
                borderRadius: 4,
                marginBottom: 32,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                left: 0,
            },
        'winner-text': {
            fontSize: 30,
            color: "#000000",
            letterSpacing: 3,
            fontWeight: 'bold'
        },
		'sub-heading-text': {
            fontSize: 20,
            color: "white",
            letterSpacing: 2,
            fontWeight: 'bold'
        },
        'sub-heading': {
            margin: 4
        },
        'player':
            { width: 250,
                height: 40,
                color: '#161616',
                backgroundColor: '#FFFFFF',
                shadowOffset: { width: 2, height: 4 },
                shadowRadius: 2,
                shadowColor: 'rgba(34, 23, 83, 0.27)',
                shadowOpacity: 1,
                borderRadius: 4,
                marginBottom: 16,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row'
            },
        'title-container':
            {
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                top: 130,
                bottom: 120
            },
        'type-icon':
            {
                height: 30,
                width: 30
            },
    }
);
