import React from 'react'
import assign from 'object-assign'

class ClassicControl extends React.Component {
  render() {
    const { onUp, onDown, onLeft, onRight, onA, onB } = this.props.actions
    return (
      <div>
        <div className="classic-control-navigation">
          <button onMouseDown={onUp}    className="classic-control-button classic-control-up">U</button>
          <button onMouseDown={onDown}  className="classic-control-button classic-control-down">D</button>
          <button onMouseDown={onLeft}  className="classic-control-button classic-control-left">L</button>
          <button onMouseDown={onRight} className="classic-control-button classic-control-right">R</button>
        </div>
        <div className="classic-control-actions">
          <button onMouseDown={onA}     className="classic-control-button classic-control-a">A</button>
          <button onMouseDown={onB}     className="classic-control-button classic-control-b">B</button>
        </div>
      </div>
    )
  }
}

export default ClassicControl