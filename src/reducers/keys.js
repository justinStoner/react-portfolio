const initialState = {
  'a':{note:'c' ,hz:60, color:true, key:'a', isPlaying:false},
  'w':{note:'c#' ,hz:61, color:false, key:'w', isPlaying:false},
  's':{note:'d' ,hz:62, color:true, key:'s', isPlaying:false},
  'e':{note:'d#' ,hz:63, color:false, key:'e', isPlaying:false},
  'd':{note:'e' ,hz:64, color:true, key:'d', isPlaying:false},
  'f':{note:'f' ,hz:65, color:true, key:'f', isPlaying:false},
  't':{note:'f#' ,hz:66 ,color:false, key:'t', isPlaying:false},
  'g':{note:'g' ,hz:67 ,color:true, key:'g', isPlaying:false},
  'y':{note:'g#' ,hz:68 ,color:false, key:'y', isPlaying:false},
  'h':{note:'a' ,hz:69 ,color:true, key:'h', isPlaying:false},
  'u':{note:'a#' ,hz:70 ,color:false, key:'u', isPlaying:false},
  'j':{note:'b' ,hz:71 ,color:true, key:'j', isPlaying:false},
  'k':{note:'c' ,hz:72 ,color:true, key:'k', isPlaying:false},
  'o':{note:'c#' ,hz:73 ,color:false, key:'o', isPlaying:false},
  'l':{note:'d' ,hz:74 ,color:true, key:'l', isPlaying:false},
  'p':{note:'d#' ,hz:75 ,color:false, key:'p', isPlaying:false},
  ';':{note:'e' ,hz:76 ,color:true, key:';', isPlaying:false},
  "'":{note:'f' ,hz:77 ,color:true, key:"'", isPlaying:false}
}

export const keys = (state = initialState, action) => {
  const newState = [...state]
  switch (action.type) {
    case 'KEY_UP':
      // newState[action.index] = Object.assign({}, newState[action.index], {isPlaying:false})
      // return newState
      // break;
    case 'KEY_DOWN':
      // newState[action.index] = Object.assign({}, newState[action.index], {isPlaying:true})
      // return newState;
      // break;
    default:
      return state;
  }
}
