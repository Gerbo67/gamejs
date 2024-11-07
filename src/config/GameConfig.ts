import Phaser from 'phaser';
import Bootloader from '../scenes/Bootloader';
import MainScene from '../scenes/MainScene';

const gameConfig: Phaser.Types.Core.GameConfig = {
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
        background: ['#16a085', '#2ecc71', '#e74c3c', '#000000']
    },
    type: Phaser.AUTO,
    scene: [Bootloader, MainScene],
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 800, x: 0 },
            debug: false
        }
    }
};

export const GameConfig = gameConfig as Phaser.Types.Core.GameConfig;
