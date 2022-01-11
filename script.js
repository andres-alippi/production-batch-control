const Storage = {
  get() {
    return JSON.parse(localStorage.getItem('fullcolor.gestao:registries')) || []
  },
  set(registries) {
    localStorage.setItem(
      'fullcolor.gestao:registries',
      JSON.stringify(registries)
    )
  }
}

const Registry = {
  all: Storage.get(),

  add(registry) {
    Registry.all.push(registry)
    App.reload()
  },
  remove(index) {
    Registry.all.splice(index, 1)
    App.reload()
  }
}

const DOM = {
  storagedRegistriesContainer: document.querySelector('#data-sheet tbody'),
  addRegistry(registry, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLRegistry(registry, index)
    tr.dataset.index = index

    DOM.storagedRegistriesContainer.appendChild(tr)
  },
  innerHTMLRegistry(registry, index) {
    const html = `
      <td>${registry.product}</td>
      <td>${registry.color_type}</td>
      <td>${registry.departure}</td>
      <td>${registry.batch}</td>
      <td>${registry.date}</td>
      <td>${registry.day}</td>
      <td>${registry.uk}</td>
      <td>${registry.weight}</td>
      <td>
        <a href="#" onclick="Registry.remove(${index})">Remover</a>
      </td>
    `
    return html
  },

  clearRegistries() {
    DOM.storagedRegistriesContainer.innerHTML = ''
  }
}

const Form = {
  product: document.querySelector('input#product'),
  color_type: document.querySelector('input#color-type'),
  departure: document.querySelector('input#departure'),
  batch: document.querySelector('input#batch'),
  date: document.querySelector('input#date'),
  day: document.querySelector('input#day'),
  uk: document.querySelector('input#uk'),
  weight: document.querySelector('input#weight'),

  getValues() {
    return {
      product: Form.product.value,
      color_type: Form.color_type.value,
      departure: Form.departure.value,
      batch: Form.batch.value,
      date: Form.date.value,
      day: Form.day.value,
      uk: Form.uk.value,
      weight: Form.weight.value
    }
  },

  validateFields() {
    if (
      Form.product.value.trim() === '' ||
      Form.color_type.value.trim() === '' ||
      Form.weight.value.trim() === ''
    ) {
      Form.clearFields()
      throw new Error(
        'Os campos Produto, Cor / Tipo e Peso devem ser preenchidos.'
      )
    }
  },

  clearFields() {
    Form.product.value = ''
    Form.color_type.value = ''
    Form.uk.value = ''
    Form.weight.value = ''
  },

  submit(event) {
    event.preventDefault()
    try {
      Form.validateFields()

      const registry = Form.getValues()
      Registry.add(registry)

      Form.clearFields()
    } catch (error) {
      alert(error.message)
    }
  }
}

const App = {
  init() {
    Registry.all.forEach(DOM.addRegistry)
    Storage.set(Registry.all)
  },
  reload() {
    DOM.clearRegistries()

    App.init()
  }
}

App.init()
