import {openModal, closeModal} from '../modules/modals';
import {postData} from '../modules/helpersFunction';

function forms(form, modalSelector, modalTimerId) {
    const forms = document.querySelectorAll(form);
    const message = {
        load: 'img/form/054 spinner.svg',
        success: 'Спасибо. С Вами скоро свяжутся наши операторы!',
        fail: 'Упссс.... Ошибочка'
    };

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
    
        prevModalDialog.classList.remove('show');
        prevModalDialog.classList.add('hide');
        openModal(modalSelector, modalTimerId);
        const thankModal = document.createElement('div');
        thankModal.classList.add('modal__dialog');
        thankModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">&times;</div>
                <div class="modal__title">${message}</div>
            </div>        
        `;
        document.querySelector(modalSelector).append(thankModal);
        setTimeout(() => {
            thankModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal(modalSelector);
        }, 2500);
    }


    function postForm(form) {
        form.addEventListener('submit', event => {
            event.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.src = message.load;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
                `;
            form.insertAdjacentElement('afterend', statusMessage);

            statusMessage.textContent = message.load;
            const formData = new FormData(form);
            const obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            postData('http://localhost:3000/requests', json)
                .then((data) => {
                    console.log(data);
                    showThanksModal(message.success);
                })
                .catch(() => {
                    showThanksModal(message.fail);
                })
                .finally(() => {
                    form.reset();
                    statusMessage.remove();
                });
        });
    }

    forms.forEach(item => {
		postForm(item);
	});

}

export default forms;