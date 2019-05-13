import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import reducer from './reducers';

// create a store
const store = createStore(reducer, applyMiddleware(promise));

// add a listener
store.subscribe(() => console.log(store.getState()));

// simple action creators
const incrementAction = () => ({ type: 'INCREMENT' });
const decrementAction = () => ({ type: 'DECREMENT' });

const dummyPromise = resolve => {
  setTimeout(() => {
    resolve(1);
  }, 1000);
};

// promise action creators
const delayedIncrement = () => ({
  type: 'INCREMENT',
  payload: new Promise(dummyPromise)
});

// dispatch actions
store.dispatch(delayedIncrement()).then(() => {
  console.log(store.getState());
});

// store.dispatch(incrementAction());
// store.dispatch(incrementAction());
// store.dispatch(incrementAction());
// store.dispatch(decrementAction());
