import Jet from './Jet.js';

class Game1984{
    objects;
    container;
    context;
    canvas;
    boardWidth;
    boardHeight;
    _jet;
    heldKeys;
    constructor(container) {
        this.container = container;
        const { width, height } = container.getBoundingClientRect();
        this.boardWidth = width;
        this.boardHeight = height;
        this.objects = [];
        this.heldKeys = {};
        const canvas = document.createElement('canvas');
        console.log(canvas);
        
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        container.append(canvas);
        
    }

    start = () =>{
        this._jet = new Jet({canvas: this.canvas, context: this.context});
        this._draw();
        console.log(this.container);
        
        document.addEventListener('keydown', (ev) => {
            this.heldKeys[ev.code] = true;
            console.log(ev);
            
            if(ev.code === 'KeyA') {
                this.objects.push(this._jet.shot());
            }
        });

        document.addEventListener('keyup', (ev) => {
            this.heldKeys[ev.key] = false;
        })
    }

    addCoin = () => {

    }

    _draw = () => {
        this.context.clearRect(0, 0, this.boardWidth, this.boardHeight);
        const objs = [];
        this.context.fillRect(this._jet.x, this._jet.y, this._jet.width, this._jet.height)
        this._jet.move(this.heldKeys)

        for(let obj of this.objects) {
            
            obj.move();
            if(!obj.isOverflowed()) {
                
                objs.push(obj);
                this.context.fillStyle = 'black';                
                this.context.fillRect(obj.x, obj.y, obj.width, obj.height);
            }
        }
        this.objects = objs;
        requestAnimationFrame(this._draw);
    }
}

export default Game1984;
