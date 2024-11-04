import Phaser from 'phaser';

class Bird {
    public sprite: Phaser.Physics.Arcade.Image;
    private readonly cursors?: Phaser.Input.Keyboard.CursorKeys; // Cambiar a Phaser.Input.Keyboard.CursorKeys
    private readonly keys?: { [key: string]: Phaser.Input.Keyboard.Key };

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
        if (this.cursors) {
            // Movimiento con las flechas
            if (this.cursors.left?.isDown) {
                this.sprite.setVelocityX(-300);
                this.sprite.flipX = true;
            } else if (this.cursors.right?.isDown) {
                this.sprite.setVelocityX(300);
                this.sprite.flipX = false;
            }

            if (this.cursors.up?.isDown) {
                this.sprite.setVelocityY(-150);
            } else if (this.cursors.down?.isDown) {
                this.sprite.setVelocityY(150);
            }
        } else if (this.keys) {
            // Movimiento con WASD
            if (this.keys.left?.isDown) {
                this.sprite.setVelocityX(-300);
                this.sprite.flipX = true;
            } else if (this.keys.right?.isDown) {
                this.sprite.setVelocityX(300);
                this.sprite.flipX = false;
            }

            if (this.keys.up?.isDown) {
                this.sprite.setVelocityY(-150);
            } else if (this.keys.down?.isDown) {
                this.sprite.setVelocityY(150);
            }
        }
    }
}

export default Bird;
