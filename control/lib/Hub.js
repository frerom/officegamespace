import io from 'socket.io-client'

const Hub = function (url) {
  const socket = io(url)

  return {
    actions: {
      onUp() {
        socket.emit('input', 'up')
      },
      onDown() {
        socket.emit('input', 'down')
      },
      onLeft() {
        socket.emit('input', 'left')
      },
      onRight() {
        socket.emit('input', 'right')
      },
      onA() {
        socket.emit('input', 'a')
      },
      onB() {
        socket.emit('input', 'b')
      }
    }
  }
}

export default Hub