import Hub from '../Hub'

const Game = function (canvas, hub) {
	const size = 700;
	canvas.width = size;
	canvas.height = size;
	var players = [];
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
				right: false,
				device: {x:0, y:0 , z:0}
			},
			maxAcceleration: 2,
			maxSpeed: 100,
			speed : { x: 0, y: 0 },
			acceleration : { x: 0, y: 0 },
			rotationSpeed: 4,
			rotation: 0   
		}));

	hub.onPlayerDisconnected(color => { players = players.filter(player => player.color != color) });

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

	hub.onDeviceMotion(input => {
		players.filter(p => p.color === input.color).forEach(player => {
			player.controls.device.x = input.input.x;
			player.controls.device.y = input.input.y;
			player.controls.device.z = input.input.z;
			console.log(player.controls.device.y);
		});
	})

	const loop = function() {
		var oldTime = currentTime;
		currentTime = new Date();
		var deltaTime = currentTime - oldTime;
		players.forEach(p => {
			if (Math.abs(p.controls.device.y) > 0.5) p.rotation-= (p.controls.device.y/5)*p.rotationSpeed*deltaTime/1000;
			//if (p.controls.left) p.rotation-= p.rotationSpeed*deltaTime/1000;
			//if (p.controls.right) p.rotation+= p.rotationSpeed*deltaTime/1000;
			if (p.controls.accelerate) {			
				p.acceleration.x = p.maxAcceleration*Math.cos(p.rotation)*deltaTime/1000;
				p.speed.x += p.acceleration.x;
			}
			else if (Math.abs(p.speed.x) > 0.1) p.speed.x *= 0.98; //needs to based on deltaTime
			else p.speed.x = 0;
			if (p.controls.accelerate) {
				p.acceleration.y = p.maxAcceleration*Math.sin(p.rotation)*deltaTime/1000;
				p.speed.y += p.acceleration.y;
			} 
			else if (Math.abs(p.speed.y) > 0.1) p.speed.y *= 0.98; //needs to based on deltaTime
			else p.speed.y = 0;

			var totalSpeed = Math.sqrt(p.speed.x*p.speed.x + p.speed.y*p.speed.y)
			if (totalSpeed > p.maxSpeed) {
				p.speed.x = (p.speed.x/totalSpeed)*maxSpeed;
				p.speed.y = (p.speed.y/totalSpeed)*maxSpeed;
			}

			p.x += p.speed.x;
			p.y += p.speed.y;
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