import * as assert from 'assert';
import { Worker } from 'worker_threads';
import { Instruction, Orientation } from './mower';
import { MowerMessageTypes } from './messages';

describe('mowerThread', () => {
    it('should post a message with new coordinates', (done) => {
        const worker = new Worker(`${__dirname}/mowerThread.js`, {
            workerData: {
                mower: {
                    coordinates: {
                        x: 4,
                        y: 4
                    },
                    orientation: Orientation.West
                },
                instructions: [Instruction.L, Instruction.F, Instruction.R],
                limit: {
                    x: 8,
                    y: 8
                }
            }
        });

        worker.on('message', (message) => {
            worker.terminate();

            assert.deepStrictEqual(message, {
                type: MowerMessageTypes.NewCoordinates,
                currentCoordinates: {
                    x: 4,
                    y: 4
                },
                newCoordinates: {
                    x: 4,
                    y: 3
                }
            });

            done();
        });
    });

    it('should post a message when done executing instructions', (done) => {
        const worker = new Worker(`${__dirname}/mowerThread.js`, {
            workerData: {
                mower: {
                    coordinates: {
                        x: 4,
                        y: 4
                    },
                    orientation: Orientation.West
                },
                instructions: [Instruction.R],
                limit: {
                    x: 8,
                    y: 8
                }
            }
        });

        worker.on('message', (message) => {
            assert.deepStrictEqual(message, {
                type: MowerMessageTypes.Done,
                mower: {
                    coordinates: {
                        x: 4,
                        y: 4
                    },
                    orientation: Orientation.North
                }
            });

            done();
        });
    });
});
