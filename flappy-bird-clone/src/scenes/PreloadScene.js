import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
    constructor(config) {
        super('PreloadScene', config);

        this.config = config;
    }

    preload() {
        this.load.image('bg', 'assets/wano-bg.jpg');
        this.load.image('luffy', 'assets/luffy-png-removebg-preview.png');
        this.load.image('u-pipe', 'assets/upper-laser-pipe.png');
        this.load.image('l-pipe', 'assets/lower-laser-pipe.png');

        this.load.image('pause', 'assets/pause.png');
        this.load.image('bg', 'assets/wano-bg.jpg');

        this.load.audio('jump', 'assets/jump-sound.wav');
        this.load.audio('bg-sound', 'assets/bg-sound.wav');
    }
    create() {
        this.scene.start('MenuScene');
    }
    update() {}
}

export default PreloadScene;
