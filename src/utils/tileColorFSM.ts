import { createMachine } from 'xstate';

const tileColorFSM = createMachine({
    id: 'tileColorFSM',
    initial: 'start',
    context: {},
    states: {
        'blue': {
            on: {
                'continueBlue': 'blue',
                'changeRed': 'red',
                'changeEvent': 'event',
                'changeStar': 'star',
            }
        },
        'red': {
            on: {
                'changeBlue': 'blue',
                'changeStar': 'star',
            }
        },
        'event': {
            on: {
                'continueEvent': 'event',
                'changeBlue': 'blue',
                'changeRed': 'red',
                'changeStar': 'star',
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