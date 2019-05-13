// reducer
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
    case 'INCREMENT_FULFILLED':
      return state + 1;
      break;
    case 'DECREMENT':
      return state - 1;
      break;
    default:
      return state;
      break;
  }
};

export default reducer;
