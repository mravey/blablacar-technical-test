import * as assert from 'assert';
import {
    applyForward,
    applyLeft,
    applyRight,
    IMower,
    IPoint,
    mowerToString,
    Orientation,
    pointToString
} from './mower';

describe('mower', () => {
    it('should serialize a point', () => {
        const point: IPoint = {
            x: 1,
            y: 4
        };

        assert.strictEqual(pointToString(point), '1_4');
    });

    it('should serialize a mower', () => {
        const mower: IMower = {
            coordinates: {
                x: 5,
                y: 8
            },
            orientation: Orientation.North
        };

        assert.strictEqual(mowerToString(mower), '5 8 N');
    });

    it('should apply a left rotation', () => {
        assert.strictEqual(applyLeft(Orientation.North), Orientation.West);
        assert.strictEqual(applyLeft(Orientation.West), Orientation.South);
        assert.strictEqual(applyLeft(Orientation.South), Orientation.East);
        assert.strictEqual(applyLeft(Orientation.East), Orientation.North);
    });

    it('should apply a right rotation', () => {
        assert.strictEqual(applyRight(Orientation.North), Orientation.East);
        assert.strictEqual(applyRight(Orientation.West), Orientation.North);
        assert.strictEqual(applyRight(Orientation.South), Orientation.West);
        assert.strictEqual(applyRight(Orientation.East), Orientation.South);
    });

    it('should apply a forward move', () => {
        const point: IPoint = {
            x: 4,
            y: 4
        };
        const limit: IPoint = {
            x: 8,
            y: 8
        };

        assert.deepStrictEqual(applyForward(point, Orientation.North, limit), {
            x: 4,
            y: 5
        });
        assert.deepStrictEqual(applyForward(point, Orientation.West, limit), {
            x: 3,
            y: 4
        });
        assert.deepStrictEqual(applyForward(point, Orientation.South, limit), {
            x: 4,
            y: 3
        });
        assert.deepStrictEqual(applyForward(point, Orientation.East, limit), {
            x: 5,
            y: 4
        });
    });

    it('should ignore a forward outside the upper limit', () => {
        const point: IPoint = {
            x: 4,
            y: 4
        };
        const limit: IPoint = {
            x: 4,
            y: 4
        };

        assert.deepStrictEqual(applyForward(point, Orientation.North, limit), {
            x: 4,
            y: 4
        });
        assert.deepStrictEqual(applyForward(point, Orientation.East, limit), {
            x: 4,
            y: 4
        });
    });

    it('should ignore a forward outisde the lower limit', () => {
        const point: IPoint = {
            x: 0,
            y: 0
        };
        const limit: IPoint = {
            x: 4,
            y: 4
        };

        assert.deepStrictEqual(applyForward(point, Orientation.South, limit), {
            x: 0,
            y: 0
        });
        assert.deepStrictEqual(applyForward(point, Orientation.West, limit), {
            x: 0,
            y: 0
        });
    });
});
