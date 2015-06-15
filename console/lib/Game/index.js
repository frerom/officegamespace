import Hub from '../Hub'

const Game = function (canvas) {
	const size = 700;
	canvas.width = size;
	canvas.height = size;
	const hub = Hub('localhost:3000')
	const players = [];
	const ctx = canvas.getContext("2d");
	hub.onPlayerConnected(color => players.push({ color, x : Math.random() * (size -20) + 20, y : Math.random() * (size -20) + 20  }));

	hub.onInput(input => {
		players.filter(p => p.color === input.color).forEach(player => {
			if (input.input === 'up')
				player.y -= 10;
			if (input.input === 'down')
				player.y += 10;
			if (input.input === 'left')
				player.x -= 10;
			if (input.input === 'right')
				player.x += 10;
		});
	})

    const drawBall = function (ball) {
    	ctx.beginPath();
      	ctx.arc(ball.x, ball.y, 20, 0, 2 * Math.PI, false);
      	ctx.closePath();
      	ctx.fillStyle = ball.color;
      	ctx.fill();
    }

	const animate = function() {
		ctx.clearRect(0, 0, size, size)
		players.forEach(drawBall)

		requestAnimationFrame(animate)
	}

	animate()

}

export default Game