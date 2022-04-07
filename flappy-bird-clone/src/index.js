import Phaser from 'phaser';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        // Arcade physics plugin
        default: 'arcade',
        arcade: {
        gravity: { y : 600},
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
let totalDelta = null;

//called 1st, loading assets, images, music, animations, etc
// you have context to this object that contains a lot of methods
function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('bird', 'assets/bird.png');
}

let VELOCITY = 400;
//called 2nd
function create() {
    this.add.image(config.width / 2, config.height / 2, 'sky');
    bird = this.physics.add.sprite(config.width / 10, config.height / 2, 'bird');

    console.log(bird.body);
    // input events for mouse
    this.input.on('pointerdown', flap)

    this.input.keyboard.on('keydown_SPACE', flap);
}

// 60fps
// 60 times per second 
function update(time, delta) {
}

function flap () {
    bird.body.velocity.y = -VELOCITY;
}