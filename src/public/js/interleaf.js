((Reveal, TweenLite, undefined) => {

  const burns = event => {
    console.log(event)
    if (!event.currentSlide.classList.contains('interleaf')) { return }

    const container = Reveal.getSlideBackground(event.currentSlide)
    const background = container.querySelector('.slide-background-content')

    console.log(container, background)

    TweenLite.fromTo(container, 0.8, {
      opacity: "0.75"
    }, {
      opacity: "0.5"
    })
    TweenLite.fromTo(container, 6, {
      filter: "grayscale(0) saturate(.8) contrast(1) brightness(1) hue-rotate(0deg)"
    }, {
      filter: "grayscale(.3) saturate(.25) contrast(.8) brightness(1.15) hue-rotate(-210deg)",
      delay: 3.5
    })

    TweenLite.fromTo(background, 10, {
      backgroundSize: "160% auto",
      backgroundPosition: "top right"
    }, {
      backgroundSize: "100% auto",
      backgroundPosition: "50% 45%",
      delay: 0.3
    })
  }

  if (Reveal.isReady()) {
    burns({ currentSlide: Reveal.getCurrentSlide() })
  }
  Reveal.addEventListener('slidechanged', burns)

})(Reveal, TweenLite)
