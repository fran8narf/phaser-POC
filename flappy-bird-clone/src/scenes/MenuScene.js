import BaseScene from "./BaseScene";

class MenuScene extends BaseScene {
    constructor(config) {
        super('MenuScene', config);

        this.menu = [
            { scene: 'PlayScene', text : 'Play' },
            { scene: 'Score', text : 'Scoreboard'},
            { scene: null, text : 'Exit '}
        ]
    }

    create() {
        super.create();
        this.cameras.main.fadeIn(2500, 255, 255, 255)
        // this.scene.start('PlayScene');

        this.menuRender(this.menu, this.setupMenuEvents.bind(this));
    }
    update() {}


    setupMenuEvents(menuItem) {
        const textGameObject = menuItem.textGameObject;
        textGameObject.setInteractive();

        textGameObject.on('pointerover', () => {
            textGameObject.setStyle({ fill: '#FF0', cursor: 'pointer' });
        });

        textGameObject.on('pointerout', () => {
            textGameObject.setStyle({ fill: '#FFF' });
        });

        textGameObject.on('pointerdown', () => {
            console.log(menuItem.scene);
            if (menuItem.scene) {
                this.scene.start(menuItem.scene);
            } else {
                this.scene.stop();
            }
        });
    }
}

export default MenuScene;
