
tippy('.tippy', {
  content: "I'm a Tippy tooltip!",
});

//=========================================================================
// Динамическая вставка контента в модальное окно .popup__callback

const linkReviews = document.querySelectorAll('.reviews-block__btn');
const popupBlock = document.querySelector('.popup_callback .reviews-block');

const block = linkReviews[0].closest('.reviews-block');
popupBlock.innerHTML = block.innerHTML;
popupBlock.querySelector('.reviews-block__btn').remove();

linkReviews.forEach(link => {
  link.addEventListener('click', (event) => {
    const block = event.currentTarget.closest('.reviews-block');

    popupBlock.innerHTML = block.innerHTML;
    popupBlock.querySelector('.reviews-block__btn').remove();
  });
});

