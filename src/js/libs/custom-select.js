const WRAPPER = 'wrap-select-nice'
const WRAPPER_SELECT = 'wrapper-select-nice'
const NICE_SELECTED = 'nice-selected'
const NICE_SELECT_ITEM = 'nice-select-item'
const NICE_SELECT_LIST = 'nice-select-list'

class SelectNice {
  constructor (el, height) {
    let findEl = (typeof el === 'string') ? document.querySelector(el) : el
    this.setElem(findEl)
    this.spn = ''
    this.ul = ''
    this.li = []
    this.ulHeight = 0
    this.wrapper = ''
    this.maxHeight = height !== undefined ? height : 250
    this.init()
  }
  init () {
    this.setStructure()
    this.setHeight()
  }
  setStructure () {
    // Новая обертка
    let wrap = document.createElement('div')
    wrap.className = WRAPPER
    this.wrapper = document.createElement('div')
    this.wrapper.className = WRAPPER_SELECT
    this.wrapper.innerHTML = this.el.outerHTML
    wrap.appendChild(this.wrapper)
    this.el.parentNode.replaceChild(wrap, this.el)
    this.setElem(this.wrapper.querySelector('select'))
    this.el.addEventListener('change', this.selectHandler.bind(this))
    // Выбранный элемент
    this.spn = document.createElement('span')
    this.spn.className = NICE_SELECTED
    this.spn.setAttribute('data-value', this.options[0].value)
    this.spn.innerHTML = this.options[0].text
    this.spn.addEventListener('click', this.spnHandler.bind(this))
    // Список элементов
    this.ul = document.createElement('ul')
    this.ul.className = NICE_SELECT_LIST
    for (let i = 0; i < this.options.length; i++) {
      let li = document.createElement('li')
      li.className = (i === 0) ? `${NICE_SELECT_ITEM} selected` : NICE_SELECT_ITEM
      li.setAttribute('data-value', this.options[i].value)
      li.innerHTML = this.options[i].text
      li.addEventListener('click', this.optionHandler.bind(this, li, i))
      this.li.push(li)
      this.ul.appendChild(li)
    }
    this.wrapper.appendChild(this.spn)
    this.wrapper.appendChild(this.ul)
  }
  selectHandler (e) {
    let idx = e.target.selectedIndex
    this.setSpanVal(e.target.value, this.options[idx].text, idx)
  }
  optionHandler (li, i) {
    this.el.selectedIndex = i
    this.setSpanVal(li.dataset.value, li.innerHTML, i)
    this.spnHandler()
  }
  setSpanVal (val, text, i) {
    this.spn.dataset.value = val
    this.spn.innerHTML = text
    this.setSelected(i)
  }
  spnHandler () {
    if (!this.wrapper.classList.contains('active')) {
      this.wrapper.classList.add('active')
      this.ul.style.height = this.ulHeight + 'px'
    } else {
      this.close()
    }
  }
  close () {
    this.wrapper.classList.remove('active')
    this.ul.style.height = '0'
  }
  setSelected (i) {
    this.li.forEach(item => item.classList.remove('selected'))
    this.li[i].classList.add('selected')
  }
  setHeight () {
    if (this.ul.clientHeight > this.maxHeight) {
      this.ulHeight = this.maxHeight
      this.ul.style.overflow = 'auto'
    } else {
      this.ulHeight = this.ul.clientHeight
    }
    this.ul.style.height = '0'
  }
  setElem (el) {
    this.el = el
    this.options = this.el.options
  }
}

// Закрытие вне элемента
document.addEventListener('mouseup', (e) => {
  if (e.target.closest('.' + WRAPPER_SELECT + '.' + 'active') === null) {
    let containers = document.querySelectorAll('.' + WRAPPER_SELECT)
    let uls = document.querySelectorAll('.' + NICE_SELECT_LIST)

    containers.forEach(item => item.classList.remove('active'))
    uls.forEach(item => { item.style.height = '0' })
  }
})

export default function (selector) {
  let findEl = (typeof selector === 'string') ? document.querySelectorAll(selector) : selector
  findEl.forEach(i => {
    // eslint-disable-next-line no-new
    new SelectNice(i, 150)
  })
}
