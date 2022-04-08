import Phaser, { Scene } from 'phaser';
import MenuScene from './scenes/MenuScene';
import PlayScene from './scenes/PlayScene';
import PreloadScene from './scenes/PreloadScene';

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

const Scenes = [
    PreloadScene,
    MenuScene,
    PlayScene
];

const initScenes = () => Scenes.map((Scene) => new Scene(SHARED_CONFIG));

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
    scene: initScenes()
}
new Phaser.Game(config);

/* 
OLD VERSION FOR LOADING SCENES
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
        new PreloadScene(SHARED_CONFIG),
        new MenuScene(SHARED_CONFIG),
        new PlayScene(SHARED_CONFIG)
    ]
}
new Phaser.Game(config); */
