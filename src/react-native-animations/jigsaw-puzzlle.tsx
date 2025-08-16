import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, Image, Alert } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useSharedValue, withSpring, useAnimatedStyle, runOnJS } from 'react-native-reanimated';
import { Canvas, Image as SkiaImage, useImage, Path, ClipPath, Group } from '@shopify/react-native-skia';

const { width: SCREEN_W } = Dimensions.get('window');
const PADDING = 16;
const BOARD_SIZE = SCREEN_W - PADDING * 2;

// Configuration for puzzle difficulty/child-friendly options
const DEFAULT_ROWS = 3; // for kids keep 2-4
const DEFAULT_COLS = 3;
const SNAP_THRESHOLD = 30; // pixels to snap into correct place

type Piece = {
    id: string;
    row: number;
    col: number;
    x: number; // target x (on board)
    y: number; // target y (on board)
    width: number;
    height: number;
    rotation: number;
    placed: boolean;
};

// PieceView: single draggable/skia-clipped piece component
function PieceView({ piece, img, boardSize, snapThreshold, animatedMap, onPlaced }: any) {
    // retrieve shared values
    const vals = animatedMap.get(piece.id)!;

    // Create a Pan + Tap gesture
    const pan = Gesture.Pan()
        .onUpdate(e => {
            vals.tx.value = vals.tx.value + e.translationX;
            vals.ty.value = vals.ty.value + e.translationY;
        })
        .onEnd(() => {
            // if close enough to target slot, snap
            const dx = vals.tx.value - piece.col * piece.width;
            const dy = vals.ty.value - piece.row * piece.height;
            if (Math.hypot(dx, dy) < snapThreshold && Math.abs(vals.rot.value % 360) < 10) {
                vals.tx.value = withSpring(piece.col * piece.width, { stiffness: 150 });
                vals.ty.value = withSpring(piece.row * piece.height, { stiffness: 150 });
                vals.rot.value = withSpring(0, { stiffness: 120 });
                // mark placed after animation tick
                runOnJS(onPlaced)();
            } else {
                // gently snap back into bounds if dragged off-screen
                const minX = 0; const maxX = SCREEN_W - piece.width;
                const minY = 0; const maxY = boardSize + 400;
                if (vals.tx.value < minX) vals.tx.value = withSpring(minX);
                if (vals.tx.value > maxX) vals.tx.value = withSpring(maxX);
                if (vals.ty.value < minY) vals.ty.value = withSpring(minY);
                if (vals.ty.value > maxY) vals.ty.value = withSpring(maxY);
            }
        });

    const tap = Gesture.Tap().onEnd(() => {
        // rotate 90 degrees on each tap
        const newRot = (vals.rot.value + 90) % 360;
        vals.rot.value = withSpring(newRot, { stiffness: 200 });
    }).numberOfTaps(2);

    const gesture = Gesture.Simultaneous(pan, tap);

    const animatedStyle = useAnimatedStyle(() => ({
        position: 'absolute',
        left: vals.tx.value,
        top: vals.ty.value,
        width: piece.width,
        height: piece.height,
        transform: [{ rotate: `${vals.rot.value}deg` }],
        zIndex: 1000,
    }));

    // Skia clip path uses piece row/col to clip the image portion
    const clipPathD = `M0 0 H ${piece.width} V ${piece.height} H 0 Z`;

    return (
        <GestureDetector gesture={gesture} key={piece.id}>
            <Animated.View style={animatedStyle}>
                <Canvas style={{ width: piece.width, height: piece.height }}>
                    <Group>
                        <ClipPath>
                            {/* Using a rectangular clip matching piece bounds. For more jigsaw look, replace with a fun path */}
                            <Path path={clipPathD} />
                        </ClipPath>
                        {/* draw the same image but shifted so the piece shows correct area */}
                        <SkiaImage image={img} x={-piece.col * piece.width} y={-piece.row * piece.height} width={boardSize} height={boardSize} fit="cover" />
                    </Group>
                </Canvas>
            </Animated.View>
        </GestureDetector>
    );
}

