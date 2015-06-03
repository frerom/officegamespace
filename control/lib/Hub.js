import io from 'socket.io-client'

const Hub = function (url) {
  const socket = io(url)

  return {
    actions: {
      onUp() {
        socket.emit('up')
      },
      onDown() {
        socket.emit('down')
      },
      onLeft() {
        socket.emit('left')
      },
      onRight() {
        socket.emit('right')
      },
      onA() {
        socket.emit('a')
      },
      onB() {
        socket.emit('b')
      }
    }
  }
}

export default Hub