import { IMower, IPoint } from './mower';

export const enum MowerMessageTypes {
    NewCoordinates = 'newCoordinates',
    Done = 'done'
}

type NewCoordinates = {
    type: MowerMessageTypes.NewCoordinates;
    currentCoordinates: IPoint;
    newCoordinates: IPoint;
};

type MowerDone = {
    type: MowerMessageTypes.Done;
    mower: IMower;
};

export type MowerMessage = NewCoordinates | MowerDone;

export const enum BoardMessageTypes {
    UseCoordinates = 'useCoordinates',
    DoNotUseCoordinates = 'doNotUseCoordinates'
}

type UseCoordinates = {
    type: BoardMessageTypes.UseCoordinates;
    coordinates: IPoint;
};

type DoNotUseCoordinates = {
    type: BoardMessageTypes.DoNotUseCoordinates;
};

export type BoardMessage = UseCoordinates | DoNotUseCoordinates;
