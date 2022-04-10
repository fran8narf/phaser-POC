import BaseScene from "./BaseScene";

class PreloadScene extends BaseScene {
    constructor(config) {
        super('PreloadScene', config);

        this.bgSound = null;
        this.screenCenter = null;
    }

    preload() {
        this.load.image('bg', 'assets/wano-bg.jpg');
        // this.load.image('luffy', 'assets/luffy-png-removebg-preview.png');
        this.load.spritesheet('luffy', 'assets/luffy-sprite.png', {
            frameWidth: 53,
            frameHeight: 96
        });
        this.load.image('u-pipe', 'assets/upper-laser-pipe.png');
        this.load.image('l-pipe', 'assets/lower-laser-pipe.png');

        this.load.image('pause', 'assets/pause.png');
        this.load.image('bg', 'assets/wano-bg.jpg');

        this.load.image('sound-on', 'assets/sound-on.png');
        this.load.image('sound-off', 'assets/sound-off.png');
        this.load.image('back-btn', 'assets/back.png');

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
