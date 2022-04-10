import Phaser from "phaser";

class BaseScene extends Phaser.Scene {
    constructor(key, config) {
        super(key);
        this.config = config;
        this.screenCenter = [config.width / 2, config.height / 2];

        this.menuStyles = { 
            fontSize: '42px', fill: '#FFF', 
            backgroundColor: 'rgba(0, 0, 0, 0.7)'
        }
    }

    create() {
        this.add.image(0, 0, 'bg').setOrigin(0,0);
    }
    update() {}

    startGame() {
        this.scene.start('PlayScene');
    }

    menuRender(menu, setupMenuEvents) {
        let lastMenuPosY = 0;
        menu.forEach(menuItem => {
            const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPosY];
            menuItem.textGameObject = this.add.text(...menuPosition, menuItem.text, this.menuStyles)
                .setOrigin(.5, 1);
            lastMenuPosY += 50;

            setupMenuEvents(menuItem);
        });
    }

    /* muteSound(sound) {
        this.add.image(this.config.width - 70, 20, 'sound-off')
            .setOrigin(0, 0)
            .setScale(.1)
            .setTint(0xff0000)
            .setInteractive();
        
        console.log(this.config);
        sound.stop();
    }

    playSound(sound) {
        this.add.image(this.config.width - 70, 20, 'sound-on')
            .setOrigin(0, 0)
            .setScale(.15);

        console.log(this.config);
        sound.play()
    } */
}

export default BaseScene;
