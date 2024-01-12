import ParentScene from '@holywater-tech/ads-builder/framework/components/Scene';
import Background from '@holywater-tech/ads-builder/framework/components/ui/Background';
import { gtag, install } from 'ga-gtag';
import Title from './Title';
import Items from './Items';
import { EVENTS, PAIR_WORDS, POSITION, POSITION4x4, SCALE, WORDS } from './constants/Constants';
import Mistakes from './Mistakes';
import Buttons from './Buttons';

install('G-GXV29H0F6T');
export default class Game extends ParentScene {
    create() {
        this.addBackground();
        this.addTitle();
        this.addItems({ items: WORDS, isOnce: true }, { delay: 200 });
        this.addMistakes();
        this.addButtons();
        this.initListeners();
        this.addAnswerTitle();
        this.addCta();
        this.counter = 0;
        this.choice = [];
        this.correct = 0;
        this.isTutorial = true;
        this.tutorialWords = ['CHURCHES', 'TEMPLES', 'MONASTERIES', 'MOSQUES'];

        gtag('event', 'playable_view', {
            playable_name: 'connection_word_2',
        });
    }

    initListeners() {
        this.emitter.on(EVENTS.ON_SUBMIT_CLICK, this.onSubmitClick, this);
        this.emitter.on(EVENTS.ON_SHUFFLE_CLICK, this.onShuffleClick, this);
        this.emitter.on(EVENTS.ON_DESELECT_CLICK, this.onDeselectClick, this);
    }

    addBackground() {
        this.bg = new Background(this, 'bg', true, [2, 2, 2, 2]);
        this.mainContainer.add([this.bg]);
        this.sort();
    }

    addTitle() {
        this.title = new Title(this, 'title');
        this.mainContainer.add([this.title]);
        this.sort();
        this.title.show();
    }

    addItems(options, showOptions) {
        const { items, isOnce, isOpenStore } = options;
        this.items = new Items(this, { itemsArray: items, isOnce, isOpenStore });
        this.mainContainer.add([this.items]);
        this.sort();
        this.items.show(showOptions);
        setTimeout(() => this.items.showHand(this.tutorialWords[0]), 1000);
        // setTimeout(() => this.onSubmitClick(), 8000);
    }

    addAnswerTitle() {
        this.title = new Title(this, 'title');
        this.sub_title = new Title(this, 'subtitle')
            .addProperties(['pos', 'scale'])
            .setCustomScale(0.4, 0.4, 0.4, 0.4)
            .setCustomAlign('Top')
            .setDepth(26)
            .setCustomPosition(...POSITION.subTitle);
        this.hint = new Title(this, 'hint')
            .addProperties(['pos', 'scale'])
            .setCustomScale(0.25, 0.25, 0.25, 0.25)
            .setCustomAlign('Top')
            .setDepth(26)
            .setCustomPosition(...POSITION.hint);
        this.correct_title = new Title(this, 'title2')
            .addProperties(['pos', 'scale'])
            .setCustomScale(...SCALE.title)
            .setCustomAlign('Bottom')
            .setCustomPosition(...POSITION.messageTitle);
        this.wrong_title = new Title(this, 'title3')
            .addProperties(['pos'])
            .setCustomAlign('Bottom')
            .setCustomPosition(...POSITION.messageTitle);
        this.submit_title = new Title(this, 'title4')
            .addProperties(['pos'])
            .setCustomAlign('Bottom')
            .setCustomPosition(...POSITION.messageTitle);
        this.religious_title = new Title(this, 'religious')
            .addProperties(['pos'])
            .setCustomAlign('Top')
            .setScale(0.065, 0.27)
            .setCustomPosition(0, 350, 0, 350);
        this.brands_title = new Title(this, 'brands')
            .addProperties(['pos'])
            .setCustomAlign('Top')
            .setScale(0.065, 0.27)
            .setCustomPosition(0, 350, 0, 350);
        this.container_title = new Title(this, 'container')
            .addProperties(['pos'])
            .setCustomAlign('Top')
            .setScale(0.065, 0.27)
            .setCustomPosition(0, 350, 0, 350);
        this.travel_title = new Title(this, 'travel')
            .addProperties(['pos'])
            .setCustomAlign('Top')
            .setScale(0.065, 0.27)
            .setCustomPosition(0, 350, 0, 350);
        this.mainContainer.add([
            this.title,
            this.religious_title,
            this.brands_title,
            this.container_title,
            this.travel_title,
            this.correct_title,
            this.wrong_title,
            this.submit_title,
            this.sub_title,
            this.hint,
        ]);
        this.sort();
        this.title.show();
        this.sub_title.show();
        this.hint.show();
    }

