# better-redux

Better-redux is a custom state manager for React developed while I learned about pub-sub.

## Structure

For this state manger there are 2 main files you have to worry about.
The first is the actions file, this file contains all the actions that can be executed on the state.

Yes, async actions should also work.

The second is the eventToField file, this file links all actions to the store entries.

## How to initialize

In the `index.js` file you can call `initStore()` and `initField()`.

`initStore(state, location)` is called to set persistancy and to set the location where the data will be stored.

`initField(fieldName, defaultValue)` is called to set a new field in the store.

### Example

```
initStore(true, 'sessionStorage');
initField('counter', 0);
initField('otherCounter', {counter: 0});
```

## How to use

In components you can use `publish()` and `useSubscriber()`.

`publish(action)(payload)` returns a function that calls the given action with the given payload.

`useSubscriber(field)` returns a reactive value that should only be modified through an action.
