import BaseScene from "./BaseScene";

class PlayScene extends BaseScene {
    
    constructor(config) {
        super('PlayScene', config);

        this.luffy = null;
        this.pipes = null;

        this.VELOCITY = 350;
        this.PIPES_TO_RENDER = 5;

        this.pipeVerticalDistanceRange = [170, 220];
        this.pipeHorizontalDistanceRange = [350, 390];

        this.score = 0;
        this.scoreText = '';

        this.bestScore = localStorage.getItem('bestScore') || 0;
        this.bestScoreText = '';
        this.jumpSound = null;

        this.countDownText = '';
        this.initialTime = 0;
        this.timeOutEvent = undefined;
    }

    create() {
        this.initScene();
        
        this.jumpSound = this.sound.add('jump', {volume: 0.3});
    }

    update(time, delta) {
        this.gameOver();
    
        this.recyclePipes();
    }

    createPause() {
        const pauseBtn = this.add.image(this.config.width - 10, this.config.height - 10, 'pause')
            .setOrigin(1)
            .setScale(3)
            .setInteractive();

        pauseBtn.on('pointerdown', () => {
            this.physics.pause();
            this.scene.pause();
            this.scene.launch('PauseScene');
        });

        pauseBtn.on('keydown_P', () => {
            this.scene.pause();
        })
    }

    renderPlayer(){
        this.luffy = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'luffy');
        this.luffy.body.gravity.y = 1100;
        this.luffy.scale = 0.3;

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

        this.pipes.setVelocityX(-300);
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
        this.scoreText = this.add.text(16, 16, `Score : ${this.score}`, this.setTextScoreStyles());

        this.bestScoreText = this.add.text(16, 64, `Best : ${this.bestScore}`, this.setTextBestScoreStyles());
    }

    setTextScoreStyles(){
        return {
            fontSize: '32px', 
            fill: '#000', 
            fontWeight: 'bolder', 
            backgroundColor: 'rgba(255, 232, 0, .7)'
        }
    }

    setTextBestScoreStyles() {
        return {
            fontSize: '20px', 
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
        this.jumpSound.play();
    }
    
    increaseScore() {
        this.score+= 1;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    setBestScore() {
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('bestScore', this.bestScore);
            this.bestScoreText.setText(`Best: ${this.bestScore}`);
        }
    }

    ListenToEvents() {
        if (this.pauseEvent) { return; }
        this.pauseEvent = this.events.on('resume', () => {
            console.log('is this executing?');
            this.initialTime = 3;
            this.countDownText = this.add.text(
                ...this.screenCenter,
                `Continue in ${this.initialTime}`,
                this.menuStyles
            ).setOrigin(0.5);
            this.timeOutEvent = this.time.addEvent({
                delay : 1000,
                callback : this.countDown,
                callbackScope: this,
                loop : true
            });
        });
    }

    countDown() {
        this.initialTime--;
        this.countDownText.setText(`Continue in ${this.initialTime}`);
        if (this.initialTime <= 0) {
            this.countDownText.setText('');
            this.timeOutEvent.remove();
            this.physics.resume();
            this.scene.resume();
        }
    }

    initScene() {
        super.create();
        this.renderPlayer();
        this.renderPipes();
        this.createColliders();
        this.handleInputs();
        this.createScore();
        this.createPause();
        this.createBackBtn();
        this.ListenToEvents();
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
            this.jumpSound = undefined;
            
            console.log('game over');
            this.physics.pause();
            this.luffy.setTint(0xff0000);

            this.time.addEvent({
                delay: 1000,
                callback: () => {
                    this.setBestScore();
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