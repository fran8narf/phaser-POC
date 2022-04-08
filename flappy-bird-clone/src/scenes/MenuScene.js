import Phaser from "phaser";

class MenuScene extends Phaser.Scene {
    constructor(config) {
        super('MenuScene');
    }

    preload() {
        this.load.image('bg', 'assets/wano-bg.jpg');
    }
    create() {
        this.add.image(0, 0, 'bg').setOrigin(0,0);
    }
    update() {}
}

export default MenuScene;