import React from 'react'
import assign from 'object-assign'

class ClassicControl extends React.Component {
  componentWillMount() {
    window.ondevicemotion = (event) => this.props.actions.deviceMotion(event);
  }
  render() {
    const { onUpStart, onDownStart, onLeftStart, onRightStart, onAStart, onBStart,
            onUpEnd, onDownEnd, onLeftEnd, onRightEnd, onAEnd, onBEnd } = this.props.actions
    return (
      <div className="classic-control">
        <div className="classic-control-controls">
          <div className="classic-control-navigation">
            <button onTouchStart={onUpStart}    onTouchEnd={onUpEnd} className="classic-control-button classic-control-up">U</button>
            <button onTouchStart={onDownStart}  onTouchEnd={onDownEnd} className="classic-control-button classic-control-down">D</button>
            <button onTouchStart={onLeftStart}  onTouchEnd={onLeftEnd} className="classic-control-button classic-control-left">L</button>
            <button onTouchStart={onRightStart} onTouchEnd={onRightEnd} className="classic-control-button classic-control-right">R</button>
          </div>
          <div className="classic-control-actions">
            <button onTouchStart={onAStart} onTouchEnd={onAEnd} className="classic-control-button classic-control-a">A</button>
            <button onTouchStart={onBStart} onTouchEnd={onBEnd} className="classic-control-button classic-control-b">B</button>
          </div>
        </div>
      </div>
    )
  }
}

export default ClassicControl