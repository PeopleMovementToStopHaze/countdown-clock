import React, {Component} from 'react';
import CountdownTimer from './CountdownTimer/CountdownTimer';
import Colors from 'utils/ColorCollection';

export default class App extends Component {
  constructor() {
    super();
  }
  render() {
    return (
        <CountdownTimer
          deadline={'Oct 29 2020 00:00:50 UTC+0800'}
          options={{format: 'year-day-hour-minute-second'}}
          size="180px"
          fontSize={32}
          colorFinished={Colors.white}
          colorGoing={Colors.grey800}
          textColor={Colors.grey800} />
    );
  }
}
