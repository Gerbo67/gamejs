import Phaser from 'phaser';
import Ship from '../entities/Ship';

class MainScene extends Phaser.Scene {
    private player!: Ship;
    private meteorites!: Phaser.Physics.Arcade.Group;
    private score = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private lives = 2;

    constructor() {
        super({key: 'MainScene'});
    }

    create(): void {
        // Fondo
        this.add.tileSprite(400, 300, 800, 600, 'space').setScrollFactor(0);

        // Jugador
        this.player = new Ship(this, 100, 300, 'player');

        // Meteoritos
        this.meteorites = this.physics.add.group();
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnMeteorite,
            callbackScope: this,
            loop: true,
        });

        // Puntuación
        this.scoreText = this.add.text(16, 16, 'Tiempo: 0', {fontSize: '20px', color: '#ffffff'});

        // Colisiones entre el jugador y los meteoritos
        this.physics.add.overlap(this.player.sprite, this.meteorites, this.handleCollision, undefined, this);
    }

    update(time: number, delta: number): void {
        // Actualiza la nave espacial
        this.player.update();

        // Actualiza el tiempo de supervivencia
        this.score += delta / 1000; // Tiempo en segundos
        this.scoreText.setText(`Tiempo: ${Math.floor(this.score)}`);
    }

    private spawnMeteorite(): void {
        const x = 800; // Aparece a la derecha de la pantalla
        const y = Phaser.Math.Between(0, 600);
        const meteorite = this.meteorites.create(x, y, 'meteorite') as Phaser.Physics.Arcade.Sprite;
        meteorite.setVelocityX(-200); // Se mueve hacia la izquierda
        meteorite.setCollideWorldBounds(true);
        meteorite.setBounce(1);
    }

    private handleCollision(player: Phaser.GameObjects.GameObject, meteorite: Phaser.GameObjects.GameObject): void {
        const playerSprite = player as Phaser.Physics.Arcade.Sprite;
        const meteoriteSprite = meteorite as Phaser.Physics.Arcade.Sprite;

        this.lives -= 1;
        meteoriteSprite.destroy();

        if (this.lives <= 0) {
            this.scene.restart();
            this.lives = 2;
            this.score = 0;
        }
    }


}

export default MainScene;
