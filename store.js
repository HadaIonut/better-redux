import {actions} from "./actions";
import {eventParent} from "./eventToField"

export let store = {};
let subscribers = {};
let persistence = false;
let storageLocation = '';

const callAction = (action, payload) =>
    Promise.resolve(actions?.[action]?.(payload)?.(store)).then((newStore) => {
        console.log(newStore);
        store = newStore;
        updateLocalStorage();
    });

const generateRandomId = () => '_' + Math.random().toString(36).substr(2, 9);

const initLocalStorage = () => {
    if (!window[storageLocation].getItem('store')) window[storageLocation].setItem('store', JSON.stringify({}));
}

const getFromLocalStorage = () => JSON.parse(window[storageLocation].getItem('store'));

const updateLocalStorage = () => {
    if (persistence) window[storageLocation].setItem('store', JSON.stringify(store));
}

const initPersistence = () => {
    if (persistence) {
        initLocalStorage();
        store = {
            ...store,
            ...getFromLocalStorage()
        };
    }
}

export const initStore = (isPersistent, storageType = 'localStorage') => {
    persistence = isPersistent;
    storageLocation = storageType;
    if (!persistence) initLocalStorage();
}

export const initField = (event, defaultValue) => {
    store = {
        ...store,
        [event]: defaultValue,
    };
    initPersistence();
    return store;
}

export const publish = (event) => (payload) => () =>
    Promise.resolve(callAction(event, payload)).then(() =>
        subscribers?.[eventParent[event]]?.forEach?.((subscriber) => subscriber.callback(eventParent[event], store)));

export const subscribe = (event, callback) => {
    const uniqueId = generateRandomId()
    subscribers = {
        ...subscribers,
        [event]: [...(subscribers[event] ? subscribers[event] : []), {id: uniqueId, callback: callback}]
    };

    return () => {
        subscribers = {
            ...subscribers,
            [event]: subscribers[event].filter((subscriber) => subscriber.id !== uniqueId)
        }
    }
}
