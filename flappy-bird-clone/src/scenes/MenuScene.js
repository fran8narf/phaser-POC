import Phaser from "phaser";

class MenuScene extends Phaser.Scene {
    constructor(config) {
        super('MenuScene');

        this.config = config;
    }

    preload() {
        this.load.image('bg', 'assets/wano-bg.jpg');
        this.load.audio('bg-sound', 'assets/bg-sound.wav');
    }
    create() {
        this.add.image(0, 0, 'bg').setOrigin(0,0);
        /* const bgSound = this.sound.add('bg-sound', {volume: 0.6});
        bgSound.loop = true;
        bgSound.play(); */
    }
    update() {}
}

export default MenuScene;
