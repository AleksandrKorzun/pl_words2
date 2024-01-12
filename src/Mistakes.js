import Screen from './Screen';
import { LAYERS_DEPTH, POSITION } from './constants/Constants';

export default class Mistakes extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene, 0, 0);
        this.counter = [0, 1, 2, 3];
        this.countLives = 4;
        this.textLX = 0;
        this.textLY = 0;
        this.textPX = -100;
        this.textPY = 0;
        this.addText();
        this.addMistakes();
        this.initAssets();
        window.addEventListener('resize', Screen.phoneProportions ? () => this.resize() : () => {});
    }

    initAssets() {
        this.addProperties(['pos'])
            .setCustomPosition(...POSITION.mistakes)
            .setScale(1)
            .setCustomAlign('Center')
            .setDepth(LAYERS_DEPTH.ITEMS);
    }

    resize() {
        const isHorizontal = window.innerWidth > window.innerHeight;
        const posLand = [-60, -20, 20, 60];
        const posPort = [50, 90, 130, 170];
        this.lives.forEach((l, idx) => {
            const x = isHorizontal ? posLand[idx] : posPort[idx];
            const y = isHorizontal ? 50 : 0;
            l.setPosition(x, y);
        });
        if (isHorizontal) {
            this.text.setPosition(this.textLX, this.textLY);
            // this.glow.setPosition(this.posLX, this.posLY);
        } else {
            this.text.setPosition(this.textPX, this.textPY);
            // this.glow.setPosition(this.posPX, this.posPY);
        }
    }

    addText() {
        const isHorizontal = window.innerWidth > window.innerHeight;
        const x = isHorizontal && Screen.phoneProportions ? this.textLX : this.textPX;
        this.text = this.scene.add
            .text(0, 0, 'Mistakes remaining:', {
                fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
                fontSize: '24px',
                color: 'black',
            })
            .setDepth(37)
            .setOrigin(0.5, 0.5)
            .setPosition(x, 0);

        this.add([this.text]);
        this._sort();
    }

    addMistakes() {
        this.lives = [];
        this.counter.forEach((idx) => {
            const isHorizontal = window.innerWidth > window.innerHeight;
            const posLand = [-60, -20, 20, 60];
            const posPort = [50, 90, 130, 170];
            const x = isHorizontal && Screen.phoneProportions ? posLand[idx] : posPort[idx];
            const y = isHorizontal && Screen.phoneProportions ? 50 : 0;
            const circle = this.scene.add
                .image(0, 0, 'atlas', 'circle')
                .setPosition(x, y)
                .setScale(0.7)
                .setDepth(LAYERS_DEPTH.MISTAKES);
            this.lives.push(circle);
            this.add([circle]);
            this._sort();
        });
    }

    removeLives() {
        this.countLives -= 1;
        if (this.countLives >= 0) {
            this.scene.tweens.add({
                targets: this.lives,
                y: '-=10',
                duration: 500,
                yoyo: true,
                ease: 'Sine.in',
            });
            setTimeout(() => {
                this.lives[this.countLives]?.destroy();
            }, 400);
        }
    }
}
