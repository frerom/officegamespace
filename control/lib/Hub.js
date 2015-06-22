import io from 'socket.io-client'

const Hub = function (url) {
  const socket = io(url)
  socket.emit('i am a', 'controller')

  const sendInput = (button, state) => () => socket.emit('input', { button, state })
  const sendDeviceMotion = (event) => socket.emit('device motion', event.accelerationIncludingGravity)

  return {
    actions: {
      onUpStart: sendInput('up', 'start'),
      onUpEnd:   sendInput('up', 'end'),

      onDownStart: sendInput('down', 'start'),
      onDownEnd: sendInput('down', 'end'),

      onLeftStart: sendInput('left', 'start'),
      onLeftEnd: sendInput('left', 'end'),

      onRightStart: sendInput('right', 'start'),
      onRightEnd: sendInput('right', 'end'),

      onAStart: sendInput('a', 'start'),
      onAEnd: sendInput('a', 'end'),

      onBStart: sendInput('b', 'start'),
      onBEnd: sendInput('b', 'end'),

      deviceMotion: sendDeviceMotion
    }
  }
}

export default Hub