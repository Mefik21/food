function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
}

function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearTimeout(modalTimerId);
}

function modals(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector),
        openBtnsModal = document.querySelectorAll('[data-modal]');


    function modalInteraction(openBtns, modal) {
        openBtns.forEach((item) => {
            item.addEventListener('click', () => {openModal(modalSelector, modalTimerId);});
        });

        modal.addEventListener('click', (event) => {
            if ((event.target === modal) || event.target.getAttribute('data-close') == '') {
                closeModal('.modal');
            }
        });

        document.addEventListener('keydown', (event) => {
            const keyCode = event.code;
            if ((keyCode === 'Escape') && modal.classList.contains('show')) {
                closeModal('.modal');
            }
        });

        function showModalByScroll() {
            if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
                openModal(modalSelector, modalTimerId);
                window.removeEventListener('scroll', showModalByScroll);
            }
        }

        window.addEventListener('scroll', showModalByScroll);
    }

    modalInteraction(openBtnsModal, modal);

    
}


export default modals;
export {openModal, closeModal};