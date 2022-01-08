'use strict';
require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import calc from './modules/calc';
import cards from './modules/cards';
import forms from './modules/forms';
import modals from './modules/modals';
import slider from './modules/slider';
import tabs from './modules/tabs';
import timer from './modules/timer';
import {openModal, closeModal} from './modules/modals';

window.addEventListener('DOMContentLoaded', () => {

    const modalTimerId = setTimeout(openModal, 300000);

    tabs();
    // helperFunctions();
    modals('.modal', modalTimerId);
    openModal('.modal', modalTimerId);
    closeModal('.modal');
    calc();
    cards();
    forms('form', '.modal', modalTimerId);
    slider({container: '.offer__slider',
        sliderInner: '.offer__slider-inner',
        slides:  '.offer__slide',
        currentSlide: '#current',
        totalSlides: '#total',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        wrapper: '.offer__slider-wrapper'

});
    timer('2021-05-29');

});