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

        this.menuRender(this.menu);
    }
    update() {}
}

export default MenuScene;
