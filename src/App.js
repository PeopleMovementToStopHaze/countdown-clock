import React, {Component} from 'react';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import Colors from 'utils/ColorCollection';

const styles = require('./App.css');

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <section>
        <div className={styles.root}></div>
        <div className={styles.content_container}>
            <div className={styles.header_container}>
              <h3 className={styles.header}>Time Left</h3>
              <h4 className={styles.header_sm}>to Haze-Free ASEAN</h4>
            </div>
        </div>
        <CountdownTimer
          deadline={'Oct 29 2020 00:00:50 UTC+0800'}
          options={{format: 'year-day-hour'}}
          size="180px"
          fontSize={32}
          colorFinished={Colors.white}
          colorGoing={Colors.greenyRed}
          textColor={Colors.grey800} />
      </section>
    );
  }
}
