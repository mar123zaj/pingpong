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

function Player(name, points) {
	this.user = name;
	this.points = points;
};

Player.prototype.givePoints = function() {
	this.points += 1
};

function Rectangle(x, y) {
	this.x = x;
	this.y = y;
};

Rectangle.prototype.draw = function() {
	ctx.beginPath();
	ctx.fillStyle = 'black';
	ctx.rect(this.x, this.y, 6, 80);
	ctx.fill();
};

Rectangle.prototype.collision = function(ball) {
	var dx = this.x - ball.x;
	var dy = this.y - ball.y;
	var distance = Math.sqrt(dx * dx + dy * dy);
	
};

function loop() {



}
