import io from 'socket.io-client'

const Hub = function (url) {
  const socket = io(url)
  socket.emit('i am a', 'console')

  return {
    onInput(c) {
      socket.on('input', c)
    },
    onPlayerConnected(c) {
      socket.on('player connected', c)
    }
  }
}

export default Hub