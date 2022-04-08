import BaseScene from "./BaseScene";

class MenuScene extends BaseScene {
    constructor(config) {
        super('MenuScene');
        this.config = config;
    }

    create() {
        super.create();
        // this.scene.start('PlayScene');
    }
    update() {}
}

export default MenuScene;
