let generatedId = 0;
class GameObject {
    objId;
    type;
    x;
    y;
    width;
    height;
    game;
    constructor({type, x, y, width, height, ...game}) {
        this.type = type;
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        this.objId = generatedId++;
        this.game = game;
        this.game.objects[type][this.objId] = this;
    }
    
    print(){
        // console.log(Object.values(this.objects).length);
        this.beforePrint();
        this.move();
        
        if(this.isOverflowed()) {        
            this.destroy();
        } else {
            this.game.context.fillStyle = 'black';                
            this.game.context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    destroy() {
        delete this.game.objects[this.type][this.objId];        
    }

    beforePrint() {
    }

    move() {
        console.warn('move function should be overrided');
    }

    getFourSidesPos() {
        return {
            leftX: this.x,
            rightX: this.x + this.width,
            topY: this.y,
            bottomY: this.y + this.height
        }
    }

    isOverflowed() {
        const thisPos = this.getFourSidesPos();
        
        return (
            thisPos.rightX < 0 ||
            thisPos.leftX >  this.game.canvas.width ||
            thisPos.topY > this.game.canvas.height ||
            thisPos.bottomY < 0
        )
    }

    isCrushedWith(targetObj) {
        const thisPos = this.getFourSidesPos();
        const thatPos = targetObj.getFourSidesPos();
        return (
            thatPos.leftX < thisPos.rightX &&
            thatPos.rightX > thisPos.leftX &&
            thatPos.bottomY > thisPos.topY &&
            thatPos.topY < thisPos.bottomY
        )
    }

}

export default GameObject;