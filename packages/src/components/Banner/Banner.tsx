import * as React from 'react';
import styles from './Banner.module.scss';

interface IProps {
  name: string;
}

export default class Banner extends React.Component<IProps> {
  public render() {
    return (
      <div className={styles.banner}>
        <span className={styles.banner__text}>Hello {this.props.name}!</span>
      </div>
    );
  }
}
