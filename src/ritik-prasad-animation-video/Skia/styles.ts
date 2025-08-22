import { StyleSheet } from 'react-native';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../constants/game-animation';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    canvas: {
        position: 'absolute',
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        zIndex: 0,
    },
    playerCar: {
        zIndex: 3,
    },
    scoreDisplay: {
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 10,
        borderRadius: 10,
    },
    scoreText: {
        color: 'white',
        fontSize: 24,
        marginBottom: 5,
    },
    speedText: {
        color: 'white',
        fontSize: 16,
        marginTop: 5,
    },
    gameOver: {
        position: 'absolute',
        top: '40%',
        left: '20%',
        width: '60%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        zIndex: 5,
    },
    gameOverText: {
        color: 'white',
        fontSize: 28,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    playAgainButton: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    playAgainText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
