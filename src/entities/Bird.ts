import Phaser from 'phaser';

class Bird {
    public sprite: Phaser.Physics.Arcade.Image;
    private readonly cursors?: Phaser.Input.Keyboard.CursorKeys;
    readonly keys?: { [key: string]: Phaser.Input.Keyboard.Key };
    private invulnerableUntil: number = 0;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, controlKeys?: Phaser.Input.Keyboard.CursorKeys) {
        this.sprite = scene.physics.add.image(x, y, texture);
        this.sprite.setCircle(25);
        this.sprite.setOffset(8, 0);
        this.sprite.setCollideWorldBounds(true);

        if (controlKeys) {
            this.cursors = controlKeys;
        } else {
            const keyCodes = Phaser.Input.Keyboard.KeyCodes;
            this.keys = {
                up: scene.input.keyboard.addKey(keyCodes.W),
                down: scene.input.keyboard.addKey(keyCodes.S),
                left: scene.input.keyboard.addKey(keyCodes.A),
                right: scene.input.keyboard.addKey(keyCodes.D),
            };
        }
    }

    update(): void {
        this.sprite.setVelocity(0); // Resetear velocidad

        // Control de transparencia para invulnerabilidad
        if (this.isInvulnerable()) {
            this.sprite.setAlpha(0.5); // Hacer el jugador semi-transparente cuando es invulnerable
        } else {
            this.sprite.setAlpha(1); // Restaurar opacidad cuando ya no es invulnerable
        }

        if (this.cursors) {
            // Movimiento usando las flechas
            if (this.cursors.left?.isDown) {
                this.sprite.setVelocityX(-400);
            } else if (this.cursors.right?.isDown) {
                this.sprite.setVelocityX(400);
            }

            if (this.cursors.up?.isDown) {
                this.sprite.setVelocityY(-400);
            } else if (this.cursors.down?.isDown) {
                this.sprite.setVelocityY(400);
            }
        } else if (this.keys) {
            // Movimiento usando WASD
            if (this.keys.left?.isDown) {
                this.sprite.setVelocityX(-400);
            } else if (this.keys.right?.isDown) {
                this.sprite.setVelocityX(400);
            }

            if (this.keys.up?.isDown) {
                this.sprite.setVelocityY(-400);
            } else if (this.keys.down?.isDown) {
                this.sprite.setVelocityY(400);
            }
        }
    }

    // Método para establecer invulnerabilidad temporal
    setInvulnerable(duration: number): void {
        this.invulnerableUntil = Date.now() + duration;
    }

    // Método para verificar si el jugador es invulnerable
    isInvulnerable(): boolean {
        return Date.now() < this.invulnerableUntil;
    }
}

export default Bird;
