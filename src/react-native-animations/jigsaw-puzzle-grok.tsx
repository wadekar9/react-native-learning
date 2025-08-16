import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Dimensions, Text, TouchableOpacity, Vibration, Image } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';
import Sound from 'react-native-sound';
import ConfettiCannon from 'react-native-confetti-cannon';

const { width, height } = Dimensions.get('window');
const GRID_SIZE = 2; // 2x2 puzzle; increase for harder levels
const PIECE_SIZE = width / GRID_SIZE;
const IMAGE = require('../assets/images/pexels-3.jpg'); // Replace with your image
const SNAP_SOUND = require('../assets/sounds/snap.mp3');
const WIN_SOUND = require('../assets/sounds/win.mp3');
const SNAP_DISTANCE = 20; // Pixels close to snap
const SPRING_CONFIG = { damping: 20, stiffness: 200 };

// Configure react-native-sound
Sound.setCategory('Playback');

const generatePieces = () => {
    const pieces = [];
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            pieces.push({
                id: `${row}-${col}`,
                targetX: col * PIECE_SIZE,
                targetY: row * PIECE_SIZE,
                imageX: -col * PIECE_SIZE,
                imageY: -row * PIECE_SIZE,
                initialX: Math.random() * (width - PIECE_SIZE),
                initialY: Math.random() * (height / 2) + height / 2, // Scatter at bottom
            });
        }
    }
    return pieces;
};

export default function JigsawPuzzleGrok() {
    const [pieces, setPieces] = useState(generatePieces());
    const [locked, setLocked] = useState<any>({});
    const [completed, setCompleted] = useState(false);
    const confettiRef = useRef<ConfettiCannon | null>(null);
    const snapSound = useRef<Sound | null>(null);
    const winSound = useRef<Sound | null>(null);

    useEffect(() => {
        // Initialize sounds
        snapSound.current = new Sound(SNAP_SOUND, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load snap sound:', error);
            }
        });
        winSound.current = new Sound(WIN_SOUND, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Failed to load win sound:', error);
            }
        });

        return () => {
            // Release sounds
            snapSound.current?.release();
            winSound.current?.release();
        };
    }, []);

    const playSound = (sound: Sound) => {
        if (sound) {
            sound.play((success) => {
                if (!success) {
                    console.log('Sound playback failed');
                }
                sound.setCurrentTime(0); // Reset to start for next play
            });
        }
    };

    const checkCompletion = (newLocked: any) => {
        if (Object.keys(newLocked).length === pieces.length) {
            setCompleted(true);
            winSound.current && playSound(winSound.current);
            confettiRef.current?.start();
        }
    };

    const restart = () => {
        setPieces(generatePieces());
        setLocked({});
        setCompleted(false);
    };

    return (
        <View style={styles.container}>
            {/* Faint background hint */}
            <Image source={IMAGE} style={styles.background} />

            {pieces.map((piece) => {
                const translateX = useSharedValue(piece.initialX);
                const translateY = useSharedValue(piece.initialY);
                const isLocked = locked[piece.id];

                const panGesture = Gesture.Pan()
                    .onBegin(() => {
                        if (isLocked || completed) return;
                    })
                    .onUpdate((event) => {
                        if (isLocked || completed) return;
                        translateX.value = piece.initialX + event.translationX;
                        translateY.value = piece.initialY + event.translationY;
                    })
                    .onEnd(() => {
                        if (isLocked || completed) return;
                        const dx = Math.abs(translateX.value - piece.targetX);
                        const dy = Math.abs(translateY.value - piece.targetY);
                        if (dx < SNAP_DISTANCE && dy < SNAP_DISTANCE) {
                            translateX.value = withSpring(piece.targetX, SPRING_CONFIG);
                            translateY.value = withSpring(piece.targetY, SPRING_CONFIG);
                            setLocked((prev: any) => {
                                const newLocked = { ...prev, [piece.id]: true };
                                checkCompletion(newLocked);
                                return newLocked;
                            });
                            snapSound.current && playSound(snapSound.current);
                            Vibration.vibrate(100);
                        } else {
                            translateX.value = withSpring(translateX.value, SPRING_CONFIG);
                            translateY.value = withSpring(translateY.value, SPRING_CONFIG);
                        }
                    });

                const animatedStyle = useAnimatedStyle(() => ({
                    transform: [
                        { translateX: translateX.value },
                        { translateY: translateY.value },
                    ],
                    opacity: isLocked ? 1 : 0.9, // Slight transparency for movable pieces
                }));

                return (
                    <GestureDetector key={piece.id} gesture={panGesture}>
                        <Animated.View style={[styles.pieceContainer, animatedStyle]}>
                            <View style={styles.pieceClip}>
                                <Image
                                    source={IMAGE}
                                    style={[
                                        styles.pieceImage,
                                        { transform: [{ translateX: piece.imageX }, { translateY: piece.imageY }] },
                                    ]}
                                />
                            </View>
                        </Animated.View>
                    </GestureDetector>
                );
            })}

            {completed && (
                <View style={styles.overlay}>
                    <Text style={styles.winText}>Well Done! 🎉</Text>
                    <TouchableOpacity style={styles.button} onPress={restart}>
                        <Text style={styles.buttonText}>Play Again</Text>
                    </TouchableOpacity>
                </View>
            )}

            <ConfettiCannon
                count={200}
                origin={{ x: -10, y: 0 }}
                ref={confettiRef}
                autoStart={false}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        width: width,
        height: width, // Square puzzle
        opacity: 0.2,
        top: 100, // Position as needed
    },
    pieceContainer: {
        position: 'absolute',
        width: PIECE_SIZE,
        height: PIECE_SIZE,
    },
    pieceClip: {
        width: PIECE_SIZE,
        height: PIECE_SIZE,
        overflow: 'hidden',
    },
    pieceImage: {
        width: width,
        height: width,
        position: 'absolute',
    },
    overlay: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%',
        height: '100%',
    },
    winText: {
        fontSize: 40,
        color: 'white',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'green',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});