import Phaser from 'phaser';
import Bird from '../entities/Bird';

class MainScene extends Phaser.Scene {
    private bird!: Bird;
    private bird2!: Bird;
    private cursors!: Phaser.Input.Keyboard.CursorKeys;

    // Variables de puntuación y texto
    private score1: number = 0;
    private score2: number = 0;
    private scoreText1!: Phaser.GameObjects.Text;
    private scoreText2!: Phaser.GameObjects.Text;
    private nameText1!: Phaser.GameObjects.Text;
    private nameText2!: Phaser.GameObjects.Text;

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
        miAudio.play('', { loop: true });

        // Crear las teclas de flecha
        this.cursors = this.input.keyboard!.createCursorKeys();

        // Instanciar el primer pájaro (controlado con WASD)
        this.bird = new Bird(this, 200, 200, "Bird1");

        // Instanciar el segundo pájaro (controlado con las flechas)
        this.bird2 = new Bird(this, 400, 200, "Bird2", this.cursors);

        // Colisionar ambos pájaros
        this.physics.add.collider(this.bird.sprite, this.bird2.sprite);

        // Añadir el marcador de puntuación
        this.scoreText1 = this.add.text(10, 10, 'Jugador 1: 0', { fontSize: '16px', color: '#ffffff' });
        this.scoreText2 = this.add.text(10, 30, 'Jugador 2: 0', { fontSize: '16px', color: '#ffffff' });

        // Añadir nombres sobre cada jugador
        this.nameText1 = this.add.text(200, 160, 'Jugador 1', { fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
        this.nameText2 = this.add.text(400, 160, 'Jugador 2', { fontSize: '16px', color: '#ffffff' }).setOrigin(0.5);
    }

    update(): void {
        this.bird.update();  // Actualizar el primer pájaro (WASD)
        this.bird2.update(); // Actualizar el segundo pájaro (Flechas)

        // Incrementar el puntaje de jugador 1 al presionar "W" (sin mantener presionado)
        if (this.bird.keys && this.bird.keys.up && Phaser.Input.Keyboard.JustDown(this.bird.keys.up)) {
            this.score1++;
            this.scoreText1.setText(`Jugador 1: ${this.score1}`);
        }

        // Incrementar el puntaje de jugador 2 al presionar la flecha "Arriba" (sin mantener presionado)
        if (this.cursors.up && Phaser.Input.Keyboard.JustDown(this.cursors.up)) {
            this.score2++;
            this.scoreText2.setText(`Jugador 2: ${this.score2}`);
        }
    }
}

export default MainScene;
