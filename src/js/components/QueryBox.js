'use strict';

import React, {Component, PropTypes} from 'react';

export default class QueryBox extends Component {
  static protoTypes = {
    handleChange: PropTypes.func.isRequired,
    fetchTranslation: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired
  };

  constructor(props) {
    super(props);
    this.timer = null;
  }

  componentDidMount() {
    this.refs.queryInput.focus();
  }

  handleChange(e) {
    this.props.handleChange(e.target.value);
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.timer = setTimeout(this.props.fetchTranslation, 700);
  }

  render() {
    let {children, query, handleChange, ...others} = this.props;
    return (
      <div className="row" {...others}>
        {children}
        <form action="get" name="dictForm" id="dictForm" className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input type="text" id="query" name="query" ref="queryInput" className="validate" placeholder="Query" value={query} onChange={::this.handleChange} />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
