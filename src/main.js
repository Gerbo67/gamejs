// src/main.js
import Phaser from 'phaser';

import Bootloader from "./Scenes/Bootloader.js";

const config = {
    title: "Protocolos",
    url: 'http://google.es',
    version: '0.0.1',
    width: 640,
    height: 360,
    parent: "container",
    pixelArt: true,
    backgroundColor: '#344955',
    banner: {
        hidePhaser: true,
        text: '#fff00f',
        background:
            [
                '#16a085',
                '#2ecc71',
                '#e74c3c',
                '#000000'
            ]
    },
    type: Phaser.AUTO,
    scene: [Bootloader],
    physics: {
        default: "arcade",
        arcade: {
            gravity: {y: 800},
            debug: true
        }
    }
}

let game = new Phaser.Game(config);
