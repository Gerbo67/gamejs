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
        this.load.image("Bird1", "./assets/bird.png") // Permite instanciar la figura al cargarla en el cache
        this.load.image("background", "./assets/landscape.png")
    }

    create() {
        console.log('Cargando Create');

        // Cargar imagen de fondo
        this.add.image(this.scale.width / 2, this.scale.height / 2, 'background')
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.scale.width, this.scale.height);

        this.variabledetener = false;
        this.bird = this.physics.add.image(200, 200, "Bird1"); //Incluye una imagen con fisicas dando un lugar en el espacio y un nombre
        //this.physics.add.existing(this.bird, false);
        this.bird.body.setCollideWorldBounds(true);


        const keyCodes = Phaser.Input.Keyboard.KeyCodes;

        this.TA = this.input.keyboard.addKey(keyCodes.A);
        this.TD = this.input.keyboard.addKey(keyCodes.D);
        this.TW = this.input.keyboard.addKey(keyCodes.W);
        this.TS = this.input.keyboard.addKey(keyCodes.S);
    }

    update(time, delta) {
        if (!this.variabledetener) {
            //console.log("Se esta actualizando el programa");
            this.variabledetener = true;
        }
        if (this.TA.isDown) {
            //console.log("Se presiono Tecla A");
            this.bird.x -= 2;
            this.bird.flipX = true;
        }
        if (this.TD.isDown) {
            //console.log("Se presiono Tecla D");
            this.bird.x += 2;
            this.bird.flipX = false;
        }
        if (this.TW.isDown) {
            //console.log("Se presiono Tecla W");
            this.bird.y -= 2;
        }
        if (this.TS.isDown) {
            //console.log("Se presiono Tecla S");
            this.bird.y += 2;
        }
    }

}

export default Bootloader;