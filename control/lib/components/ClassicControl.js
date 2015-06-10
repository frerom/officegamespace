import React from 'react'
import assign from 'object-assign'

class ClassicControl extends React.Component {
  render() {
    const { onUp, onDown, onLeft, onRight, onA, onB } = this.props.actions
    return (
      <div className="classic-control">
        <div className="classic-control-controls">
          <div className="classic-control-navigation">
            <button onTouchStart={onUp}    className="classic-control-button classic-control-up">U</button>
            <button onTouchStart={onDown}  className="classic-control-button classic-control-down">D</button>
            <button onTouchStart={onLeft}  className="classic-control-button classic-control-left">L</button>
            <button onTouchStart={onRight} className="classic-control-button classic-control-right">R</button>
          </div>
          <div className="classic-control-actions">
            <button onTouchStart={onA} className="classic-control-button classic-control-a">A</button>
            <button onTouchStart={onB} className="classic-control-button classic-control-b">B</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ClassicControl