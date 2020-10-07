import { assertUnreachable } from './assertUnreachable';

export const enum Orientation {
    North = 'N',
    South = 'S',
    East = 'E',
    West = 'W'
}

export const enum Instruction {
    L = 'L',
    R = 'R',
    F = 'F'
}

export interface IPoint {
    x: number;
    y: number;
}

export function pointToString(point: IPoint): string {
    return `${point.x}_${point.y}`;
}

export interface IMower {
    coordinates: IPoint;
    orientation: Orientation;
}

export function mowerToString(mower: IMower): string {
    return `${mower.coordinates.x} ${mower.coordinates.y} ${mower.orientation}`;
}

// returns the new orientation after applying a 90° left rotation
export function applyLeft(orientation: Orientation): Orientation {
    switch (orientation) {
        case Orientation.North:
            return Orientation.West;
        case Orientation.West:
            return Orientation.South;
        case Orientation.South:
            return Orientation.East;
        case Orientation.East:
            return Orientation.North;
        default:
            return assertUnreachable(orientation);
    }
}

// returns the new orientation after applying a 90° right rotation
export function applyRight(orientation: Orientation): Orientation {
    switch (orientation) {
        case Orientation.North:
            return Orientation.East;
        case Orientation.West:
            return Orientation.North;
        case Orientation.South:
            return Orientation.West;
        case Orientation.East:
            return Orientation.South;
        default:
            return assertUnreachable(orientation);
    }
}

// returns a new point after applying a forward move
// it makes sure to check that the new new point if with the limits (lower and upper) of the board
export function applyForward(point: IPoint, orientation: Orientation, limit: IPoint): IPoint {
    switch (orientation) {
        case Orientation.North:
            return {
                ...point,
                y: Math.min(limit.y, point.y + 1)
            };
        case Orientation.West:
            return {
                ...point,
                x: Math.max(0, point.x - 1)
            };
        case Orientation.South:
            return {
                ...point,
                y: Math.max(0, point.y - 1)
            };
        case Orientation.East:
            return {
                ...point,
                x: Math.min(limit.x, point.x + 1)
            };
        default:
            return assertUnreachable(orientation);
    }
}
