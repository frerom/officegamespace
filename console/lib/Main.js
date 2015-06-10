import React from 'react'
import Hub from './hub'

const Main = React.createClass({
  getInitialState() {
    return {
      hub: {},
      inputs: []
    }
  },
  componentWillMount() {
    const hub = Hub('localhost:3000')
    this.setState({ hub })
    hub.onInput(input => {
      const inputs = this.state.inputs
      inputs.push(input)
      this.setState({ inputs })
    })
  },
  render() {
    var inputs = this.state.inputs.map(input => <div key={Math.random() * 1000000000}>{input}</div>)
    return (
      <div>{inputs}</div>
    )
  }
})

export default Main