import React from 'react';
import { ActivityIndicator, Dimensions } from 'react-native';
import { PicturePuzzle, PuzzlePieces } from 'react-native-picture-puzzle';

const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('window');

export default function PicturePuzzleApp() {
    const [hidden, setHidden] = React.useState<number | null>(0); // piece to obscure
    const [pieces, setPieces] = React.useState<PuzzlePieces>([0, 1, 2, 3, 4, 5, 6, 7, 8]);
    const source = React.useMemo(() => ({
        uri: 'https://cdn.pixabay.com/photo/2024/12/29/00/12/dog-9297049_960_720.jpg',
    }), []);
    const renderLoading = React.useCallback((): JSX.Element => <ActivityIndicator />, []);
    const onChange = React.useCallback((nextPieces: PuzzlePieces, nextHidden: number | null): void => {
        setPieces(nextPieces);
        setHidden(nextHidden);
    }, [setPieces, setHidden]);

    console.log("DEVICE_WIDTH", DEVICE_WIDTH)
    return (
        <PicturePuzzle
            size={DEVICE_WIDTH}
            pieces={pieces}
            hidden={hidden}
            onChange={onChange}
            source={source}
            renderLoading={renderLoading}
            width={DEVICE_WIDTH}
        />
    );
}