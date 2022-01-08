import {setZero, getData} from '../modules/helpersFunction';
function slider() {
    const dataSlider = [];

    document.querySelector('.offer__slider-inner').innerHTML = '';

    class Slide {
        constructor(img, altimg, parentSelector) {
            this.img = img;
            this.altimg = altimg;
            this.parentElement = document.querySelector(parentSelector);
        }

        renderSlide() {
            const sliderWrapper = this.parentElement.querySelector('.offer__slider-inner');
            const slide = document.createElement('div');

            slide.classList.add('offer__slide');


            slide.innerHTML = `
						<img src="${this.img}" alt="${this.altimg}">
				`;
            sliderWrapper.append(slide);
        }
    }

    //Add slides to HTML from server

    //Set slider function from HTML

    const setupSlider = function () {
        const offerSlider = document.querySelector('.offer__slider'),
            slides = offerSlider.querySelectorAll('.offer__slide'),
            indCurrent = offerSlider.querySelector('#current'),
            indTotal = offerSlider.querySelector('#total'),
            next = offerSlider.querySelector('.offer__slider-next'),
            sliderWrapper = document.querySelector('.offer__slider-wrapper'),
            sliderField = document.querySelector('.offer__slider-inner'),
            prev = offerSlider.querySelector('.offer__slider-prev'),
            width = window.getComputedStyle(sliderWrapper).width;
        let index = 1;
        let offsetSlider = 0;

        sliderField.style.width = 100 * slides.length + '%';
        sliderField.style.display = 'flex';
        sliderField.style.transition = '0.5s all';
        sliderWrapper.style.overflow = 'hidden';

        slides.forEach(slide => {
            slide.style.width = width;
        });

        offerSlider.style.position = 'relative';

        const indicators = document.createElement('ol');
        indicators.classList.add('carousel-indicators');
        const dots = [];

        offerSlider.append(indicators);

        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to', i + 1);
            dot.classList.add('dot');
            if (i == 0) {
                dot.style.opacity = 1;
            }
            indicators.append(dot);
            dots.push(dot);
        }

        function setNumSlide(i) {
            if (i > slides.length) {
                index = 1;
            }
            if (i < 1) {
                index = slides.length;
            }
            indCurrent.textContent = setZero(index); // сюда активацию дотца запихнуть
            indTotal.textContent = setZero(slides.length);
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[index - 1].style.opacity = 1;
        }
       
        function getNumFromString(str) {
            return +str.replace(/\D/g, '');
        }

        setNumSlide();

        //Add eventListener for button

        prev.addEventListener('click', () => {
            if (offsetSlider == 0) {
                offsetSlider = getNumFromString(width) * (slides.length - 1);
            } else {
                offsetSlider -= getNumFromString(width);
            }
            sliderField.style.transform = `translateX(-${offsetSlider}px)`;

            if (index == slides.length) {
                index = 1;
            } else {
                index++;
            }

            indCurrent.textContent = setZero(index); // сюда активацию дотца запихнуть
            indTotal.textContent = setZero(slides.length);
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[index - 1].style.opacity = 1;

            console.log(index);
        });

        next.addEventListener('click', () => {
            if (offsetSlider == getNumFromString(width) * (slides.length - 1)) {
                offsetSlider = 0;
            } else {
                offsetSlider += getNumFromString(width);
            }
            sliderField.style.transform = `translateX(-${offsetSlider}px)`;

            if (index == slides.length) {
                index = 1;
            } else {
                index++;
            }

            indCurrent.textContent = setZero(index); // сюда активацию дотца запихнуть
            indTotal.textContent = setZero(slides.length);
            dots.forEach(dot => dot.style.opacity = '.5');
            dots[index - 1].style.opacity = 1;

            console.log(index);
        });

        dots.forEach((dot) => {
            dot.addEventListener('click', (event => {
                const slideTo = event.target.getAttribute('data-slide-to');
                index = slideTo;
                offsetSlider = getNumFromString(width) * (slideTo - 1);
                sliderField.style.transform = `translateX(-${offsetSlider}px)`;

                if (slides.length < 10) {
                    indCurrent.textContent = `0${index}`;
                } else {
                    indCurrent.textContent = index;
                }

                dots.forEach(dot => dot.style.opacity = '.5');
                dots[index - 1].style.opacity = 1;
                console.log(index);
                console.log(slideTo);
            }));
        });
    };

    getData('http://localhost:3000/slider')
        .then(data => {
            data.data.forEach(item => {
                dataSlider.push(item);
            });
        })
        .then(() => {
            dataSlider.forEach(({
                img,
                altimg
            }) => {
                new Slide(img, altimg, '.offer__slider').renderSlide();
            });
        })
        .then(() => {
            setupSlider();
        });
}

export default slider;