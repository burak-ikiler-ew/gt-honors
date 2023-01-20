(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.heroSearchJS = {
    attach (context) {
      if (context !== document) {
        return;
      }

      const heroParagraph = $('.paragraph--type--hero-search');
      const heroVideoWrapper = $('.paragraph--type--hero-search .video-embed-field-responsive-video');
      const heroVideo = heroVideoWrapper.find('iframe');
      const ppButton = heroParagraph.find('.play-pause-buttons button');
      const pauseButton = heroParagraph.find('.pause-video');
      const playButton = heroParagraph.find('.play-video');

      if (heroVideoWrapper.length > 0) {
        const videoSrc = heroVideo.attr('src');
        const substrVideoSrc = videoSrc.substr(0, videoSrc.indexOf('?'));
        const videoId = substrVideoSrc.substr(substrVideoSrc.length - 11);
        const newVideoSrc = substrVideoSrc + '?autoplay=1&mute=1&amp;controls=0&amp;showinfo=0&loop=1&enablejsapi=1&playlist=' + videoId;

        heroParagraph.addClass('has-video');
        heroVideo.attr('autoplay', '1');
        heroVideo.attr('mute', '1');
        heroVideo.attr('loop', '1');
        heroVideo.attr('src', newVideoSrc);

        ppButton.on('click', (e) => {
          e.preventDefault();
          $('.pause-video, .play-video').toggle();
        });

        pauseButton.on('click', (e) => {
          e.preventDefault();
          heroVideo.attr('src', videoSrc);
        });

        playButton.on('click', (e) => {
          e.preventDefault();
          heroVideo.attr('src', newVideoSrc);
        });
      }
    },
  };
}(jQuery, Drupal));
