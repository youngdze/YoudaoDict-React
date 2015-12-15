'use strict';

import store, {SET} from './store';

export let setQuery = ( query, translation ) =>{
  return {
    type:SET,
    query,
    translation
  };
};
