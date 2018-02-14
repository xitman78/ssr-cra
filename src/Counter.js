import React from 'react';
import Button from 'material-ui/Button';

class Counter extends React.Component {

  state = {counter: 0};

  increment = () => {
    this.setState({counter: this.state.counter + 1});
  };

  decrement = () => {
    this.setState({counter: this.state.counter - 1});
  };

  render() {
    return (<div>
      {this.state.counter}
      <hr/>
      <Button variant="raised" color="primary" onClick={this.increment}>+</Button>&nbsp;
      <Button variant="raised" color="primary"  onClick={this.decrement}>-</Button>
    </div>);
  }
}

export default Counter;