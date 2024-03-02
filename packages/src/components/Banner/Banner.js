import { jsxs as _jsxs, jsx as _jsx } from 'react/jsx-runtime';
import * as React from 'react';
import styles from './Banner.module.scss';
export default class Banner extends React.Component {
  render() {
    return _jsx('div', {
      className: styles.banner,
      children: _jsxs('span', { className: styles.banner__text, children: ['Hello ', this.props.name, '!'] }),
    });
  }
}
