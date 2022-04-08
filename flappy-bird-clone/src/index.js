import Phaser from 'phaser';
import PlayScene from './scenes/PlayScene';
import MenuScene from './scenes/MenuScene';

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = {
    x: WIDTH / 10,
    y: HEIGHT / 2
};

const SHARED_CONFIG = {
    width: WIDTH,
    height: HEIGHT,
    startPosition: BIRD_POSITION
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scene: [
        new MenuScene(SHARED_CONFIG),
        new PlayScene(SHARED_CONFIG)
    ]
}
new Phaser.Game(config);