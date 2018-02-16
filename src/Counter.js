import React from 'react';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';
import { Helmet } from 'react-helmet';

const Counter = ({counter, increment, decrement}) => (
  <div>
    <Helmet>
      <title>Counter::SSR App</title>
    </Helmet>
    {counter}
    <hr/>
    <Button variant="raised" color="primary" onClick={increment}>+</Button>&nbsp;
    <Button variant="raised" color="primary"  onClick={decrement}>-</Button>
  </div>
);


export default connect(state => ({
  counter: state.counter
}), {
    increment: () => ({type: 'INCREMENT'}),
    decrement: () => ({type: 'DECREMENT'}),
  }
)(Counter);