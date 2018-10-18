((Reveal, TweenLite, undefined) => {

  const animate = event => {
    if (event.currentSlide.classList.contains('interleaf')) {
      const container = Reveal.getSlideBackground(event.currentSlide)
      const background = container.querySelector('.slide-background-content')

      TweenLite.to(container, 0.8, {
        opacity: "0.5"
      })
      TweenLite.to(container, 6, {
        filter: "grayscale(.3) saturate(.25) contrast(.8) brightness(1.15) hue-rotate(-210deg)",
        delay: 3.5
      })

      TweenLite.to(background, 10, {
        backgroundSize: "100% auto",
        backgroundPosition: "50% 45%",
        delay: 0.3
      })
    }

    if (event.currentSlide.classList.contains('thanks')) {
      const infos = event.currentSlide.querySelector('.infos')

      TweenLite.to(infos, 25, {
        top: 'auto',
        bottom: '110%',
        ease: Power0.easeNone
      })
    }
  }

  if (Reveal.isReady()) {
    animate({ currentSlide: Reveal.getCurrentSlide() })
  }
  Reveal.addEventListener('slidechanged', animate)

})(Reveal, TweenLite)
