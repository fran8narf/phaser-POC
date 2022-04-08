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
        let lastMenuPosY = 0;
        menu.forEach(element => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPosY];
            this.add.text(...menuPosition, element.text, { 
                fontSize: '42px', fill: '#000', 
                backgroundColor: 'rgba(255, 255, 255, 0.8)'
            })
            .setOrigin(.5, 1);
            lastMenuPosY += 50;
        });
    }
}

export default BaseScene;
