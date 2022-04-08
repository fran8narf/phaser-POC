import Phaser from "phaser";

class PlayScene extends Phaser.Scene{
    
    constructor(config) {
        super('PlayScene');

        //le damos scope global a config
        this.config = config;
        this.luffy = null;
        this.pipes = null;

        this.VELOCITY = 350;
        this.PIPES_TO_RENDER = 5;

        this.pipeVerticalDistanceRange = [100, 200];
        this.pipeHorizontalDistanceRange = [350, 400];
    }

    preload() {
        this.load.image('bg', 'assets/wano-bg.jpg');
        this.load.image('luffy', 'assets/luffy-png-removebg-preview.png');
        this.load.image('u-pipe', 'assets/upper-laser-pipe.png');
        this.load.image('l-pipe', 'assets/lower-laser-pipe.png');
    }

    create() {
        this.renderBg();
        this.renderPlayer();
        this.renderPipes();
        this.createColliders();
        this.handleInputs();
    }

    update(time, delta) {
        this.gameOver();
    
        this.recyclePipes();
    }

    renderBg() {
        this.add.image(0, 0, 'bg').setOrigin(0,0);
    }

    renderPlayer(){
        this.luffy = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'luffy');
        this.luffy.body.gravity.y = 700;
        this.luffy.scale = 0.15;
    }

    renderPipes() {
        this.pipes = this.physics.add.group();

        for (let i = 0; i < this.PIPES_TO_RENDER; i++) {
            const upperPipe = this.pipes.create(0, 0, 'u-pipe')
                .setImmovable(true)
                .setOrigin(0,1);
            const lowerPipe = this.pipes.create(0, 0, 'l-pipe')
                .setImmovable(true)
                .setOrigin(0,0);

            this.placePipe(upperPipe, lowerPipe);
        }

        this.pipes.setVelocityX(-200);
    }

    createColliders() {
        //null value is for a callback fn
        // (1st Element, 2nd Element, colliderMethod, callbackFn, 'this' context)
        this.physics.add.collider(this.luffy, this.pipes, null, () => {
            this.gameOver(true)
        }, this);
    }

    handleInputs() {
        // input events
        this.input.on('pointerdown', this.flap, this)
        this.input.keyboard.on('keydown_SPACE', this.flap, this);
    }

    /**
     * Flap movement fn
     */
    flap () {
        this.luffy.body.velocity.y = -this.VELOCITY;
    }

    /**
     * Determines when the game is over and calls for restart
     */
    gameOver (isGameOver = false) {
        if (
            this.luffy.y > this.config.height || this.luffy.y < -this.luffy.height || isGameOver
        ) {
            this.luffy.body.velocity.y = 0;
            this.luffy.body.gravity.y = 0;
            
            console.log('game over');
            // this.restartPlayerPosition();
            this.physics.pause();
        }
    }

    /**
     * Restarts players position when the game is over
     */
    /* restartPlayerPosition() {
        this.luffy.body.position.x = this.config.startPosition.x;
        this.luffy.body.position.y = this.config.startPosition.y;
        this.luffy.body.velocity.y = 0;
        this.restartPipes();
    } */

    /* restartPipes() {
        this.pipes.getChildren().forEach(pipe => {
            pipe.setVelocityX(0);
        });
    } */

    /**
     * Place both upper and lower pipe randomly determined by the pipeVerticalDistanceRange and the pipeHorizontalDistanceRange
     */
    placePipe(uPipe, lPipe) {
        const rightMostX = this.getRightMostPipe();
        const pipeVerticalDistance = Phaser.Math.Between(...this.pipeVerticalDistanceRange);
        const pipeVerticalPos = Phaser.Math.Between(0 + 30, this.config.height - 30 - pipeVerticalDistance);
        const pipeHorizontalDistance = Phaser.Math.Between(...this.pipeHorizontalDistanceRange);
    
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