import Hub from '../Hub'

const Game = function (canvas, hub) {
	const size = 700;
	canvas.width = size;
	canvas.height = size;
	const players = [];
	const ctx = canvas.getContext("2d");
	var currentTime = new Date();

	hub.onPlayerConnected(color => players.push(
		{ 
			color, 
			x : Math.random() * (size -20) + 20, 
			y : Math.random() * (size -20) + 20,
			controls: {
				accelerate: false,
				left: false,
				right: false
			},
			speed: 50,
			rotationSpeed: 4,
			rotation: 0   
		}));

	hub.onInput(input => {
		console.log(input);
		players.filter(p => p.color === input.color).forEach(player => {
			if (input.input.button === 'up') 
				player.controls.accelerate = input.input.state === 'start' ? true : false
			else if (input.input.button === 'left') 
				player.controls.left = input.input.state === 'start' ? true : false
			else if (input.input.button === 'right') 
				player.controls.right = input.input.state === 'start' ? true : false
			console.log(player.controls.accelerate);
		});
	})

	const loop = function() {
		var oldTime = currentTime;
		currentTime = new Date();
		var deltaTime = currentTime - oldTime;
		players.forEach(p => {
			if (p.controls.accelerate) p.x+= p.speed*Math.cos(p.rotation)*deltaTime/1000;
			if (p.controls.accelerate) p.y+= p.speed*Math.sin(p.rotation)*deltaTime/1000;
			if (p.controls.left) p.rotation-= p.rotationSpeed*deltaTime/1000;
			if (p.controls.right) p.rotation+= p.rotationSpeed*deltaTime/1000;
		})
		animate();
		requestAnimationFrame(loop);
	}

    const drawBall = function (ball, size) {
    	ctx.beginPath();
      	ctx.arc(ball.x, ball.y, size, 0, 2 * Math.PI, false);
      	ctx.closePath();
      	ctx.fill();
    }

    const drawPlayer = function (player) {
      	ctx.fillStyle = player.color;
    	drawBall(player, 20);
    	ctx.save();
    	ctx.translate(player.x, player.y);
    	ctx.rotate(player.rotation);
    	ctx.translate(8, 0);
    	ctx.fillStyle = 'black';
    	drawBall({x: 0, y: 0}, 5);
    	ctx.restore();
    }

	const animate = function() {
		ctx.clearRect(0, 0, size, size)
		players.forEach(drawPlayer)
	}

	loop();

}

export default Game