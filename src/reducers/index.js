
const initialState = {
  counter: 7
};


export default function rootReducer(state, action) {

  if (typeof state === 'undefined') {
    return initialState
  }

  switch (action.type) {
     case 'INCREMENT': return {...state, counter: state.counter + 1};
     case 'DECREMENT': return {...state, counter: state.counter - 1};

    default: return state;
  }

}