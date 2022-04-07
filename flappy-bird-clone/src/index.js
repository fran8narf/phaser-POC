import Phaser, { UP } from 'phaser';

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
let pipes = null;

let horizontalDistance = 0;
let isGameOver = false;

let VELOCITY = 350;

const initialBirdPosition = {
    x : config.width / 10,
    y : config.height / 2
}
const PIPES_TO_RENDER = 5;

const pipeVerticalDistanceRange = [100, 200];
const pipeHorizontalDistanceRange = [350, 400];


function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
    this.load.image('pipe', 'assets/pipe.png');
}

function create() {
    this.add.image(config.width / 2, config.height / 2, 'sky');

    bird = this.physics.add.sprite(initialBirdPosition.x, initialBirdPosition.y, 'bird');
    bird.body.gravity.y = 700;

    pipes = this.physics.add.group();

    for (let i = 0; i < PIPES_TO_RENDER; i++) {
        const upperPipe = pipes.create(0, 0, 'pipe').setOrigin(0,1);
        const lowerPipe = pipes.create(0, 0, 'pipe').setOrigin(0,0);

        placePipe(upperPipe, lowerPipe);
    }

    pipes.setVelocityX(-200);

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
        isGameOver = true;
        restartPlayerPosition();
    }
}

function restartPlayerPosition() {
    bird.body.position.x = initialBirdPosition.x;
    bird.body.position.y = initialBirdPosition.y;
    bird.body.velocity.y = 0;
}

function placePipe(uPipe, lPipe) {
    const rightMostX = getRightMostPipe();
    const pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
    const pipeVerticalPos = Phaser.Math.Between(0 + 30, config.height - 30 - pipeVerticalDistance);
    const pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange);

    uPipe.x = rightMostX + pipeHorizontalDistance;
    uPipe.y = pipeVerticalPos;

    lPipe.x = uPipe.x;
    lPipe.y = uPipe.y + pipeVerticalDistance;

}

function getRightMostPipe() {
    let rightMostX = 0;
    
    pipes.getChildren().forEach(pipe => {
        rightMostX = Math.max(pipe.x, rightMostX);
    });

    return rightMostX;
}