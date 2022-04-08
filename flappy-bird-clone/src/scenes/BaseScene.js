import Phaser from "phaser";

class BaseScene extends Phaser.Scene {
    constructor(key, config) {
        super(key);
        this.config = config;
        this.screenCenter = [config.width / 2, config.height / 2];
        /* this.bgSound = null;
        this.screenCenter = null; */
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0,0);
        /* this.bgSound = this.sound.add('bg-sound', {volume: 0.3});
        this.bgSound.loop = true;
        this.bgSound.play(); */
    }
    update() {}

    startGame() {
        this.scene.start('PlayScene');
    }

    menuRender(menu) {
        menu.forEach(element => {
            console.log(this.screenCenter);

            // const menuPosition = []
        });
    }
}

export default BaseScene;
