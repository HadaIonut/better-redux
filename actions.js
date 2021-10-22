export const actions = {
    'ADD_TO_COUNTER': (payload) => (state) => ({
        ...state,
        'counter': state['counter'] + payload,
    }),
    'REMOVE_FROM_COUNTER': (payload) => (state) => ({
        ...state,
        'counter': state['counter'] - payload,
    }),
    'ADD_TO_OTHERCOUNTER': (payload) => (state) => {
         return new Promise((resolve, reject) => {
            setTimeout(() => resolve({
                ...state,
                'otherCounter': {
                    'counter': state['otherCounter'].counter + payload
                },
            }), 1000)
        })

    },
    'REMOVE_FROM_OTHERCOUNTER': (payload) => (state) => ({
        ...state,
        'otherCounter': {
            'counter': state['otherCounter'].counter - payload
        },
    }),
    'test-event': (payload) => (state) => ({
        ...state,
        'test-event': {
            'value': state['test-event'].value + payload
        }
    })
}
