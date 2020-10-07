import { parentPort, workerData } from 'worker_threads';
import { applyForward, applyLeft, applyRight, IMower, Instruction, IPoint } from './mower';
import { assertUnreachable } from './assertUnreachable';
import { BoardMessage, BoardMessageTypes, MowerMessageTypes } from './messages';

/*
Launched by the board for each mower.
It receives the initial mower, the instructions to apply and the upper limit of the board.
When executing a F instruction it sends a message to the board to check if the new coordinates are
not already occupied by a mower.
When it's done executing all instructions it sends a done message to the board with the final mower
and shutdowns.
 */

let {
    mower,
    instructions,
    limit
}: { mower: IMower; instructions: Instruction[]; limit: IPoint } = workerData;

function processInstruction() {
    const instruction = instructions.shift();

    if (instruction === undefined) {
        parentPort.postMessage({
            type: MowerMessageTypes.Done,
            mower
        });

        process.exit();
    } else {
        switch (instruction) {
            case Instruction.L:
                mower = {
                    ...mower,
                    orientation: applyLeft(mower.orientation)
                };

                processInstruction();

                break;
            case Instruction.R:
                mower = {
                    ...mower,
                    orientation: applyRight(mower.orientation)
                };

                processInstruction();

                break;
            case Instruction.F:
                const newCoordinates = applyForward(mower.coordinates, mower.orientation, limit);

                parentPort.postMessage({
                    type: MowerMessageTypes.NewCoordinates,
                    currentCoordinates: mower.coordinates,
                    newCoordinates: newCoordinates
                });

                break;
            default:
                return assertUnreachable(instruction);
        }
    }
}

processInstruction();

parentPort.on('message', (message: BoardMessage) => {
    if (message.type === BoardMessageTypes.UseCoordinates) {
        mower.coordinates = message.coordinates;

        processInstruction();
    } else if (message.type === BoardMessageTypes.DoNotUseCoordinates) {
        processInstruction();
    } else {
        console.log(`Unhandled message type ${message} in mowerThread`);

        process.exit(1);
    }
});
