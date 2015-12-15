'use strict';

import React, {Component, PropTypes} from 'react';

// TODO Youdao wordbook
/*
add http://dict.youdao.com/wordbook/ajax?action=addword&q= GET
 */

export default class ResultBox extends Component {
  constructor( props ){
    super(props);
  }

  static protoTypes(){
    return {
      translation:PropTypes.object.isRequired
    };
  }

  handleAdd() {
    let query = this.props.translation.query;
    this.addToWordbook(query);
  }

  addToWordbook(query) {
    let url = `http://dict.youdao.com/wordbook/ajax?action=addword&q=${query}`;
    this.asyncGet(url).then(res => {
      console.log(res);
    }).catch(err => {});
  }

  asyncGet(url) {
    let xmlHttp;
    if(window.XMLHttpRequest) {
      xmlHttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      try {
        xmlHttp = new ActiveXObject('Msxml2.XMLHTTP');
      } catch (e) {
        try {
          xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
        } catch (e) {}
      }
    }

    if (!xmlHttp) {
      console.error('cannot create an XMLHTTP instance');
      return;
    }

    return new Promise((resolve, reject) => {
      xmlHttp.onreadystatechange = () => {
        try {
          if(xmlHttp.readyState === 4 && xmlHttp.status === 200) {
            return resolve(xmlHttp.responseText);
          } else {
            return reject('Request failed');
          }
        } catch (e) {
          return reject('Request failed');
        }
      }

      xmlHttp.open('GET', url, true);
      xmlHttp.send();
    });
  }

  render(){
    return (
      <div className="row" id="resultBox">
        <div className="col s12">
          {this.props.translation && (
            <div className="card blue-grey darken-1">
              <div className="card-content white-text" id="resultField">
                <div className="card-title" id="basic">
                  {this.props.translation.basic && this.props.translation.basic.phonetic && (
                    <code className="pronoun">/{this.props.translation.basic.phonetic.split(';')[0]}/</code>)}
                  {this.props.translation.basic && this.props.translation.basic.explains &&
                  (<div
                    dangerouslySetInnerHTML={{__html: this.props.translation.basic.explains.join('<br />')}}></div>)}
                  {!this.props.translation.basic && this.props.translation.translation && this.props.translation.translation[0]}
                </div>
                {this.props.translation.web &&
                this.props.translation.web.map(( w, key ) => (
                  <p key={key} className='web-translation'>{w.key}: {w.value.join(', ')}</p>))}
              </div>
              <div className="card-action">
                <a href="javascript:;" onClick={this.handleAdd.bind(this)}>添加到有道单词本</a>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
