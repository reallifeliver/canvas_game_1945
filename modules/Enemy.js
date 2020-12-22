import GameObject from './GameObject.js';
import Missile from './Missile.js';

class Enemy extends GameObject {

    speed;

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

        this.game.objects.enemy[this.objId] = this;
    }

    move() {
        this.y -= -5;
    }

    shot() {
        // return new Missile(this, size: 10, )
    }
}

export default Enemy;