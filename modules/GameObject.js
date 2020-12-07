let generatedId = 0;
class GameObject {
    objId;
    type;
    x;
    y;
    width;
    height;
    context;
    canvas;

    constructor({type, x, y, width, height, context, canvas}) {
        this.type = type;
        this.x = x; 
        this.y = y;
        this.width = width;
        this.height = height;
        this.context = context;
        this.canvas = canvas;
        this.objId = generatedId++;
    }
    
    draw(){
        this.context.fillRect(this.x, this.y, this.width, this.height);
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
            thisPos.leftX >  this.canvas.width ||
            thisPos.top > this.canvas.height ||
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