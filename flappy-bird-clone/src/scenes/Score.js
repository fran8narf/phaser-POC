import BaseScene from "./BaseScene";

class ScoreScene extends BaseScene {
    constructor(config) {
        super('ScoreScene', config);
    }

    preload() {}
    create() {
        super.create();
        this.setBestScore();
        this.createBackBtn();
    }
    update() {}

    setBestScore() {
        const bestScore = localStorage.getItem('bestScore') || 0;
        console.log(this.config);
        const bestScoreText = this.add.text(
            ...this.screenCenter, `Best Score: ${bestScore}`,
            { 
                fontSize: '62px', fill: '#FFF', 
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
            },
        );
        bestScoreText.setOrigin(.5, 1);
    }
}

export default ScoreScene;
