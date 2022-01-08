function cards() {

    class MenuCard {
        constructor(src, altImg, title, description, price, parentElement, ...rest) {
            this.src = src;
            this.altImg = altImg;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parentElement = document.querySelector(parentElement);
            this.rest = rest;
            this.transfer = 75;
            this.calculatingRUB();
        }

        calculatingRUB() {
            this.price = this.price * this.transfer;
        }

        renderCard() {
            const element = document.createElement('div');
            if (this.rest.length === 0) {
                element.classList.add('menu__item');
            } else {
                this.rest.forEach(selectorRest => {
                    element.classList.add(selectorRest);
                });
            }

            element.innerHTML = `
                <img src="${this.src}" alt="${this.altImg}">
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.description}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parentElement.append(element);
        }
    }

    document.querySelector('.menu__field .container').innerHTML = '';

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({
                img,
                altimg,
                title,
                descr,
                price
            }) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').renderCard();
            });
            console.log(data.statusText);
            console.log(data.data.length);
        })
        .catch(() => {
            console.log('"ERROR ERROR ERROR ERROR ERROR ERROR ERROR ERROR"');
        });

}

export default cards;