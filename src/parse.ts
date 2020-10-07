import { IMower, Instruction, IPoint, Orientation } from './mower';
import { IBoard } from './board';

function parseMower(mower: string): IMower {
    const [x, y, orientation] = mower.split(' ');

    return {
        coordinates: {
            x: parseInt(x, 10),
            y: parseInt(y, 10)
        },
        orientation: orientation as Orientation
    };
}

export function parseBoard(input: string): IBoard {
    try {
        const rows = input.trim().split('\n');
        const [endX, endY] = rows[0].split(' ').map((x) => parseInt(x, 10));
        const mowersInstructions = [];

        for (let i = 1; i < rows.length; i += 2) {
            mowersInstructions.push({
                mower: parseMower(rows[i]),
                instructions: rows[i + 1].split('') as Instruction[]
            });
        }

        return {
            limit: {
                x: endX,
                y: endY
            },
            mowersInstructions
        };
    } catch {
        throw new Error('Could not parse board');
    }
}
