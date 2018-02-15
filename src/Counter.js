import React from 'react';
import Button from 'material-ui/Button';
import {connect} from 'react-redux';

const Counter = ({counter, increment, decrement}) => (
  <div>
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