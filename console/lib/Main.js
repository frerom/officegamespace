import React from 'react'
import Hub from './hub'

const Main = React.createClass({
  getInitialState() {
    return {
      hub: {},
      players: {}
    }
  },
  componentWillMount() {
    const hub = Hub('localhost:3000')
    this.setState({ hub })

    hub.onPlayerConnected(player => {
      const players = this.state.players;
      players[player] = []
      this.setState({ players })
    })

    hub.onInput(input => {
      const players = this.state.players

      players[input.color].push(input.input)
      this.setState({ players })
    })
  },
  render() {
    var inputs = Object.keys(this.state.players).map(playerColor => {
      return (
        <div style={{background: playerColor, color: 'black'}} key={Math.random() * 1000000000}>
          {this.state.players[playerColor].map(input => <div>{input}</div>)}
        </div>
      )
    })
    return (
      <div>{inputs}</div>
    )
  }
})

export default Main