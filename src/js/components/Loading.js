'use strict';

import React, {Component} from 'react';

export default class Loading extends Component {
  constructor(props) {
    super(props)
  }

  render(){
    let {...others} = this.props;
    return (
      <div className="row" {...others}>
        <div className="col s12">
          <div className="progress">
            <div className="indeterminate"></div>
          </div>
        </div>
      </div>
    );
  }
}
