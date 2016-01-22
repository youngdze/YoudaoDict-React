'use strict';

import React, {Component, PropTypes} from 'react';

export default class ResultBox extends Component {
  static protoTypes = {
    translation: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
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
    if (window.XMLHttpRequest) {
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
          if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
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

  render() {
    let {translation, ...others} = this.props;
    return (
      <div className="row" {...others}>
        <div className="col s12">
          {translation && (
            <div className="card blue-grey darken-1">
              <div className="card-content white-text" id="resultField">
                <div className="card-title" id="basic">
                  {translation.basic && translation.basic.phonetic && (
                    <code className="pronoun">/{translation.basic.phonetic.split(';')[0]}/</code>
                  )}
                  {translation.basic && translation.basic.explains && (
                    <div dangerouslySetInnerHTML={{__html: translation.basic.explains.join('<br />')}}></div>
                  )}
                  {!translation.basic && translation.translation && translation.translation[0]}
                </div>
                {translation.web && translation.web.map((w, key) => (
                  <p key={key} className='web-translation'>{w.key}: {w.value.join(', ')}</p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
