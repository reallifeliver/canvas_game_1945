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
    enemyList;
    isStop;
    rafId;
    interval;
    score;
    maxScore;
    constructor(container) {
        this.container = container;
        const { width, height } = container.getBoundingClientRect();
        this.boardWidth = width;
        this.boardHeight = height;
        this.objects = { jet: {}, enemy: {}, jetMissile: {}, enemyMissile: {}};
        this.pressedKeys = {};
        const canvas = document.createElement('canvas');        
        this.canvas = canvas;
        this.score = 0;
        this.maxScore = 0;
        this.context = canvas.getContext('2d');
        this.enemyList = [];
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

        this.score = 0;
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

    getEnemyList = () => {
        return this.enemyList;
    }

    addScore = (score) => {
        this.score += score;
        if(this.maxScore <= this.score) {
            this.maxScore = this.score;
        }
    }

    _draw = () => {
        this.context.clearRect(0, 0, this.boardWidth, this.boardHeight);
        this.context.save();
        this.context.font = '20px serif';        
        this.context.fillStyle = 'red'
        this.context.fillText(`Highest: ${this.maxScore}`, 30, 30)
        this.context.fillStyle = 'blue';
        this.context.fillText(`Current: ${this.score}`, 30, 50); 
        this.context.restore();
        const { enemy, enemyMissile, jetMissile, jet } = this.objects;
        this.enemyList = Object.values({...enemy, ...enemyMissile}).sort((a, b) => b.y - a.y );        

        const objs =  Object.values({...enemy, ...enemyMissile, ...jetMissile, ...jet});
        for(let obj of objs) {
            obj.print();
        }
        
        this.rafId = requestAnimationFrame(this._draw);
        if(this.isStop) {
            cancelAnimationFrame(this.rafId)    
        }    
    }
}

export default Game1984;
