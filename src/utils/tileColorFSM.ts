import { createMachine } from 'xstate';

const tileColorFSM = createMachine({
    id: 'tileColorFSM',
    initial: 'blue',
    context: {},
    states: {
        'blue': {
            on: {
                'continueBlue': 'blue',
                'changeRed': 'red',
                'changeEvent': 'event',
            }
        },
        'red': {
            on: {
                'continueRed': 'red',
                'changeBlue': 'blue',
                'changeEvent': 'event',
            }
        },
        'event': {
            on: {
                'continueEvent': 'event',
                'changeBlue': 'blue',
                'changeRed': 'red',
            }
        },
        'star': {
            on: {
                'changeBlue': 'blue',
            }
        },
        'start': {
            on: {
                'changeBlue': 'blue',
            }
        },
    }
});

export default tileColorFSM;