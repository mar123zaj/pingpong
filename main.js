let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

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
	this.number = which;
};

Player.prototype.givePoints = function() {
	this.points += 1
};

function Rectangle(x, y, color, owner) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.owner = Player;
};

Ball.prototype.update = function(rect) {
	  if((this.x + this.size) >= width) {
	    // points for 1st or 2nd player
		console.log('points')
	  }

	  if((this.x - this.size) <= 0) {
	    // points for 1st or 2nd player
		console.log('points')
	  }

	  if((this.y + this.size) >= height) {
	    this.velY = -(this.velY);
	    this.x += this.velX;
	    this.y += this.velY;
	  }

	  if((this.y - this.size) <= 0) {
	    this.velY = -(this.velY);
	    this.x += this.velX;
	    this.y += this.velY;
	  }
	
	  let dx = this.x - rect.x;
	  let dy = this.y - rect.y;
	  let distance = Math.sqrt(dx * dx + dy * dy);
	  // radius of ball 15, half of height of rectangle 3, half of width of rectangle 40
	  if (distance<=Math.sqrt(Math.pow(18,2)+Math.pow(40,2))) {
	    this.velX = -(this.velX);
	    this.x += this.velX;
	    this.y += this.velY;
	  }
	
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
		if (this.owner.which === 1) {
			let up = 87;
			let down = 83;
		} else {
			let up = 38;
			let down = 40;
		}
		if (e.keyCode === up) {
			self.y -= 10;
		} else if (e.keyCode === down) {
			self.y += 10;
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

function loop() {



}
