import Jet from './Jet.js';
import Enemy from './Enemy.js';

class Game1984{
    objects;
    container;
    context;
    canvas;
    boardWidth;
    boardHeight;
    pressedKeys;
    objects;
    isStop;
    rafId;
    interval;
    constructor(container) {
        this.container = container;
        const { width, height } = container.getBoundingClientRect();
        this.boardWidth = width;
        this.boardHeight = height;
        this.objects = { jet: {}, enemy: {}, jetMissile: {}, enemyMissile: {}};
        this.pressedKeys = {};
        const canvas = document.createElement('canvas');        
        this.canvas = canvas;
        this.context = canvas.getContext('2d');

        canvas.setAttribute('width', width);
        canvas.setAttribute('height', height);
        container.append(canvas);    
    }

    start = () => {
        this.generateEnemy();
        this.isStop = false;
        this.initGame();
        this.jet = new Jet(this);
        this._draw();
        
        document.addEventListener('keydown', (ev) => {
            if(ev.code === 'Space' && this.isStop) {
                this.start();
            }

            this.pressedKeys[ev.code] = true;
        });

        document.addEventListener('keyup', (ev) => {
            this.pressedKeys[ev.code] = false;
        })
    }

    initGame = () => {
        this.objects = { jet: {}, enemy: {}, jetMissile: {}, enemyMissile: {}};
    }

    generateEnemy = () => {
        this.interval = setInterval(() => {
            new Enemy(this);
        }, 200)
        console.log(this.interval)
    }

    gameOver = () => {
        this.isStop = true;
        clearInterval(this.interval)
    }

    _draw = () => {
        this.context.clearRect(0, 0, this.boardWidth, this.boardHeight);        
        this.jet.print();
        const { enemy, enemyMissile, jetMissile, jet } = this.objects;
        const objs =  Object.values({...enemy, ...enemyMissile, ...jetMissile});
        for(let obj of objs) {
            obj.print();
        }
        
        this.rafId = requestAnimationFrame(this._draw);
        if(this.isStop) {
            console.log('there')
            cancelAnimationFrame(this.rafId)    
        }    
    }
}

export default Game1984;
