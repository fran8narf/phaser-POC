import Phaser from "phaser";

class PlayScene extends Phaser.Scene{
    
    constructor(config) {
        super('PlayScene');

        //le damos scope global a config
        this.config = config;
        this.bird = null;
    }

    preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bird', 'assets/luffy-png-removebg-preview.png');
        this.load.image('pipe', 'assets/pipe.png');
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0,0);

        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird');
        this.bird.body.gravity.y = 700;
        this.bird.scale = 0.3;
    }

    update() {
    }
}

export default PlayScene;