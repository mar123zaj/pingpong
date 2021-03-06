let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;
let result = document.querySelector('h1');

function random(min,max) {
  let num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Ball(x, y, velocityX, velocityY) {
	this.x = x;
	this.y = y;
	this.velocityX = velocityX;
	this.velocityY = velocityY;	
};

Ball.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = 'red';
	ctx.arc(this.x, this.y, 15, 0, 2 * Math.PI);
	ctx.fill();
};

function Player(points, which) {
	this.points = points;
	// 1st or 2nd player
	this.which = which;
};

Player.prototype.givePoints = function() {
	this.points += 1;
};

function Rectangle(x, y, color, owner, upKey, downKey) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.owner = owner;
	this.upKey = upKey;
	this.downKey = downKey;
	this.width = 6;
	this.height = 80;
	if (this.owner === 1) 
		this.edgeX = this.x + this.width;
	else 
		this.edgeX = this.x;
};

Ball.prototype.update = function(rect) {
	if (rect.owner.which === 1) {
		if ((this.x - 15) <= rect.edgeX && (this.y >= rect.y && this.y <= (rect.y+80))) {
			this.velocityX = -(this.velocityX);
	  }  
	  } else {
		if ((this.x + 15) >= rect.edgeX && (this.y >= rect.y && this.y <= (rect.y+80))) {
			this.velocityX = -(this.velocityX);
	  }  
		  
	  }
	  if((this.x + 15) >= width) {
	    // points for 1st or 2nd player
		this.velocityX = -(this.velocityX);
		player1.points += 1;
		result.textContent = `${player1.points}:${player2.points}`;
		ball.x = width/2;
		ball.y = height/2;
	  }

	  if((this.x - 15) <= 0) {
	    // points for 1st or 2nd player
		this.velocityX = -(this.velocityX);
		player2.points += 1;
		result.textContent = `${player1.points}:${player2.points}`;
		ball.x = width/2;
		ball.y = height/2;
	  }

	  if((this.y + 15) >= height) {
	    this.velocityY = -(this.velocityY);
	  }
	  if((this.y - 15) <= 0) {
	    this.velocityY = -(this.velocityY);
	  }
	  this.x += this.velocityX;
	  this.y += this.velocityY;
	
};

Rectangle.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = this.color;
	ctx.rect(this.x, this.y, this.width, this.height);
	ctx.fill();
};

Rectangle.prototype.checkBounds = function() {
	if (this.y<=0) 
		this.y = 0;
	
	if ((this.y+this.height)>=height)
		this.y = height - this.height;
}

function monitorKeys() {
	window.onkeydown = function(e) {
		if (e.keyCode === rect1.upKey) 
			rect1.y -= 15;
		 else if (e.keyCode === rect1.downKey) 
			rect1.y += 15;
		 else if (e.keyCode === rect2.upKey) 
			rect2.y -= 15;
		 else if (e.keyCode === rect2.downKey) 
			rect2.y += 15;
	};
};

Rectangle.prototype.collision = function(ball) {
//empty
};
const keyW = 87;
const keyS = 83;
const arrowUp = 38;
const arrowDown = 40;
const offset = 10;
const startPoints = 0;
let ball = new Ball(width/2, height/2, random(2, 3), random(1, 2))
let player1 = new Player(startPoints, 1);
let player2 = new Player(startPoints, 2);
let rect1 = new Rectangle(offset, height/2,'white', player1, keyW, keyS)
let rect2 = new Rectangle(width-offset, height/2, 'blue', player2, arrowUp, arrowDown)
function loop() {
	ctx.fillStyle = 'rgba(0,0,0,0.25)';
	ctx.fillRect(0,0,width,height);
	ball.draw();
	rect1.draw();
	rect2.draw();
	rect1.checkBounds();
	rect2.checkBounds();
	ball.update(rect1);
	ball.update(rect2);
	monitorKeys();

	requestAnimationFrame(loop);
}

loop();
