import React from 'react'
import Game from './Game'

const Main = React.createClass({
  getInitialState() {
    return {
      qr: '',
      players: {}
    }
  },
  componentWillMount() {
    this.props.hub.onQr(qr => this.setState({qr}))
  },
  componentDidMount() {
    Game(this.refs.canvas.getDOMNode(), this.props.hub)
  },
  render() {
    return (
      <div>
        <canvas ref='canvas'/>
        <img style={{ position: 'fixed', bottom: '20px', right: '20px'}} src={this.state.qr} />
      </div>
    )
  }
})

export default Main