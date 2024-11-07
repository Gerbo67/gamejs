// MainScene.ts
import Phaser from 'phaser';
import Bird from '../entities/Bird';

class MainScene extends Phaser.Scene {
    private player1!: Bird;
    private player2!: Bird;
    private cursors!: Phaser.Input.Keyboard.CursorKeys;
    private meteorites!: Phaser.Physics.Arcade.Group;
    private score = 0;
    private scoreText!: Phaser.GameObjects.Text;
    private lives1 = 2;
    private lives2 = 2;
    private gamePaused = false; // Nueva variable para verificar si el juego está en pausa

    constructor() {
        super({key: 'MainScene'});
    }

    create(): void {
        // Fondo
        this.add.tileSprite(400, 300, 800, 600, 'sky').setScrollFactor(0);

        // Inicializa las teclas de flechas para el jugador 2
        this.cursors = this.input.keyboard.createCursorKeys();

        // Jugador 1 (controlado con WASD)
        this.player1 = new Bird(this, 100, 300, 'player');

        // Jugador 2 (controlado con flechas)
        this.player2 = new Bird(this, 200, 300, 'player2', this.cursors);

        // Bolas de fuego
        this.meteorites = this.physics.add.group();
        this.time.addEvent({
            delay: 1000,
            callback: this.spawnMeteorite,
            callbackScope: this,
            loop: true,
        });

        // Puntuación
        this.scoreText = this.add.text(16, 16, 'Tiempo: 0', {fontSize: '20px', color: '#ffffff'});

        // Colisiones entre jugadores y meteoritos
        this.physics.add.overlap(this.player1.sprite, this.meteorites, () => this.handleCollision(this.player1), undefined, this);
        this.physics.add.overlap(this.player2.sprite, this.meteorites, () => this.handleCollision(this.player2), undefined, this);
    }

    update(time: number, delta: number): void {
        if (this.gamePaused) return; // Evita que el juego se actualice cuando está en pausa

        // Actualiza las naves espaciales
        this.player1.update();
        this.player2.update();

        // Actualiza el tiempo de supervivencia
        this.score += delta / 1000; // Tiempo en segundos
        this.scoreText.setText(`Tiempo: ${Math.floor(this.score)}`);
    }

    private spawnMeteorite(): void {
        if (this.gamePaused) return; // No genera meteoritos si el juego está en pausa

        const x = 800; // Aparece a la derecha de la pantalla
        const y = Phaser.Math.Between(0, 600);
        const meteorite = this.meteorites.create(x, y, 'fireball') as Phaser.Physics.Arcade.Sprite;
        meteorite.setVelocityX(-200); // Se mueve hacia la izquierda
        meteorite.setCollideWorldBounds(true);
        meteorite.setBounce(1);
    }

    private handleCollision(player: Bird): void {
        if (player.isInvulnerable()) return; // Evita pérdida de vida si el jugador es invulnerable

        if (player === this.player1) {
            this.lives1 -= 1;
            player.setInvulnerable(2000); // Invulnerabilidad de 2 segundos
            if (this.lives1 <= 0) {
                this.endGame('Jugador 2');
            }
        } else if (player === this.player2) {
            this.lives2 -= 1;
            player.setInvulnerable(2000); // Invulnerabilidad de 2 segundos
            if (this.lives2 <= 0) {
                this.endGame('Jugador 1');
            }
        }
    }

    private endGame(winner: string): void {
        if (!this.gamePaused) {
            this.gamePaused = true; // Pausa el juego
            this.add.text(300, 100, `${winner} gana!`, {fontSize: '32px', color: '#ffffff'}).setOrigin(0.5);

            // @ts-ignore
            this.time.delayedCall(6000, () => {
                this.scene.restart();
                this.lives1 = 2;
                this.lives2 = 2;
                this.score = 0;
                this.gamePaused = false; // Reactiva el juego
            });
        }
    }
}

export default MainScene;
