import Phaser from "phaser";

class PreloadScene extends Phaser.Scene {
    constructor(config) {
        super('PreloadScene', config);

        this.config = config;

        this.bgSound = null;
        this.screenCenter = null;
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

        this.bgSound = this.sound.add('bg-sound', {volume: 0.3});
        this.bgSound.loop = true;
        // this.bgSound.play();
    }
    update() {}
}

export default PreloadScene;
