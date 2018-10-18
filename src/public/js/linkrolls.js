((window, document, undefined) => {
  const slidesNode = document.querySelector('.slides')

  const template = document.createElement('ul')
  template.className = 'linkrolls hide'
  template.setAttribute('aria-hidden', 'true')
  slidesNode.appendChild(template)

  document.querySelectorAll('.slides section .linkrolls').forEach(node => {
    node.classList.add('hide')
  })

  const mv = (orig, dest) => {
    orig.querySelectorAll('.linkrolls li').forEach(n => dest.appendChild(n))
    if (orig === template) { orig.classList.add('hide') }
    if (dest === template) { dest.classList.remove('hide') }
  }

  const toggle = event => {
    const linkrollsNode = event.currentSlide.querySelector('.linkrolls')

    if (template.hasChildNodes()) {
      mv(template, event.previousSlide.querySelector('.linkrolls'))
    }

    if (linkrollsNode) {
      mv(linkrollsNode, template)
    }
  }

  if (window.Reveal.isReady()) {
    toggle({ currentSlide: window.Reveal.getCurrentSlide() })
  }
  window.Reveal.addEventListener('slidechanged', toggle)

})(window, document)
