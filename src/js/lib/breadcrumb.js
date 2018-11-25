import Reveal from 'reveal.js';

const template = document.createElement('div')
template.className = 'breadcrumb'
template.setAttribute('aria-hidden', 'true')

const slidesNode = document.querySelector('.slides')
slidesNode.insertBefore(template, slidesNode.firstChild)

const updateBreadcrumb = event => {
  const slideNode = event.currentSlide
  const breadcrumb = slideNode.classList.contains('interleaf')
    ? null
    : slideNode.parentElement.dataset['breadcrumb']

  if (!breadcrumb) {
    template.classList.add('hide')
    // delay for animation
    setTimeout(() => { template.textContent = breadcrumb }, 200)
  } else {
    template.textContent = breadcrumb
    template.classList.remove('hide')
  }
}

if (Reveal.isReady()) {
  updateBreadcrumb({currentSlide: Reveal.getCurrentSlide()})
}
Reveal.addEventListener('slidechanged', updateBreadcrumb)
