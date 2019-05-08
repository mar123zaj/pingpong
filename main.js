let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Ball(x, y, velX, velY) {
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;	
};

Ball.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = 'red';
	ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI)
	ctx.fill()
};

function Player(name, points, which) {
	this.user = name;
	this.points = points;
	// 1st or 2nd player
	this.which = which;
};

Player.prototype.givePoints = function() {
	this.points += 1
};

function Rectangle(x, y, color, owner, upKey, downKey) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.owner = owner;
	this.upKey = upKey;
	this.downKey = downKey;
};

Ball.prototype.update = function(rect) {
	  if((this.x + 15) >= width) {
	    // points for 1st or 2nd player
		this.velX = -(this.velX);
		console.log('points')
	  }

	  if((this.x - 15) <= 0) {
	    // points for 1st or 2nd player
		this.velX = -(this.velX);
		console.log('')
	  }

	  if((this.y + 15) >= height) {
	    this.velY = -(this.velY);
	  }

	  if((this.y - 15) <= 0) {
	    this.velY = -(this.velY);

	  }
	
	  let dx = this.x - rect.x;
	  let dy = this.y - rect.y;
	  let distance = Math.sqrt(dx * dx + dy * dy);
	  // radius of ball 15, half of height of rectangle 3, half of width of rectangle 40
	  if (distance<=Math.sqrt(Math.pow(18,2)+Math.pow(40,2))) {
	    this.velX = -(this.velX);
	  }
	    this.x += this.velX;
	    this.y += this.velY;
	
};

Rectangle.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.rect(this.x, this.y, 6, 80);
	ctx.fill();
};

Rectangle.prototype.monitoreKeys = function() {
	let self = this;


	window.onkeydown = function(e) {

		if (e.keyCode === self.upKey) {

			self.y -= 15;
		} else if (e.keyCode === self.downKey) {

			self.y += 15;
		}
	}
}
Rectangle.prototype.collision = function(ball) {
	let dx = this.x - ball.x;
	let dy = this.y - ball.y;
	let distance = Math.sqrt(dx * dx + dy * dy);
	// radius of ball 15, half of height of rectangle 3, half of width of rectangle 40
	if (distance<=Math.sqrt(Math.pow(18,2)+Math.pow(40,2))) {
		this.color = 'red';	
	} else {
		this.color = 'black';
	}
};

let ball = new Ball(width/2, height/2, random(2, 3), random(1, 2))
let p1 = new Player(prompt('Player 1, please give a name: '), 0, 1);
let p2 = new Player(prompt('Player 2, please give a name: '), 0, 2);
let rect1 = new Rectangle(10,height/2,'black',p1, 87, 83)
let rect2 = new Rectangle(width-10,height/2, 'blue',p2, 38, 40)
function loop() {
	ctx.fillStyle = 'rgba(0,0,0,0.25)';
	ctx.fillRect(0,0,width,height);
	ball.draw();
	rect1.draw();
	rect2.draw();
	ball.update(rect1);
	ball.update(rect2);

	rect2.monitoreKeys();
	requestAnimationFrame(loop);
}

loop();