const JigsawPuzzle = () => {

    const [rows, setRows] = useState(DEFAULT_ROWS);
    const [cols, setCols] = useState(DEFAULT_COLS);
    const [pieces, setPieces] = useState<Piece[]>([]);
    const [solvedCount, setSolvedCount] = useState(0);
    const [showPreview, setShowPreview] = useState(false);
    const img = useImage(require('../assets/images/pexels-3.jpg'));

    // Precompute piece size & board coords
    const pieceW = BOARD_SIZE / cols;
    const pieceH = BOARD_SIZE / rows;

    useEffect(() => {
        if (!img) return;
        // Generate pieces grid
        const arr: Piece[] = [];
        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                arr.push({
                    id: `${r}-${c}`,
                    row: r,
                    col: c,
                    x: c * pieceW,
                    y: r * pieceH,
                    width: pieceW,
                    height: pieceH,
                    rotation: Math.random() < 0.3 ? (Math.random() > 0.5 ? 90 : -90) : 0, // occasional rotation
                    placed: false,
                });
            }
        }
        // Shuffle starting positions around the board area
        const shuffled = arr.map(p => ({ ...p }));
        shuffled.forEach(p => {
            p.x = Math.random() * (SCREEN_W - pieceW - 40) + 20;
            p.y = BOARD_SIZE + 120 + Math.random() * 200; // place under board
        });

        setPieces(shuffled);
        setSolvedCount(0);
    }, [img, rows, cols]);

    // Shared animated values tracked in a dict by piece id
    const animatedMap = useMemo(() => new Map<string, { tx: any; ty: any; rot: any }>(), []);

    // Initialize shared values for each piece when pieces change
    useEffect(() => {
        pieces.forEach(p => {
            if (!animatedMap.has(p.id)) {
                const tx = useSharedValue(p.x);
                const ty = useSharedValue(p.y);
                const rot = useSharedValue(p.rotation);
                animatedMap.set(p.id, { tx, ty, rot });
            } else {
                const vals = animatedMap.get(p.id)!;
                // update positions when re-generated
                vals.tx.value = p.x;
                vals.ty.value = p.y;
                vals.rot.value = p.rotation;
            }
        });
    }, [pieces]);

    function checkSolved() {
        const count = pieces.filter(p => p.placed).length;
        setSolvedCount(count);
        if (count === rows * cols) {
            Alert.alert('🎉 Great job!', 'You completed the puzzle!', [{ text: 'Play again', onPress: resetGame }]);
        }
    }

    function resetGame() {
        // regenerate piece positions with small changes
        setPieces(prev => prev.map(p => ({ ...p, x: Math.random() * (SCREEN_W - p.width - 40) + 20, y: BOARD_SIZE + 120 + Math.random() * 200, placed: false, rotation: Math.random() < 0.3 ? (Math.random() > 0.5 ? 90 : -90) : 0 })));
        setSolvedCount(0);
    }

    if (!img) {
        return (
            <View style={styles.center}>
                <Text style={{ fontSize: 18 }}>Loading image...</Text>
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Jigsaw Puzzles — Fun for Kids</Text>

            <View style={styles.controlsRow}>
                <TouchableOpacity style={styles.controlBtn} onPress={() => { setShowPreview(v => !v); }}>
                    <Text style={styles.controlText}>{showPreview ? 'Hide preview' : 'Show preview'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn} onPress={() => { setRows(r => Math.max(2, r - 1)); setCols(c => Math.max(2, c - 1)); }}>
                    <Text style={styles.controlText}>Easier</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn} onPress={() => { setRows(r => Math.min(5, r + 1)); setCols(c => Math.min(5, c + 1)); }}>
                    <Text style={styles.controlText}>Harder</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn} onPress={resetGame}>
                    <Text style={styles.controlText}>Shuffle</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.boardWrap}>
                <View style={styles.board}>
                    {showPreview && (
                        <Image source={require('../assets/images/pexels-3.jpg')} style={[styles.board, { position: 'absolute', opacity: 0.25, zIndex: 0 }]} resizeMode="cover" />
                    )}

                    {/* Skia Canvas draws the target image inside board for accurate clip coords */}
                    <Canvas style={{ width: BOARD_SIZE, height: BOARD_SIZE }}>
                        <SkiaImage image={img} x={0} y={0} width={BOARD_SIZE} height={BOARD_SIZE} fit="cover" />
                    </Canvas>

                    {/* Render draggable pieces on top */}
                    {pieces.map(p => (
                        <PieceView
                            key={p.id}
                            piece={p}
                            img={img}
                            boardSize={BOARD_SIZE}
                            snapThreshold={SNAP_THRESHOLD}
                            animatedMap={animatedMap}
                            onPlaced={() => {
                                setPieces(prev => prev.map(it => it.id === p.id ? { ...it, placed: true, x: p.col * pieceW, y: p.row * pieceH } : it));
                                runOnJS(checkSolved)();
                            }}
                        />
                    ))}
                </View>
            </View>

            <Text style={styles.footer}>Placed: {solvedCount}/{rows * cols}</Text>

            <View style={styles.tipsRow}>
                <Text style={styles.tips}>Tip: Use 'Show preview' to see how the final picture looks. Tap a piece twice to rotate it.</Text>
            </View>
        </View>
    )
}

export default JigsawPuzzle

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f6f9ff', paddingTop: 40, paddingHorizontal: PADDING },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 22, fontWeight: '800', textAlign: 'center', marginBottom: 12 },
    controlsRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
    controlBtn: { backgroundColor: '#ff9052', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 10, marginHorizontal: 4 },
    controlText: { color: 'white', fontWeight: '700' },
    boardWrap: { alignItems: 'center', marginTop: 6 },
    board: { width: BOARD_SIZE, height: BOARD_SIZE, backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', borderWidth: 2, borderColor: '#e6e9f2' },
    footer: { textAlign: 'center', marginTop: 10, fontWeight: '700' },
    tipsRow: { marginTop: 8, paddingHorizontal: 6 },
    tips: { fontSize: 12, color: '#444', textAlign: 'center' },
});
