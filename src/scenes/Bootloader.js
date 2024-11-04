class Bootloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'Bootloader'
        });
    }

    init() {
        console.log('Cargando Init');
        console.log('Scene Bootloader');
    }

    preload() {
        console.log('Soy Preload');
        this.load.image("Bird1", "./assets/bird.png"); // Permite instanciar la figura al cargarla en el cache
        this.load.image("background", "./assets/landscape.png");
    }

    create() {
        console.log('Cargando Create');

        // Cargar imagen de fondo
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'background')
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.scale.width, this.scale.height);

        this.variabledetener = false;

        // Crear el primer pájaro controlado con WASD
        this.bird = this.physics.add.image(200, 200, "Bird1");
        this.bird.setCircle(25);
        this.bird.setOffset(8, 0);
        this.bird.setCollideWorldBounds(true);
        this.bird.setImmovable(false);
        this.bird.setBounce(0);

        // Crear el segundo pájaro controlado con las flechas
        this.bird2 = this.physics.add.image(400, 200, "Bird1");
        this.bird2.setCircle(25);
        this.bird2.setOffset(8, 0);
        this.bird2.setCollideWorldBounds(true);
        this.bird2.setImmovable(false);
        this.bird2.setBounce(0);


        this.physics.add.collider(this.bird, this.bird2);

        // Teclas de movimiento para bird (WASD)
        const keyCodes = Phaser.Input.Keyboard.KeyCodes;
        this.TA = this.input.keyboard.addKey(keyCodes.A);
        this.TD = this.input.keyboard.addKey(keyCodes.D);
        this.TW = this.input.keyboard.addKey(keyCodes.W);
        this.TS = this.input.keyboard.addKey(keyCodes.S);

        // Teclas de movimiento para bird2 (flechas)
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        // Movimiento de bird (controlado con WASD)
        if (this.TA.isDown) {
            this.bird.setVelocityX(-300);
            this.bird.flipX = true;
        } else if (this.TD.isDown) {
            this.bird.setVelocityX(300);
            this.bird.flipX = false;
        }

        if (this.TW.isDown) {
            this.bird.setVelocityY(-150);
        } else if (this.TS.isDown) {
            this.bird.setVelocityY(150);
        }

        // Movimiento de bird2 (controlado con flechas)
        if (this.cursors.left.isDown) {
            this.bird2.setVelocityX(-300);
            this.bird2.flipX = true;
        } else if (this.cursors.right.isDown) {
            this.bird2.setVelocityX(300);
            this.bird2.flipX = false;
        }

        if (this.cursors.up.isDown) {
            this.bird2.setVelocityY(-150);
        } else if (this.cursors.down.isDown) {
            this.bird2.setVelocityY(150);
        }
    }
}

export default Bootloader;
