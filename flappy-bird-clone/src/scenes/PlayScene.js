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

        this.pipeVerticalDistanceRange = [170, 220];
        this.pipeHorizontalDistanceRange = [320, 370];

        this.score = 0;
        this.scoreText = '';

        this.bestScore = 0;
        this.bestScoreText = '';
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
        this.createScore();
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
        this.luffy.body.gravity.y = 900;
        this.luffy.scale = 0.15;

        this.luffy.setCollideWorldBounds(true);
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

    createScore() {
        this.score = 0;
        this.scoreText = this.add.text(16, 16, `Score : ${this.score}`, this.setTextStyles());

        this.bestScoreText = this.add.text(630, 16, `Best : ${this.bestScore}`, this.setTextStyles());
    }

    setTextStyles(){
        return {
            fontSize: '32px', 
            fill: '#000', 
            fontWeight: 'bolder', 
            backgroundColor: 'rgba(255, 232, 0, .7)'
        }
    }

    /**
     * Flap movement fn
     */
    flap () {
        this.luffy.body.velocity.y = -this.VELOCITY;
    }
    
    increaseScore() {
        this.score+= 1;
        this.scoreText.setText(`Score: ${this.score}`);

        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            this.bestScoreText.setText(`Best: ${this.bestScore}`);
        }
    }

    /**
     * Determines when the game is over and calls for restart
     */
    gameOver (isGameOver = false) {
        if (
            this.luffy.getBounds().bottom >= this.config.height || this.luffy.getBounds().top <= 0 || isGameOver
        ) {
            this.luffy.body.velocity.y = 0;
            this.luffy.body.gravity.y = 0;
            
            console.log('game over');
            this.physics.pause();
            this.luffy.setTint(0xff0000);

            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.scene.restart();
                },
                loop: false
            })
        }
    }

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
                    this.increaseScore();
                }
            }
        });
    }
    
}

export default PlayScene;