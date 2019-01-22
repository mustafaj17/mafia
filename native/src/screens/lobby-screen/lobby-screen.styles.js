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
        'info': {
            position: 'absolute',
            resizeMode: 'contain',
            top: 10,
            right: 0,
            width: 58,
            height: 58,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 4,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            shadowOpacity: 1,
        },
        'info-img': {
            resizeMode: 'contain',
            width: 40,
            height: 40,
        },
        logo:
            {
                width: 123,
                height: 80,
                resizeMode: 'contain'
            },
        'mafia-text':{
            width: 123,
            resizeMode: 'contain',
            marginTop: -40
        },
        'header': { fontSize: 18, color: '#EFEFEF', paddingTop: 8, paddingBottom: 8, letterSpacing: 3 },
        'button-container': {
            display: 'flex',
            width: '100%',
            flex: 1,
            alignItems: 'center'
        },
        'button-container--top': {
            justifyContent: 'flex-end',
        },
        'button-container--bottom': {
        },
        'button-mid': {
            position: 'relative',
            backgroundColor: 'red',
        },
        'logo-container': {
            display: 'flex',
            justifyContent:'center',
            alignItems: 'center',
            marginTop: 60
        },
        'input-box': {
            width: 250,
            height: 50,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            fontSize: 18,
            letterSpacing: 2,
        },
        'text-box-touch': {
            width: 250,
            height: 50,
            backgroundColor: '#00FFC2',
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 4,
            shadowColor: 'rgba(0, 0, 0, 0.25)',
            shadowOpacity: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
        },
        'text-box': {
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: 18,
            letterSpacing: 2
        },
        'go-btn':{
            width: 50,
            height: 50,
            borderRadius: 25,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00FFC2',
            zIndex:2
        },
        'error-view': {
            margin: 10
        },
        'error-text': {
            color: '#ffa5a5',
			fontSize: 18,
			fontWeight: 'bold',
        }
    }
);
