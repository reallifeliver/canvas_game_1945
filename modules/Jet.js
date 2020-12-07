import GameObject from './GameObject.js';
import Missile from './Missile.js';

class Jet extends GameObject {
    
    xDirection;
    yDirection;

    constructor({canvas, context}) {
        super({
            width: 30,
            height: 40,
            x: canvas.width / 2,
            y: canvas.height - 30,
            canvas,
            context,
        })

        this.xDirection = 0;
        this.yDirection = 0;
    }

    move(heldKeys) {        
        if (heldKeys.ArrowUp) {
            this.yDirection = -1;
        } else if(heldKeys.ArrowDown) {
            this.yDirection = 1;
        } else {
            this.yDirection = 0;
        }

        if (heldKeys.ArrowLeft) {
            this.xDirection = -1;
        } else if (heldKeys.ArrowRight) {
            this.xDirection = 1;
        } else {
            this.xDirection = 0;
        }

        this.x += 5 * this.xDirection;
        this.y += 5 * this.yDirection;

        if(this.x < 0 ) {
            this.x = 0;
        } else if (this.x + this.width > this.canvas.width) {
            this.x = this.canvas.width - this.width;
        }


        if(this.y < 0 ) {
            this.y = 0;
        } else if (this.y + this.height > this.canvas.height) {
            this.y = this.canvas.height - this.height
        }
    }

    shot = () =>  {
        console.log('shot', this.x, this.y);
        return new Missile({direction: -1, size: 10, x: this.x, y: this.y, context: this.context, canvas: this.canvas, speed: 10});
    }
}

export default Jet;