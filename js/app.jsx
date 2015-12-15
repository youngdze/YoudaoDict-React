'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Popup from './components/Popup';

import store from './store/store';

const render = () =>{
  ReactDOM.render(
    <Popup />,
    document.querySelector('#content')
  );
};

render();
store.subscribe(() =>{
  render();
});
