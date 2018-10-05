((window, document, undefined) => {
  document.querySelectorAll('[data-breadcrumb]').forEach(el => {
    let template = document.createElement('div')
    template.className = 'breadcrumb'
    template.appendChild(document.createTextNode(el.dataset.breadcrumb))

    el.querySelectorAll('section').forEach((el, index) => {
      // skip interleaf cover
      if (index === 0) { return }

      el.insertBefore(template.cloneNode(true), el.firstChild)
    })
  })
})(window, document)
