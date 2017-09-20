const initialState = 120

export const tempo = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_TEMPO':
      return parseInt(action.payload)
    default:
      return state;
  }
}
