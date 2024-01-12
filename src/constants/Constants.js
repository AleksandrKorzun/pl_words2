import { EVENTS_DEFAULT } from '@holywater-tech/ads-builder/framework/components/EventsDispatcher';
import Screen from '../Screen';

export const EVENTS = {
    ...EVENTS_DEFAULT,
    ON_SUBMIT_CLICK: 'onSubmitClick',
    ON_SHUFFLE_CLICK: 'onShuffleClick',
    ON_DESELECT_CLICK: 'onDeselectClick',
    ON_BUTTON_CLICK_START: 'onButtonClickStart',
    HAPPY: 'happy',
    SHOW_DRESS_ITEM: 'setItems',
    SHOW_NEXT_ITEM: 'onChangeScene',
    REMOVE_ITEM: 'removeItem',
    CHANGE_SCENE: 'onChangeScene',
    CHANGE_HAIR: 'onChangeHair' /* your custom events */,
};

export const LAYERS_DEPTH = {
    TITLE: 5,
    ITEM_GLOW: 35,
    ITEM_BASE: 34,
    ITEM: 30,
    MISTAKES: 33,
    HAND_TUTORIAL: 44,
};

const isSmallPhone =
    (window.innerWidth / window.innerHeight >= 1.6 && window.innerWidth / window.innerHeight < 1.8) ||
    (window.innerWidth / window.innerHeight >= 0.56 && window.innerWidth / window.innerHeight < 0.63);

const posPhoneChoices = isSmallPhone ? [0, 450, 0, 450] : [0, 410, 0, 490];
export const POSITION = {
    choices: Screen.phoneProportions ? posPhoneChoices : [0, 350, 0, 400],
    mistakes: Screen.phoneProportions ? [500, -200, 0, 180] : [0, 130, 0, 150],
    buttons: Screen.phoneProportions ? [500, 230, 0, 250] : [0, 200, 0, 220],
    messageTitle: Screen.phoneProportions ? [0, -170, 0, -190] : [0, -170, 0, -170],
    level: Screen.phoneProportions ? [0, 0, 0, 0] : [0, 0, 0, 0],
    subTitle: Screen.phoneProportions ? [0, 50, 9, 80] : [0, 40, 9, 60],
    title: Screen.phoneProportions ? [0, 110, 0, 150] : [0, 90, 0, 125],
    hint: Screen.phoneProportions ? [0, 150, 9, 200] : [0, 130, 9, 180],
};
export const SCALE = {
    choices: Screen.phoneProportions ? [0.93, 0.93, 0.8, 0.8] : [0.7, 0.7, 0.7, 0.7],
    mistakes: Screen.phoneProportions ? [0, 180, 0, 230] : [0, 180, 0, 280],
    buttons: Screen.phoneProportions ? [0, 250, 0, 300] : [0, 250, 0, 350],
    title: Screen.phoneProportions ? [0.22, 0.22, 0.22, 0.22] : [0.22, 0.22, 0.22, 0.22],
    level: Screen.phoneProportions ? [0, 0, 0, 0] : [0, 0, 0, 0],
};

export const POSITION4x4 = [
    { x: -250, y: 200 },
    { x: -80, y: 200 },
    { x: 90, y: 200 },
    { x: 260, y: 200 },
    { x: -250, y: 70 },
    { x: -80, y: 70 },
    { x: 90, y: 70 },
    { x: 260, y: 70 },
    { x: -250, y: -60 },
    { x: -80, y: -60 },
    { x: 90, y: -60 },
    { x: 260, y: -60 },
    { x: -250, y: -190 },
    { x: -80, y: -190 },
    { x: 90, y: -190 },
    { x: 260, y: -190 },
];
export const WORDS = [
    'kegs',
    'bottles',
    'churches',
    'cans',
    'bags',
    'boxes',
    'suitcases',
    'barrels',
    'chanel',
    'prada',
    'temples',
    'monasteries',
    'gucci',
    'mosques',
    'hermes',
    'crates',
];

export const PAIR_WORDS = [
    { title: 'religious', words: ['CHURCHES', 'TEMPLES', 'MONASTERIES', 'MOSQUES'] },
    { title: 'brands', words: ['CHANEL', 'PRADA', 'GUCCI', 'HERMES'] },
    { title: 'container', words: ['KEGS', 'BOTTLES', 'BARRELS', 'CANS'] },
    { title: 'travel', words: ['BAGS', 'BOXES', 'CRATES', 'SUITCASES'] },
];

export const SHEETS = {
    ITEM_BASE: 'btn',
    ITEM_GLOW: 'btn_tap',
    HAND_TUTORIAL: 'hand_tutorial',
};
