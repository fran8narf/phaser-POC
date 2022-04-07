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
let topPipe;
let bottomPipe;

let VELOCITY = 400;

const initialBirdPosition = {
    x : config.width / 10,
    y : config.height / 2
}

let pipeVerticalDistanceRange = [100, 200];
const pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
}

function create() {
    this.add.image(config.width / 2, config.height / 2, 'sky');

    bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird');
    bird.body.gravity.y = 600;

    topPipe = this.physics.add.sprite(400, 100, 'pipe').setOrigin(0,1);
    bottomPipe = this.physics.add.sprite(400, topPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0,0);
    // input events
    this.input.on('pointerdown', flap)
    this.input.keyboard.on('keydown_SPACE', flap);
}

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