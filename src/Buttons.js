// import Utils from '@holywater-tech/ads-builder/framework/Utils';
import Screen from './Screen';
import { LAYERS_DEPTH, POSITION, SHEETS } from './constants/Constants';

export default class Buttons extends Phaser.GameObjects.Container {
    constructor(scene, img, pos, onClick) {
        super(scene, 0, 0);
        this.onClick = onClick;
        this.img = img;
        this.posLX = pos.lx;
        this.posLY = pos.ly;
        this.posPX = pos.px;
        this.posPY = pos.py;
        this.addButton(pos);
        this.addBaseInteractive();
        // setTimeout(() => this.addBaseInteractive(), 11000);
        this.initAssets();
        this.addHand();
        window.addEventListener('resize', Screen.phoneProportions ? () => this.resize() : () => {});
        // this.initListener();
        // this.addText();
    }

    resize() {
        const isHorizontal = window.innerWidth > window.innerHeight;
        if (isHorizontal) {
            this.button.setPosition(this.posLX, this.posLY);
            this.glow.setPosition(this.posLX, this.posLY);
        } else {
            this.button.setPosition(this.posPX, this.posPY);
            this.glow.setPosition(this.posPX, this.posPY);
        }
    }

    initAssets() {
        this.addProperties(['pos'])
            .setCustomPosition(...POSITION.buttons)
            .setCustomAlign('Center')
            .setDepth(LAYERS_DEPTH.ITEM);
    }

    addButton() {
        const isHorizontal = window.innerWidth > window.innerHeight;
        const x = isHorizontal && Screen.phoneProportions ? this.posLX : this.posPX;
        const y = isHorizontal && Screen.phoneProportions ? this.posLY : this.posPY;
        this.button = this.scene.add.image(x, y, 'atlas', this.img).setOrigin(0.5, 0.5).setScale(1.1).setDepth(LAYERS_DEPTH.ITEM);
        this.glow = this.scene.add
            .image(x, y, 'atlas', `${this.img}_glow`)
            .setScale(1.1)
            .setOrigin(0.5, 0.5)
            .setDepth(LAYERS_DEPTH.ITEM)
            .setAlpha(0);
        this.add([this.button, this.glow]);
        this._sort();
    }

    addHand() {
        this.handX = -100;
        this.handY = 400;
        this.hand = this.scene.add
            .image(0, 0, 'atlas', SHEETS.HAND_TUTORIAL)
            .setDepth(LAYERS_DEPTH.HAND_TUTORIAL)
            .setPosition(this.handX, this.handY)
            .setAlpha(0)
            .setScale(0);
        this.add([this.hand]);
        this._sort();
    }

    showHand(item, delay) {
        if (this.tweensHand) return;
        this.scene.tweens.add({
            targets: this.hand,
            alpha: 1,
            scale: 1,
            duration: 300,
            delay: delay || 300,
            onStart: () => this.addHandTutorial(item),
        });
    }

    addHandTutorial() {
        // if (this.items.length === 0 && current) {
        //     return;
        // }

        this.handX = 0;
        this.hand.setAlpha(1).setPosition(this.handX + 20, 200);
        const tweensParam = [];

        const press = {
            scale: 0.9,
            yoyo: true,
            duration: 300,
            startDelay: 300,
            targets: this.hand,
        };
        const param = {
            delay: 300,
            duration: 300,
            x: this.button.x + 75,
            y: this.button.y + 90,
            // onComplete: () => item.onBaseSelect(),
        };

        tweensParam.push(param, press);

        this.tweensHand = this.scene.tweens.timeline({
            loop: -1,
            targets: this.hand,
            tweens: [...tweensParam],
            onComplete: () => this.removeHandTutorial(),
        });
    }

    removeHandTutorial() {
        this.hand?.setAlpha(0);
        // this.scene.tweens.remove(this.tweensHand);
        this.tweensHand = null;
        return this;
    }

    onItemClick() {
        this.removeHandTutorial();
    }

    addDeselect() {
        this.deselect = this.scene.add.image(0, 0, 'atlas', 'btn_deselect').setScale(1.1).setDepth(LAYERS_DEPTH.ITEM);
        this.add([this.deselect]);
        this._sort();
    }

    addSubmit() {
        this.submit = this.scene.add.image(200, 0, 'atlas', 'btn_submit').setScale(1.1).setDepth(LAYERS_DEPTH.ITEM);
        this.add([this.submit]);
        this._sort();
    }

    disable() {
        this.item.off('pointerdown');
        return this;
    }

    removeGlow() {
        this.glow?.setAlpha(0);
        return this;
    }

    addGlow() {
        this.glow = this.scene.add.image(0, 0, 'atlas', 'button_glow').setDepth(1).setAlpha(0);
        this.add([this.glow]);
        this._sort();
    }

    addBase() {
        this.base = this.scene.add.image(0, 0, 'atlas', SHEETS.ITEM_BASE).setDepth(LAYERS_DEPTH.ITEM_BASE);
        this.add([this.base]);
        this._sort();
    }

    onBtnClick() {
        // Utils.addAudio(this.scene, 'tap', 0.5, false);
        this.scene.tweens.add({
            targets: this,
            scale: '*=0.98',
            yoyo: true,
            duration: 300,
            ease: 'Sine.out',
        });
        this.scene.tweens.add({
            targets: this.glow,
            alpha: 1,
            duration: 400,
            yoyo: true,
            ease: 'Sine.in',
        });
        this.removeHandTutorial();
        this.onClick();
    }

    removeInteractive() {
        this.button.disableInteractive();
    }

    addBaseInteractive() {
        if (this.isOnce) {
            this.button.setInteractive().once('pointerdown', this.onBtnClick, this);
        } else {
            this.button.setInteractive().on('pointerdown', this.onBtnClick, this);
        }
    }
}
