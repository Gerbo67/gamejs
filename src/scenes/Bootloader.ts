import Phaser from 'phaser';

class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: 'Bootloader' });
    }

    preload(): void {
        this.load.path = "./assets/";
        this.load.image('space', './images/landscape.png');
        this.load.image('player', './images/bird.png');
        this.load.image('meteorite', './images/fireball.png');

        this.load.audio("8bits", ["./sounds/8bits.ogg"])
    }

    create(): void {
        this.scene.start('MainScene');
    }
}

export default Bootloader;
