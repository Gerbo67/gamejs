import Phaser from 'phaser';

class Ship {
    public sprite: Phaser.Physics.Arcade.Sprite;
    private cursors: Phaser.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        this.sprite = scene.physics.add.sprite(x, y, texture);
        this.sprite.setCollideWorldBounds(true);

        // Configura el control con las flechas del teclado
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    update(): void {
        // Resetea la velocidad para que solo responda a las teclas presionadas
        this.sprite.setVelocity(0);

        // Movimiento con flechas
        if (this.cursors.left?.isDown) {
            this.sprite.setVelocityX(-200);
        } else if (this.cursors.right?.isDown) {
            this.sprite.setVelocityX(200);
        }

        if (this.cursors.up?.isDown) {
            this.sprite.setVelocityY(-200);
        } else if (this.cursors.down?.isDown) {
            this.sprite.setVelocityY(200);
        }
    }
}

export default Ship;
