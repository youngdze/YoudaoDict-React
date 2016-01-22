'use strict';

import React, {Component, PropTypes} from 'react';
import QueryBox from './QueryBox';
import Loading from './Loading';
import ResultBox from './ResultBox';
import store from '../store/store';
import {setQuery} from '../store/actions';

export default class Popup extends Component {
  state = {
    query: '',
    translation: '',
    loading: false
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    Object.defineProperty(Element, 'remove', {
      value() {
        this.parentNode.removeChild(this);
      },
      configurable: true
    });
  }

  componentWillUnmount() {
    delete Element.prototype.remove;
  }

  translation(query) {
    return new Promise((resolve, reject) => {
      if (query.trim() === '')
        return {translation: []};

      let index = 0,
        timeout = 5000,
        callback = `__callback${index++}`;
      const URL = `https://fanyi.youdao.com/openapi.do?keyfrom=YoungdzeBlog&key=498418215&type=data&doctype=jsonp&version=1.1&q=${encodeURIComponent(query.trim())}`;
      let timeoutID = window.setTimeout(() => {
        reject({translation: ['Request timeout']});
      }, timeout);

      let script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `${URL}${URL.includes('?') ? '&' : '?'}callback=${callback}`;
      document.querySelector('head').appendChild(script);

      window[callback] = (res) => {
        script.remove();
        window.clearTimeout(timeoutID);
        resolve(res);
      };
    });
  }

  handleChange(query) {
    this.setState({query});
  }

  fetchTranslation() {
    if (this.state.query.trim() === '') return;

    this.setState({loading: true});
    if (store.getState()[this.state.query.trim()])
      return this.setState({
        translation: store.getState()[this.state.query.trim()],
        loading: false
      });
    this.translation(this.state.query.trim()).then(res => {
      this.setState({translation: res, loading: false});
      store.dispatch(setQuery(this.state.query, this.state.translation));
    }).catch((err) => {
      this.setState({translation: err, loading: false});
    });
  }

  render() {
    let {...others} = this.props;
    return (
      <div className='popup-container' {...others}>
        <QueryBox
          id="queryBox"
          query={this.state.query}
          handleChange={::this.handleChange}
          fetchTranslation={::this.fetchTranslation} />
        {this.state.loading && (<Loading id="loading" />)}
        <ResultBox id="resultBox" translation={this.state.translation} />
      </div>
    );
  }
}
