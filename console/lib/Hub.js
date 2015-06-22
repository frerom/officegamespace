import io from 'socket.io-client'

const Hub = function (url) {
  const socket = io(url)
  socket.emit('i am a', 'console')

  return {
    onInput(c) {
      socket.on('input', c)
    },
    onDeviceMotion(c) {
      socket.on('device motion', c)
    },
    onPlayerConnected(c) {
      socket.on('player connected', c)
    },
    onPlayerDisconnected(c) {
      socket.on('player disconnected', c)
    },
    onQr(c) {
      socket.on('qr', c)
    }
  }
}

export default Hub