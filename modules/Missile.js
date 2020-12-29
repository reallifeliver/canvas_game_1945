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
        this.checkCrushWidhEnemy();
        this.move();
    }

    move() {        
        this.y += this.ySpeed * this.direction;
        this.x += this.xSpeed;
    }

    checkCrushWidhEnemy() {
        if(this.direction === -1) {
            for(let enemy of this.game.getEnemyList()) {
                if(enemy.y + enemy.height < this.y) return;
                if(enemy.type === 'enemyMissile') continue;
                if(this.isCrushedWith(enemy)){
                    this.destroy();
                    enemy.hitByMissile();
                }
            }
        }
    }
}

export default Missile;