    addMistakes() {
        this.mistakes = new Mistakes(this);
        this.mainContainer.add([this.mistakes]);
        this.sort();
    }

    addButtons() {
        this.btn_shuffle = new Buttons(this, 'btn_shuffle', { lx: 0, ly: -300, px: -200, py: 0 }, () => this.onShuffleClick());
        this.btn_deselect = new Buttons(this, 'btn_deselect', { lx: 0, ly: -200, px: 0, py: 0 }, () => this.onDeselectClick());
        this.btn_submit = new Buttons(this, 'btn_submit', { lx: 0, ly: -100, px: 200, py: 0 }, () => this.onSubmitClick());
        this.btn_shuffle.setScale(0.95);
        this.btn_deselect.setScale(0.95);
        this.btn_submit.setScale(0.95);
        this.mainContainer.add([this.btn_shuffle, this.btn_deselect, this.btn_submit]);
        this.sort();
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    onSubmitClick() {
        if (this.counter < 4) {
            this.submit_title.blink();
            return;
        }
        const category = this.checkAnswer();
        if (category) {
            this.items.removeHandTutorial();
            // Utils.addAudio(this, 'correct', 0.3, false);
            this.hint.remove();
            this[`${category}_title`].setCustomPosition(0, this.correct * 100 + 190, 0, this.correct * 100 + 250);
            this.correct += 1;
            if (category === 'brands') {
                gtag('event', 'Successfully create group', {
                    name: 'luxury brand',
                    number: this.correct,
                });
            }
            if (category === 'religious') {
                gtag('event', 'Successfully create group', {
                    name: 'religious places',
                    number: this.correct,
                });
            }
            if (category === 'travel') {
                gtag('event', 'Successfully create group', {
                    name: 'travel gear',
                    number: this.correct,
                });
            }
            if (category === 'religious') {
                gtag('event', 'Successfully create group', {
                    name: 'religious places',
                    number: this.correct,
                });
            }
            this.counter = 0;
            this.choice = [];
            this.correct_title.blink();
            this.items.correctAnswer();
            setTimeout(() => {
                this[`${category}_title`].show().scaleTitle();
                const newPosition = [...POSITION4x4.slice(0, -4 * this.correct)];
                this.items.items
                    .filter(({ isSelected }) => !isSelected)
                    .forEach((el, idx) => el.setPosition(newPosition[idx].x, newPosition[idx].y));
            }, 1100);
            if (this.correct >= 4) {
                // this.soundtrack.stop();
                setTimeout(() => {
                    // Utils.addAudio(this, 'win', 0.3, false);
                    this.onCompleted();
                    this.bg.setInteractive().on('pointerdown', () => this.openStore('success_page'), this);
                }, 3000);
            }
        } else {
            // Utils.addAudio(this, 'wrong', 0.3, false);
            this.wrong_title.blink();
            this.items.wrongAnswerAnim();
            this.mistakes.removeLives();
            if (!this.mistakes.countLives) {
                // this.soundtrack.stop();
                // Utils.addAudio(this, 'loose', 0.3, false);
                this.items.removeInteractive();
                this.btn_submit.removeInteractive();
                this.btn_shuffle.removeInteractive();
                this.btn_deselect.removeInteractive();
                setTimeout(() => {
                    this.onFailed();
                    this.bg.setInteractive().on('pointerdown', () => this.openStore('fail_page'), this);
                }, 1200);
            }
        }
    }

    onFailed() {
        this.bg.changeBackground('bg_end', true, [2, 2, 2, 2]).setDepth(100);
        this.win_title = new Title(this, 'lose')
            .addProperties(['pos', 'scale'])
            .setCustomScale(0.9, 0.9, 0.9, 0.9)
            .setCustomAlign('Top')
            .setDepth(226)
            .setCustomPosition(0, 130, 9, 150);
        this.failed = this.add
            .image(0, 0, 'icon')
            .addProperties(['pos'])
            .setCustomPosition(...POSITION.level)
            .setScale(0)
            .setCustomAlign('Center')
            .setDepth(101);

        this.cta.setCustomPosition(0, -200, 0, -200).setScale(1.2).setDepth(200).setAlpha(0);
        setTimeout(() => {
            this.cta.setAlpha(1);
            this.win_title.show();
        }, 400);
        this.mainContainer.add([this.failed, this.win_title]);
        this.sort();
        this.tweens.add({
            targets: this.failed,
            scale: 0.5,
            duration: 500,
            delay: 500,
        });
    }

    onCompleted() {
        this.bg.changeBackground('bg_end', true, [2, 2, 2, 2]).setDepth(100);
        this.win_title = new Title(this, 'win')
            .addProperties(['pos', 'scale'])
            .setCustomScale(0.9, 0.9, 0.9, 0.9)
            .setCustomAlign('Top')
            .setDepth(226)
            .setCustomPosition(0, 130, 9, 150);
        this.failed = this.add
            .image(0, 0, 'icon')
            .addProperties(['pos'])
            .setCustomPosition(...POSITION.level)
            .setScale(0)
            .setCustomAlign('Center')
            .setDepth(101);

        this.cta.setCustomPosition(0, -200, 0, -200).setScale(1.2).setDepth(200).setAlpha(0);
        setTimeout(() => {
            this.cta.setAlpha(1);
            this.win_title.show();
        }, 400);
        this.mainContainer.add([this.failed, this.win_title]);
        this.sort();
        this.tweens.add({
            targets: this.failed,
            scale: 0.5,
            duration: 500,
            delay: 500,
        });
    }

    onShuffleClick() {
        const arrPos = this.correct ? [...POSITION4x4.slice(0, -4 * this.correct)] : [...POSITION4x4];

        this.shuffleArray(arrPos);
        this.items.items
            .filter(({ isSelected }) => !isSelected)
            .forEach((el, idx) => el.setPosition(arrPos[idx].x, arrPos[idx].y));
    }

    onDeselectClick() {
        this.items.items.forEach((element) => {
            element.glow.setAlpha(0);
            element.isGlow = false;
        });
        this.choice = [];
        if (this.isTutorial) {
            this.tutorialWords = ['CHURCHES', 'TEMPLES', 'MONASTERIES', 'MOSQUES'];
        }
        this.counter = 0;
    }

    addCta() {
        this.cta = new Buttons(this, 'button', { lx: 0, ly: 0, px: 0, py: 0 }, () => this.openStore('front_page'))
            .setCustomAlign('Bottom')
            .setCustomPosition(0, -100, 0, -100)
            .setScale(0.8);

        this.tweens.add({
            targets: this.cta,
            scale: '*=1.2',
            duration: 500,
            yoyo: true,
            repeat: -1,
        });
        this.mainContainer.add([this.cta]);
        this.sort();
    }

    checkAnswer() {
        let category = '';
        let correctWords = [];
        this.choice.forEach(({ img }) => {
            PAIR_WORDS.forEach(({ words, title }) => {
                let currentWord = img;
                if (img.includes('_')) {
                    currentWord = img.split('_').join(' ');
                }
                if (words.includes(currentWord.toUpperCase()) && !category) {
                    category = title;
                    correctWords = words;
                }
            });
        }, 0);
        const isCorrect = this.choice.every(({ img }) => {
            if (img.includes('_')) {
                return correctWords.includes(img.split('_').join(' ').toUpperCase());
            }
            return correctWords.includes(img.toUpperCase());
        });
        if (isCorrect) return category;
        return '';
    }

    openStore(placement) {
        this.game.network.openStore();
        gtag('event', 'download click', {
            placement,
        });
    }
}
