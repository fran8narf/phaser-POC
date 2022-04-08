import Phaser from "phaser";

class BaseScene extends Phaser.Scene {
    constructor(key, config) {
        super(key);
        this.config = config;
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0,0);
        // this.scene.start('PlayScene');
    }
    update() {}
}

export default BaseScene;
