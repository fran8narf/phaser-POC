import Phaser from 'phaser';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        // Arcade physics plugin
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: {
        preload,
        create,
        update 
    }
}
new Phaser.Game(config);

let bird = null;
let pipe = null;
let totalDelta = null;
let VELOCITY = 400;

const initialBirdPosition = {
    x : config.width / 10,
    y : config.height / 2
}

//called 1st, loading assets, images, music, animations, etc
// you have context to this object that contains a lot of methods
function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
}

//called 2nd
function create() {
    this.add.image(config.width / 2, config.height / 2, 'sky');
    pipe = this.add.sprite(config.width/2.5, config.height, 'pipe');
    bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird');
    bird.body.gravity.y = 600;

    console.log(bird.body);
    // input events for mouse
    this.input.on('pointerdown', flap)

    this.input.keyboard.on('keydown_SPACE', flap);
}

// 60fps
// 60 times per second 
function update(time, delta) {
    gameOver();
}

function flap () {
    bird.body.velocity.y = -VELOCITY;
}

function gameOver () {
    if (bird.body.position.y >= config.height-bird.body.gameObject.height || bird.body.position.y <= 0 - bird) {
        bird.body.velocity.y = 0;
        bird.body.gravity.y = 0;
        
        console.log('game over');
        restartPlayerPosition();
    }
}

function restartPlayerPosition() {
    bird.body.position.x = initialBirdPosition.x;
    bird.body.position.y = initialBirdPosition.y;
    bird.body.velocity.y = 0;
}