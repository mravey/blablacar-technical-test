import * as fs from 'fs';
import { parseBoard } from './parse';
import { resolveBoard } from './board';

try {
    const input = fs.readFileSync(`${__dirname}/../input.txt`).toString();
    const board = parseBoard(input);

    resolveBoard(board).then(
        (result) => {
            console.log(result);
        },
        (e) => {
            console.log(e);
        }
    );
} catch (e) {
    console.log(e);
}
