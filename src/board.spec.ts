import * as assert from 'assert';
import { resolveBoard } from './board';
import { parseBoard } from './parse';

describe('board', () => {
    it('should solve a board', async () => {
        const board = `
3 3
1 0 N
FLFLF
3 3 N
FLLFRF
        `;

        const result = await resolveBoard(parseBoard(board));

        assert.strictEqual(
            result,
            `
0 0 S
2 2 W
        `.trim()
        );
    });

    it('should ignore a mower move if another mower is already present', async () => {
        const board = `
3 3
1 1 N
L
2 2 W
FLF
        `;

        const result = await resolveBoard(parseBoard(board));

        assert.deepStrictEqual(
            result,
            `
1 1 W
1 2 S
        `.trim()
        );
    });
});
