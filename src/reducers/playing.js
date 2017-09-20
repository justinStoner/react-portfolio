const initialState = false;
const playing = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_DRUMS':
      return !state;
    default:
      return state
  }
}

export default playing
