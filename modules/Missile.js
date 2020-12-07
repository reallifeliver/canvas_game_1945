import GameObject from './GameObject.js';

class Missile extends GameObject {

    direction
    speed
    constructor({direction, speed, size, x, y, canvas, context}) {
        super({ width:size, height: size, x, y, canvas, context});

        this.direction = direction;
        this.speed = speed
        console.log(this);
        
    }

    move() {
        this.y += this.speed * this.direction;
    }
}

export default Missile;