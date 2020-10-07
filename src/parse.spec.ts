import * as assert from 'assert';
import { parseBoard } from './parse';
import { Instruction, Orientation } from './mower';

describe('parse', () => {
    it('should parse a board', () => {
        const board = `
10 10
4 5 E
LFRFFF
3 3 N
FFRRF
9 8 S
LRLF
        `.trim();
        assert.deepStrictEqual(parseBoard(board), {
            limit: {
                x: 10,
                y: 10
            },
            mowersInstructions: [
                {
                    mower: {
                        coordinates: {
                            x: 4,
                            y: 5
                        },
                        orientation: Orientation.East
                    },
                    instructions: [
                        Instruction.L,
                        Instruction.F,
                        Instruction.R,
                        Instruction.F,
                        Instruction.F,
                        Instruction.F
                    ]
                },
                {
                    mower: {
                        coordinates: {
                            x: 3,
                            y: 3
                        },
                        orientation: Orientation.North
                    },
                    instructions: [
                        Instruction.F,
                        Instruction.F,
                        Instruction.R,
                        Instruction.R,
                        Instruction.F
                    ]
                },
                {
                    mower: {
                        coordinates: {
                            x: 9,
                            y: 8
                        },
                        orientation: Orientation.South
                    },
                    instructions: [Instruction.L, Instruction.R, Instruction.L, Instruction.F]
                }
            ]
        });
    });

    it('should throw with an incorrect board', () => {
        const board = `
2 2
4 5 E
        `.trim();

        assert.throws(
            () => {
                parseBoard(board);
            },
            {
                message: 'Could not parse board'
            }
        );
    });
});
