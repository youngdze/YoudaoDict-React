'use strict';

import React, {Component} from 'react';

export default class Loading extends Component {
  render(){
    return (
      <div className="row" id="loading">
        <div className="col s12">
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        </div>
      </div>
    );
  }
}
