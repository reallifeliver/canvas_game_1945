import Game1945 from './modules/Game1945.js';

( () => {
    const game = new Game1945(document.querySelector('#game-board'))
    game.start();
})()