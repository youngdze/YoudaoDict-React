'use strict';

import React, {Component, PropTypes} from 'react';

import QueryBox from './QueryBox';
import Loading from './Loading';
import ResultBox from './ResultBox';

import store from '../store/store';
import {setQuery} from '../store/actions';

export default class Popup extends Component {
  constructor( props ){
    super(props);
    this.state = {
      query:'',
      translation:'',
      loading:false
    };
  }

  componentDidMount(){
    Object.defineProperty(Element, 'remove', {
      value() {
        this.parentNode.removeChild(this)
      },
      configurable:true
    });
  }

  componentWillUnmount(){
    delete Element.prototype.remove;
  }

  translation( query ){
    return new Promise(( resolve, reject ) =>{
      if(query.trim() === '') return {translation:[]};

      const timeout = 5000;
      const callback = `__callback${index++}`;
      const url = `https://fanyi.youdao.com/openapi.do?keyfrom=YoungdzeBlog&key=498418215&type=data&doctype=jsonp&version=1.1&q=${encodeURIComponent(query.trim())}`;
      const timeoutID = window.setTimeout(() =>{
        reject({translation:['Request timeout']});
      }, timeout);
      let index = 0;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = `${url}${!~url.indexOf('?')? '?': '&'}callback=${callback}`;
      document.querySelector('head').appendChild(script);

      window[callback] = res =>{
        script.remove();
        window.clearTimeout(timeoutID);
        resolve(res);
      }
    });
  }

  handleChange( query ){
    this.setState({query});
  }

  fetchTranslation(){
    if(this.state.query.trim() === '') return;
    this.setState({loading:true});
    if(store.getState()[this.state.query.trim()]) return this.setState({
      translation:store.getState()[this.state.query.trim()],
      loading    :false
    });
    this.translation(this.state.query.trim()).then(res =>{
      this.setState({
        translation:res,
        loading    :false
      });
      store.dispatch(setQuery(this.state.query, this.state.translation));
    }).catch(( err ) =>{
      this.setState({
        translation:err,
        loading    :false
      });
    });
  }

  render(){
    return (
      <div className='popup-container'>
        <QueryBox query={this.state.query} handleChange={this.handleChange.bind(this)}
                  fetchTranslation={this.fetchTranslation.bind(this)}/>
        {this.state.loading && (<Loading />)}
        <ResultBox translation={this.state.translation}/>
      </div>
    );
  }
}
