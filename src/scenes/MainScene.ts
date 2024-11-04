import Phaser from 'phaser';
import Bird from '../entities/Bird';

class MainScene extends Phaser.Scene {
    private bird!: Bird;
    private bird2!: Bird;
    private cursors!: Phaser.Input.Keyboard.CursorKeys;

    constructor() {
        super({ key: 'MainScene' });
    }

    create(): void {
        // Fondo de la escena
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'background')
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.scale.width, this.scale.height);

        // Música de la escena
        const miAudio = this.sound.add("8bits");
        miAudio.play({
            loop: true
        });

        // Crear las teclas de flecha
        this.cursors = this.input.keyboard!.createCursorKeys();

        // Instanciar el primer pájaro (controlado con WASD)
        this.bird = new Bird(this, 200, 200, "Bird1");

        // Instanciar el segundo pájaro (controlado con las flechas)
        this.bird2 = new Bird(this, 400, 200, "Bird1", this.cursors);

        // Colisionar ambos pájaros
        this.physics.add.collider(this.bird.sprite, this.bird2.sprite);
    }

    update(): void {
        this.bird.update();  // Actualizar el primer pájaro (WASD)
        this.bird2.update(); // Actualizar el segundo pájaro (Flechas)
    }
}

export default MainScene;
