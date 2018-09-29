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
                position: 'relative'},
        'games': { marginTop: 16, width: '100%', display: 'flex', alignItems: 'center'},
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
        'player-ready':
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
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row'
            },
        'player-vote':
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
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            },
        'player-selected':
            { width: 250,
                height: 40,
                color: '#161616',
                backgroundColor: '#837f7e',
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
        'game-text': {
            fontSize: 18,
        },
        'mafia-text-logo': { marginBottom: 24 },
        logo: { marginBottom: 70 },
        'new-game':
            {   justifyContent: 'center',
                alignItems: 'center',
                display: 'flex'},
        'new-game-btn':
            { width: 50,
                height: 50,
                backgroundColor: '#00FFC2',
                shadowOffset: { width: 0, height: 4 },
                shadowRadius: 4,
                shadowColor: 'rgba(0, 0, 0, 0.25)',
                shadowOpacity: 1,
                borderRadius: 50,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 36,
                color: '#4B4B4B' },
        'new-game-btn-text': { fontSize: 18, color: '#EFEFEF', marginLeft: 8 },
        'header': { fontSize: 18, color: '#EFEFEF', marginLeft: 8, paddingTop: 24, paddingBottom: 8 },
        'create-game-container':
            {
                position: 'absolute',
                bottom: '5%',
                left: '5%',
                display: 'flex',
                flexDirection: "row",
                alignItems: 'center'
            },
        'title-container':
            {
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                top: 0
            },
        'icon-name-container':
            {
                display: 'flex',
                flexDirection: 'row',
                paddingLeft: 8,
                alignItems: 'center'
            },
        'type-icon':
            {
                height: 30,
                width: 30
            },
        'ready-text':
            {
                paddingRight: 8
            },
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
                position: 'absolute',
                bottom: '5%',
                flexDirection: 'row',

            },
    }
);
