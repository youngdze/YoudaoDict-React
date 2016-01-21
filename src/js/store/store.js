'use strict';

import {createStore} from 'redux';
import storeLocal from 'store';

// TODO localStorage expire time
const initialState = storeLocal.get('youdaoDict') || {};
const [SET] = ['SET'];

const dict = ( state = initialState, action ) =>{
  switch(action.type){
    case SET:
      let dummy = state;
      dummy[action.query] = action.translation;
      storeLocal.set('youdaoDict', dummy);
      return dummy;
    default:
      return state;
  }
};

const store = createStore(dict);

export default store;
export {SET};
