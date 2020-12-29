import GameObject from './GameObject.js';
import Missile from './Missile.js';

class Enemy extends GameObject {

    speed;  
    hp;
    interval;
    constructor(param) {

        const size = Math.round(Math.random() * 3)*20;
        let x = Math.random() * param.canvas.width;
        if(x + size > param.canvas.width) {
            x +- param.canvas.width - size;
        }

        super({
            ...param,
            width: size,
            height: size,
            y: -1 * size,
            x: x,
            type: 'enemy',
        });
        this.point = size;
        this.hp = size / 2;
        this.game.objects.enemy[this.objId] = this;
        this.before = new Date().getTime();
        this.shot();
    }

    beforePrint() {
        this.current = new Date().getTime();
        if(this.current - this.before >= 700) {
            this.shot();
            this.before = this.current;
        }
    }

    hitByMissile() {
        --this.hp;
        if(this.hp <= 0) {
            this.destroyed = true;
            this.destroy();
            this.game.addScore(this.point);
        }
    }

    shot = () => {       
        const xSpeed = 2 - Math.ceil(Math.random() * 3);        
        new Missile({...this.game, direction: 1, size: 10, ySpeed: 3, xSpeed, y: this.y + this.height, x: this.x + this.width/2});
    }

    move() {
        this.y -= -5;
    }

}

export default Enemy;;