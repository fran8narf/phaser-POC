import Phaser from 'phaser';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
    // Arcade physics plugin
    default: 'arcade',
        arcade: {
            gravity: { y : 200},
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
        // 'this' context -> scene

        // load.image 1st param name, 2nd param path
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bird', 'assets/bird.png');
    }

    let VELOCITY = 400;
    //called 2nd
    function create() {
        // 1st param: X position, 2nd param: Y position, 3rd param: key of the image
        this.add.image(config.width / 2, config.height / 2, 'sky');
        bird = this.physics.add.sprite(config.width / 10, config.height / 2, 'bird');

        // 200px per second
        // bird.body.gravity.y = 800;
        // bird.body.velocity.x = VELOCITY;
        console.log(bird.body);

        //alternative
        // this.add.image(0, 0, 'sky').setOrigin(0,0);
        // bird = this.physics.add.sprite(config.width / 10, config.height / 2, 'bird').setOrigin(0);

        // input events for mouse
        this.input.on('pointerdown', () => {
        console.log('pressing mouse button');
        })

        this.input.keyboard.on('keydown_SPACE', () => {
        console.log('pressing space bar');
        });
    }

    // 60fps
    // 60 times per second 
    function update(time, delta) {
        /* if (bird.body.position.y > config.height) {
            console.log('game over');
        } */
        /* totalDelta += delta;

        if(totalDelta < 1000) { return; }
        console.log(bird.body.velocity.y);

        totalDelta = 0; */

        // changeObjectDirection();
    }


    /** Object movement methods */
    function changeObjectDirection() {
    // we set object velocity to 200 until reaching the width of the canvas, then
    // we set it a negative value in order to change the direction of the movement. 
    if (bird.body.position.x >= config.width - bird.body.gameObject.width) {
        bird.body.velocity.x = -VELOCITY;
    }
    if (bird.body.position.x <= 0) {
        bird.body.velocity.x = VELOCITY;
    }
}