import { Dimensions } from "react-native";
import { CARS } from "../assets/images";

export const { width: DEVICE_WIDTH, height: DEVICE_HEIGHT } = Dimensions.get('screen');

export const LANE_WIDTH = DEVICE_WIDTH / 3;
export const CAR_WIDTH = LANE_WIDTH * 0.8;
export const CAR_HEIGHT = 100;
export const OBSTACLE_HEIGHT = 100;
export const INITIAL_SPEED = 3;
export const SPEED_INCREMENT = 0.2;
export const MIN_SPAWN_INTERVAL = 2000;
export const MAX_SPAWN_INTERVAL = 3500;
export const ROAD_LINE_HEIGHT = 80;
export const ROAD_LINE_GAP = 120;

export const LANE_CENTERS = [
    LANE_WIDTH / 2 - CAR_WIDTH / 2,
    LANE_WIDTH * 1.5 - CAR_WIDTH / 2,
    LANE_WIDTH * 2.5 - CAR_WIDTH / 2
]

export const OBSTACLE_IMAGES = Object.values(CARS);

export interface Obstacle {
    id: string;
    x: number;
    y: number;
    speed: number;
    lane: number;
    image: any;
}

export interface RoadLine {
    id: string;
    y: number;
}