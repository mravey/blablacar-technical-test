import { IMower, Instruction, IPoint, mowerToString, pointToString } from './mower';
import { Worker } from 'worker_threads';
import { BoardMessageTypes, MowerMessage, MowerMessageTypes } from './messages';

export interface IBoard {
    limit: IPoint;
    mowersInstructions: Array<{
        mower: IMower;
        instructions: Instruction[];
    }>;
}

/*
Given a valid parsed board it will return a promise containing the resulting positions of each mower.
It launch one worker (thread) per mower. Each mower is responsible to apply its moves.
It has a map of coordinates to boolean to know where each mower is. When a mower when to move to
others coordinates it asks the board to know if the new coordinates are not already occupied.
 */
export function resolveBoard({ limit, mowersInstructions }: IBoard): Promise<string> {
    return new Promise((resolve) => {
        let numberOfDone = 0;
        const coordinatesHasMower: { [key: string]: boolean } = {};
        const results: string[] = [];

        mowersInstructions.forEach(({ mower, instructions }, index) => {
            const worker = new Worker(`${__dirname}/mowerThread.js`, {
                workerData: {
                    mower,
                    instructions,
                    limit
                }
            });

            worker.on('message', (message: MowerMessage) => {
                if (message.type === MowerMessageTypes.NewCoordinates) {
                    if (coordinatesHasMower[pointToString(message.newCoordinates)]) {
                        worker.postMessage({ type: BoardMessageTypes.DoNotUseCoordinates });
                    } else {
                        coordinatesHasMower[pointToString(message.currentCoordinates)] = false;
                        coordinatesHasMower[pointToString(message.newCoordinates)] = true;

                        worker.postMessage({
                            type: BoardMessageTypes.UseCoordinates,
                            coordinates: message.newCoordinates
                        });
                    }
                } else if (message.type === MowerMessageTypes.Done) {
                    numberOfDone++;

                    results[index] = mowerToString(message.mower);

                    if (numberOfDone === mowersInstructions.length) {
                        resolve(results.join('\n'));
                    }
                } else {
                    console.log(`Unhandled message type ${message} in main`);

                    process.exit(1);
                }
            });

            worker.on('exit', (code) => {
                if (code !== 0) {
                    console.log(`MowerThread exited with code ${code}`);

                    process.exit(1);
                }
            });

            coordinatesHasMower[pointToString(mower.coordinates)] = true;
        });
    });
}
