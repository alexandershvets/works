const playButtonsMain = document.querySelectorAll('.main-slider__play-video'),
  playButtonsFeaturedVideo = document.querySelectorAll('.slide-play');

// Видео в секции hero
playButtonsMain.forEach(function(el) {
  el.addEventListener('click', function(e) {
    let video = e.currentTarget.closest('.main-slider__media').querySelector('video');
    video.play();
    e.currentTarget.style.display = 'none';
    setTimeout(function() {
      video.volume = 0.5;
    }, 1000);
  });
});

// Видео в секции featured-videos
playButtonsFeaturedVideo.forEach(function(el) {
  el.addEventListener('click', function(e) {
    let video = e.currentTarget.closest('.slider-videos__item').querySelector('video');
    video.play();
    e.currentTarget.style.display = 'none';
    let title = e.currentTarget.closest('.slider-videos__item').querySelector('.slider-videos__title');
    title.style.display = 'none';
    setTimeout(function() {
      video.volume = 0.5;
    }, 1000);
  });
});
