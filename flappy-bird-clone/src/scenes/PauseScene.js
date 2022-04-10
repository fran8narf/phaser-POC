import BaseScene from "./BaseScene";

class PauseScene extends BaseScene {
    constructor(config) {
        super('PauseScene', config);

        this.menu = [
            { scene: 'PlayScene', text : 'Continue' },
            { scene: 'MenuScene', text : 'Exit'}
        ]
    }

    create() {
        super.create();
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

        textGameObject.on('pointerup', () => {
            console.log(menuItem.scene);
            if (menuItem.scene && menuItem.text === 'Continue') {
                this.scene.stop();
                this.scene.resume(menuItem.scene);
            } else {
                this.scene.stop('PlayScene');
                this.scene.start(menuItem.scene);
            }
        });
    }
}

export default PauseScene;
