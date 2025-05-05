import { createMachine } from 'xstate';

const tilePlacementFSM = createMachine({
    id: 'tilePlacementFSM',
    initial: 'path',
    context: {},
    states: {
        'path': {
            on: {
                'continue': 'path',
                'branch': 'branch',
            }
        },
        'branch': {
            on: {
                'continueBranch': 'branch',
                'branchBranch': 'branch',
                'pipe': 'path',
                'loopback': 'path',
            }
        }
    }
});

export default tilePlacementFSM;