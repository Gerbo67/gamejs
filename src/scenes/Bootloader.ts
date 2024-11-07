import Phaser from 'phaser';

class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: 'Bootloader' });
    }

    preload(): void {
        this.load.path = "./assets/";
        this.load.image('sky', './images/landscape.png');
        this.load.image('player', './images/bird.png');
        this.load.image('player2', './images/bird2.png');
        this.load.image('fireball', './images/fireball.png');

        this.load.audio("8bits", ["./sounds/8bits.ogg"])
    }

    create(): void {
        this.scene.start('MainScene');
    }
}

export default Bootloader;
