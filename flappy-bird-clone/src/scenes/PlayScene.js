import Phaser from "phaser";

let isGameOver = false;
let VELOCITY = 350;
const PIPES_TO_RENDER = 5;

const pipeVerticalDistanceRange = [100, 200];
const pipeHorizontalDistanceRange = [350, 400];

class PlayScene extends Phaser.Scene{
    
    constructor(config) {
        super('PlayScene');

        //le damos scope global a config
        this.config = config;
        this.bird = null;
        this.pipes = null;
    }

    preload() {
        this.load.image('sky', 'assets/wano-bg.jpg');
        this.load.image('bird', 'assets/luffy-png-removebg-preview.png');
        this.load.image('u-pipe', 'assets/upper-laser-pipe.png');
        this.load.image('l-pipe', 'assets/lower-laser-pipe.png');
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0,0);

        this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird');
        this.bird.body.gravity.y = 700;
        this.bird.scale = 0.2;

        this.pipes = this.physics.add.group();

        for (let i = 0; i < PIPES_TO_RENDER; i++) {
            const upperPipe = this.pipes.create(0, 0, 'u-pipe').setOrigin(0,1);
            const lowerPipe = this.pipes.create(0, 0, 'l-pipe').setOrigin(0,0);

            this.placePipe(upperPipe, lowerPipe);
        }

        this.pipes.setVelocityX(-200);

        // input events
        this.input.on('pointerdown', this.flap, this)
        this.input.keyboard.on('keydown_SPACE', this.flap, this);
    }

    update(time, delta) {
        this.gameOver();
    
        this.recyclePipes();
    }

    flap () {
        this.bird.body.velocity.y = -VELOCITY;
    }

    gameOver () {
        if (
            this.bird.y > this.config.height || this.bird.y < -this.bird.height
        ) {
            this.bird.body.velocity.y = 0;
            this.bird.body.gravity.y = 0;
            
            console.log('game over');
            isGameOver = true;
            this.restartPlayerPosition();
        }
    }

    restartPlayerPosition() {
        this.bird.body.position.x = this.config.startPosition.x;
        this.bird.body.position.y = this.config.startPosition.y;
        this.bird.body.velocity.y = 0;
    }

    placePipe(uPipe, lPipe) {
        const rightMostX = this.getRightMostPipe();
        const pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
        const pipeVerticalPos = Phaser.Math.Between(0 + 30, this.config.height - 30 - pipeVerticalDistance);
        const pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange);
    
        uPipe.x = rightMostX + pipeHorizontalDistance;
        uPipe.y = pipeVerticalPos;
    
        lPipe.x = uPipe.x;
        lPipe.y = uPipe.y + pipeVerticalDistance;
    }

    getRightMostPipe() {
        let rightMostX = 0;
        
        this.pipes.getChildren().forEach(pipe => {
            rightMostX = Math.max(pipe.x, rightMostX);
        });
    
        return rightMostX;
    }

    recyclePipes() {
        let tempPipes = [];
        // checkeamos la posición de la pipe al moverse
        // en el momento que el valor del x sea menor a 0, reutilizamos esa pipe
        this.pipes.getChildren().forEach(pipe => {
            if (pipe.getBounds().right < 0) {
                //recycle this pipe
                // get here upper and lower pipe that are out of the bound
                tempPipes.push(pipe);
                if (tempPipes.length === 2) {
                    this.placePipe(...tempPipes);
                }
            }
        });
    }
    
}

export default PlayScene;