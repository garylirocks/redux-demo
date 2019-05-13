import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import thunk from 'redux-thunk';
import reducer from './reducers';

function myMiddleware({ getState }) {
  return next => action => {
    console.log('In My Middleware, action.type: ', action.type);

    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
}

// create a store
const store = createStore(
  reducer,
  applyMiddleware(...[myMiddleware, thunk, promise])
);

// add a listener
store.subscribe(() => console.log('listener: ', store.getState()));

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

// thunk
const thunkIncrement = () => dispatch => {
  return dispatch({
    type: 'INCREMENT',
    payload: new Promise(dummyPromise)
  }).then(() => {
    console.log('promise fulfilled');
  });
};

// dispatch actions
store
  .dispatch(delayedIncrement())
  .then(() => {
    return store.dispatch(thunkIncrement());
  })
  .then(() => {
    console.log('state: ', store.getState());
  });

// store.dispatch(incrementAction());
// store.dispatch(incrementAction());
// store.dispatch(incrementAction());
// store.dispatch(decrementAction());
