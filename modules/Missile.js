import GameObject from './GameObject.js';

class Missile extends GameObject {

    direction;
    xSpeed;
    ySpeed;
    constructor({direction, xSpeed = 0, ySpeed, size, ...rest}) {        
        super({ ...rest, width: size, height: size, type: direction === -1 ? 'jetMissile' : 'enemyMissile'});
        this.direction = direction;
        this.xSpeed = xSpeed       
        this.ySpeed = ySpeed
    }

    beforePrint() {  
        this.move();
    }

    move() {        
        this.y += this.ySpeed * this.direction;
        this.x += this.xSpeed;
    }
}

export default Missile;