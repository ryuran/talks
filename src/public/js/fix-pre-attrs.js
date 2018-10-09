((window, document, undefined) => {
  document.querySelectorAll('code[data-line]').forEach(node => {
    node.parentNode.dataset['line'] = node.dataset['line']
    delete node.dataset['line']
  })

  document.querySelectorAll('code.line-numbers').forEach(node => {
    node.parentNode.classList.add('line-numbers')
    node.classList.remove('line-numbers')
  })
})(window, document)
