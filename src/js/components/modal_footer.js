const refs = {
  footerLink: document.querySelector('.footer-link'),
  openModalFooter: document.querySelector('.js-lightbox'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  modalWindowOverlay: document.querySelector('.lightbox__overlay'),
};

function onFooterClick(evt) {
  evt.preventDefault();

  if (!evt.target.classList.contains('footer-link')) {
    return;
  }

  window.addEventListener('keydown', onEscKeyPress);

  refs.openModalFooter.classList.add('is-open');
  //   refs.modalWindow.src = evt.target.dataset.source;
}

refs.footerLink.addEventListener('click', onFooterClick);
refs.closeModalBtn.addEventListener('click', onCloseModalBtnClick);
refs.modalWindowOverlay.addEventListener('click', onModalWindowOverlayClick);

function onCloseModalBtnClick() {
  window.removeEventListener('keydown', onEscKeyPress);
  refs.openModalFooter.classList.remove('is-open');
  //   refs.modalWindow.src = '';
}

function onModalWindowOverlayClick(event) {
  if (event.target.classList.contains('.lightbox__overlay')) {
    return;
  }
  refs.openModalFooter.classList.remove('is-open');
}

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    refs.openModalFooter.classList.remove('is-open');
  }
}
