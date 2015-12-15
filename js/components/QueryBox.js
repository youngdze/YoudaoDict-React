'use strict';

import React, {Component, PropTypes} from 'react';

export default class QueryBox extends Component {
  constructor( props ){
    super(props);
    this.timer = null;
  }

  static protoTypes(){
    return {
      handleChange    :PropTypes.func.isRequired,
      fetchTranslation:PropTypes.func.isRequired,
      query           :PropTypes.string.isRequired
    };
  }

  componentDidMount(){
    this.refs.queryInput.focus();
  }

  handleChange( e ){
    this.props.handleChange(e.target.value);
    if(this.timer){
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(this.props.fetchTranslation, 700);
  }

  render(){
    return (
      <div className="row" id="queryBox">
        <form action="get" name="dictForm" id="dictForm" className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input type="text" id="query" name="query" ref="queryInput" className="validate" placeholder="Query"
                     value={this.props.query} onChange={this.handleChange.bind(this)}/>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
