import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { styles } from './styles';
import { Canvas, Group, Rect } from '@shopify/react-native-skia';
import {
    CAR_HEIGHT,
    CAR_WIDTH,
    DEVICE_HEIGHT,
    DEVICE_WIDTH,
    INITIAL_SPEED,
    LANE_CENTERS,
    LANE_WIDTH,
    MIN_SPAWN_INTERVAL,
    Obstacle,
    OBSTACLE_HEIGHT,
    OBSTACLE_IMAGES,
    ROAD_LINE_GAP,
    ROAD_LINE_HEIGHT,
    RoadLine,
    SPEED_INCREMENT
} from '../../constants/game-animation';
import {
    Gesture,
    GestureDetector,
    GestureHandlerRootView
} from 'react-native-gesture-handler';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';
import { CARS } from '../../assets/images';

const GarGameWithSkia = () => {
    const [score, setScore] = useState(0);
    const [speed, setSpeed] = useState(INITIAL_SPEED);
    const [roadLines, setRoadLines] = useState<Array<RoadLine>>([]);
    const [gameOver, setGameOver] = useState(false);
    const [obstacles, setObstacles] = useState<Array<Obstacle>>([]);

    const playerY = DEVICE_HEIGHT - CAR_HEIGHT - 20;
    const playerX = useSharedValue(LANE_CENTERS[1]);
    const lastSpawnTime = useSharedValue(0);

    useEffect(() => {
        const totalLines = Math.ceil(DEVICE_HEIGHT / (ROAD_LINE_HEIGHT + ROAD_LINE_GAP)) + 1;
        const lines: RoadLine[] = [];

        for (let i = 0; i < totalLines; i++) {
            lines.push({
                id: `road-line-${i}`,
                y: i * (ROAD_LINE_HEIGHT + ROAD_LINE_GAP) - ROAD_LINE_HEIGHT
            });
        }

        setRoadLines(lines);
    }, []);

    const getSafeLanes = useCallback(() => {
        const dangerZone = DEVICE_HEIGHT / 2;
        const occupiedLanes = new Set(
            obstacles.filter(obs => obs.y < dangerZone).map(obs => obs.lane)
        );

        return [0, 1, 2].filter((lane) => {
            if (occupiedLanes.has(lane)) return false;

            const leftLane = lane - 1;
            const rightLane = lane + 1;
            const adjacentBlocked =
                (leftLane >= 0 && occupiedLanes.has(leftLane)) &&
                (rightLane <= 2 && occupiedLanes.has(rightLane));

            return !adjacentBlocked;
        });
    }, [obstacles]);

    const spawnObstacle = useCallback(() => {
        const now = Date.now();
        if (now - lastSpawnTime.value < MIN_SPAWN_INTERVAL) return;

        const safeLanes = getSafeLanes();
        if (safeLanes.length === 0) return;

        const randomLane = safeLanes[Math.floor(Math.random() * safeLanes.length)];
        const obstacleSpeed = speed + (Math.random() - 0.5);
        const randomImage = OBSTACLE_IMAGES[Math.floor(Math.random() * OBSTACLE_IMAGES.length)];

        const obstacle = {
            id: `obstacle-${Date.now()}-${Math.random().toString(36).slice(2)}`,
            lane: randomLane,
            x: LANE_CENTERS[randomLane],
            y: -OBSTACLE_HEIGHT,
            speed: obstacleSpeed,
            image: randomImage
        };

        setObstacles(prev => [...prev, obstacle]);
        lastSpawnTime.value = now;
    }, [speed, getSafeLanes]);

    const resetGame = () => {
        setGameOver(false);
        setScore(0);
        setSpeed(INITIAL_SPEED);
        playerX.value = withSpring(LANE_CENTERS[1]);
        setObstacles([]);
        lastSpawnTime.value = 0;
    };

    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            const currentLine = LANE_CENTERS.findIndex(center => center === playerX.value);
            const targetLine = Math.max(
                0,
                Math.min(2, Math.round((playerX.value + e.translationX) / LANE_WIDTH))
            );

            if (currentLine !== targetLine) {
                playerX.value = withSpring(LANE_CENTERS[targetLine], {
                    damping: 20,
                    stiffness: 200
                });
            }
        })
        .activeOffsetX([-10, 10]);

    const playerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: playerX.value }]
    }));

    useEffect(() => {
        if (gameOver) return;

        const gameLoop = setInterval(() => {
            // Increase speed gradually
            setSpeed(prev => Math.min(prev + SPEED_INCREMENT / 100, 8));

            // Move road lines
            setRoadLines(prev =>
                prev.map(line => {
                    const newY = line.y + speed;
                    return {
                        ...line,
                        y: newY > DEVICE_HEIGHT ? -ROAD_LINE_HEIGHT : newY
                    };
                })
            );

            // Randomly spawn obstacles
            const spawnChance = Math.min(0.05 + score / 2000, 0.15);
            if (Math.random() < spawnChance) {
                spawnObstacle();
            }

            // Update obstacle positions and detect collisions
            setObstacles(prev => {
                let collided = false;
                let scoreIncrement = 0;

                const updated = prev
                    .map(obs => {
                        const newY = obs.y + obs.speed;

                        const carOverlap = newY + OBSTACLE_HEIGHT > playerY && newY < playerY + CAR_HEIGHT;
                        const laneOverlap = Math.abs(obs.x - playerX.value) < CAR_WIDTH * 0.9;

                        if (carOverlap && laneOverlap) collided = true;

                        return {
                            ...obs,
                            y: newY
                        };
                    })
                    .filter(obs => {
                        const offScreen = obs.y > DEVICE_HEIGHT;
                        if (offScreen) scoreIncrement++;
                        return !offScreen;
                    });

                if (collided) setGameOver(true);
                if (scoreIncrement > 0) setScore(prev => prev + scoreIncrement);

                return updated;
            });
        }, 16);

        return () => clearInterval(gameLoop);
    }, [gameOver, speed, spawnObstacle]);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <View style={styles.container}>
                {/* Background and road lines */}
                <Canvas style={styles.canvas}>
                    <Rect x={0} y={0} width={DEVICE_WIDTH} height={DEVICE_HEIGHT} color="#333" />
                    <Group>
                        {roadLines.map(roadline => (
                            <React.Fragment key={roadline.id}>
                                <Rect
                                    x={LANE_WIDTH - 5}
                                    y={roadline.y}
                                    width={10}
                                    height={ROAD_LINE_HEIGHT}
                                    color="#fff"
                                />
                                <Rect
                                    x={LANE_WIDTH * 2 - 5}
                                    y={roadline.y}
                                    width={10}
                                    height={ROAD_LINE_HEIGHT}
                                    color="#fff"
                                />
                            </React.Fragment>
                        ))}
                    </Group>
                </Canvas>

                {/* Player Car */}
                <GestureDetector gesture={panGesture}>
                    <Animated.View
                        style={[
                            styles.playerCar,
                            playerStyle,
                            {
                                position: 'absolute',
                                bottom: 20,
                                width: CAR_WIDTH,
                                height: CAR_HEIGHT
                            }
                        ]}
                    >
                        <Image
                            source={CARS.audi}
                            style={{
                                width: CAR_WIDTH,
                                height: CAR_HEIGHT,
                                resizeMode: 'contain'
                            }}
                        />
                    </Animated.View>
                </GestureDetector>

                {/* Obstacles */}
                {obstacles.map(obstacle => (
                    <Image
                        key={obstacle.id}
                        source={obstacle.image}
                        style={{
                            width: CAR_WIDTH,
                            height: CAR_HEIGHT,
                            position: 'absolute',
                            resizeMode: 'contain',
                            left: obstacle.x,
                            top: obstacle.y,
                            zIndex: 1
                        }}
                    />
                ))}

                {/* Score HUD */}
                <View style={styles.scoreDisplay}>
                    <Text style={styles.scoreText}>Score: {score}</Text>
                    <Text style={styles.speedText}>Speed: {speed.toFixed(1)}X</Text>
                </View>

                {/* Game Over Screen */}
                {gameOver && (
                    <View style={styles.gameOver}>
                        <Text style={styles.gameOverText}>Game Over!</Text>
                        <Text style={styles.scoreText}>Score: {score}</Text>
                        <TouchableOpacity style={styles.playAgainButton} onPress={resetGame}>
                            <Text style={styles.playAgainText}>Play Again</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        </GestureHandlerRootView>
    );
};

export default GarGameWithSkia;
