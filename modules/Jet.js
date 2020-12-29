import GameObject from './GameObject.js';
import Missile from './Missile.js';

class Jet extends GameObject {
    
    xDirection;
    yDirection;
    constructor(param) {
        super({
            ...param,
            width: 30,
            height: 40,
            x: param.canvas.width / 2,
            y: param.canvas.height - 30,
            type: 'jet',
        })
        this.xDirection = 0;
        this.yDirection = 0;
        this.type = 0;
    } 

    move() {        
        this.x += 5 * this.getXDirection();
        this.y += 5 * this.getYDirection();
        this.preventOverflowedFromView();
    }

    getYDirection() {
        let yDirection;
        if (this.game.pressedKeys.ArrowUp) {
            yDirection = -1;
        } else if(this.game.pressedKeys.ArrowDown) {
            yDirection = 1;
        } else {
            yDirection = 0;
        }
        return yDirection;
    }

    getXDirection() {
        let xDirection;
        if (this.game.pressedKeys.ArrowLeft) {
            xDirection = -1;
        } else if (this.game.pressedKeys.ArrowRight) {
            xDirection = 1;
        } else {
            xDirection = 0;
        }
        return xDirection;
    }

    preventOverflowedFromView() {
        if(this.x < 0 ) {
            this.x = 0;
        } else if (this.x + this.width > this.game.canvas.width) {
            this.x = this.game.canvas.width - this.width;
        }

        if(this.y < 0 ) {
            this.y = 0;
        } else if (this.y + this.height > this.game.canvas.height) {
            this.y = this.game.canvas.height - this.height
        }
    }

    beforePrint() {     
        this.shot();
        this.checkCrushWithEnemy();
    }

    shot = () =>  {
        if(!this.game.pressedKeys.KeyA) return;
        requestAnimationFrame(() => {
            new Missile({...this.game, direction: -1, size: 10, ySpeed: 10, y: this.y, x: this.x + this.width / 2 - 5});
            new Missile({...this.game, direction: -1, size: 10, ySpeed: 10, y: this.y, xSpeed: 2, x: this.x + this.width / 2 - 5});
            new Missile({...this.game, direction: -1, size: 10, ySpeed: 10, y: this.y, xSpeed: -2, x: this.x + this.width / 2 - 5});
        })
    
    }

    checkCrushWithEnemy() {                
        for (let obj of this.game.getEnemyList()) {
            if (obj.y + obj.height < this.y) return; // jet의 y보다 위 쪽에 위치한 상태이면 더이상 체크할 필요 없음
            if (this.isCrushedWith(obj)) {
                this.game.gameOver();
            }
        }
    }
}

export default Jet;