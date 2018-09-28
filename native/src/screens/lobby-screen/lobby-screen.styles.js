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
        'game':
            { width: 250,
                height: 40,
                fontSize: 14,
                color: '#161616',
                backgroundColor: '#FFFFFF',
                shadowOffset: { width: 2, height: 4 },
                shadowRadius: 4,
                shadowColor: 'rgba(34, 23, 83, 0.27)',
                shadowOpacity: 1,
                borderRadius: 4,
                marginBottom: 16,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center'
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
        'header': { fontSize: 18, color: '#EFEFEF', marginLeft: 8, paddingTop: 8 },
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
            }
    }
);
