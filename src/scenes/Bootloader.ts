import Phaser from 'phaser';

class Bootloader extends Phaser.Scene {
    constructor() {
        super({ key: 'Bootloader' });
    }

    preload(): void {
        console.log('Cargando recursos en Bootloader');

        this.load.path = "./assets/";
        this.load.image("Bird1", "./images/bird.png");
        this.load.image("Bird2", "./images/bird2.png");
        this.load.image("background", "./images/landscape.png");

        this.load.audio("8bits", ["./sounds/8bits.ogg"])
    }

    create(): void {
        console.log('Creando Bootloader');
        this.scene.start('MainScene');
    }
}

export default Bootloader;
