// import { SHEETS } from './constants/assets';

export default class Title extends Phaser.GameObjects.Container {
    constructor(scene, title) {
        super(scene, 0, 0);
        this.tweens = scene.tweens;
        this.addProperties(['pos', 'scale'])
            .setCustomPosition(0, 90, 0, 100)
            .setCustomScale(0.3, 0.3, 0.3, 0.3)
            .setCustomAlign('Top')
            .setDepth(25)
            .setAlpha(0);
        this.isPortrait = this.scene.game.size.isPortrait;
        this.addTitle(title);
    }

    addTitle(title) {
        this.title = this.scene.add.image(0, 0, title);
        this.add([this.title]);
        this._sort();
    }

    show() {
        this.tweens.add({
            targets: this,
            alpha: 1,
            duration: 500,
            ease: 'Sine.out',
        });
        return this;
    }

    move() {
        this.tweens.add({
            targets: this,
            delay: 500,
            scale: '*=0.95',
            repeat: -1,
            yoyo: true,
            duration: 1500,
        });
    }

    remove() {
        this.tweens.add({
            targets: this,
            alpha: 0,
            duration: 500,
            ease: 'Sine.out',
        });
    }

    blink() {
        this.show();
        setTimeout(() => this.remove(), 2500);
    }

    scaleTitle() {
        this.tweens.add({
            targets: this,
            scaleX: 0.3,
            duration: 700,
            ease: 'Sine.out',
        });
    }
}
