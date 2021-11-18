const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const templateCard = document.getElementById('template-card').content //para acceder a los elementos
const templateFooter = document.getElementById('template-footer').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment();
let carrito = {};

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'))
    pintarCarrito() 
  }
})
cards.addEventListener('click', e => {
  addCarrito(e);

})

items.addEventListener('click', e => {
  btnAccion(e)
})

const pintarCards = () => {
  items.innerHTML = ''
  products.forEach(p => {
    templateCard.querySelector('h5').textContent = p.title
    templateCard.querySelector('p').textContent =  p.precio
    templateCard.querySelector('img').setAttribute("src", p.thumbnailUrl)
    templateCard.querySelector('button').dataset.id = p.id
    const clone = templateCard.cloneNode(true);
    fragment.appendChild(clone)
  })
  cards.appendChild(fragment)

  

}



pintarCards();

const addCarrito = e => {
  //console.log(e.target);
  //console.log(e.target.classList.contains('btn-dark'))
  if (e.target.classList.contains('btn-dark')) {
    setCarrito(e.target.parentElement);
  }
  e.stopPropagation(); //Detiene otro evento que se genere en nuestro item
}
const setCarrito = objeto => {
  const producto = {
    id: objeto.querySelector('button').dataset.id,
    title: objeto.querySelector('h5').textContent,
    precio: objeto.querySelector('p').textContent,
    cantidad: 1

  }

  if (carrito.hasOwnProperty(producto.id)) {
    producto.cantidad = carrito[producto.id].cantidad + 1
  }

  carrito[producto.id] = {
    ...producto
  } //con los tres puntos accedemos a la informacion del objeto y hacemos una copia de producto
  pintarCarrito()
}


const pintarCarrito = () => {
  //console.log(carrito);
  items.innerHTML = ''
  Object.values(carrito).forEach(producto => {
    templateCarrito.querySelector('th').textContent = producto.id
    templateCarrito.querySelectorAll('td')[0].textContent = producto.title
    templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
    templateCarrito.querySelector('.btn-info').dataset.id = producto.id 
    templateCarrito.querySelector('.btn-danger').dataset.id = producto.id 
    templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

    const clone = templateCarrito.cloneNode(true)
    fragment.appendChild(clone)
  }) //objetc.valuespara poder acceder al carrito
  items.appendChild(fragment)

  pintarFooter()
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

const pintarFooter = () => {
  footer.innerHTML = ''
  if (Object.keys(carrito).length === 0){
    footer.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`
    return
  }

  const nCantidad = Object.values(carrito).reduce((acc, {cantidad}) => acc + cantidad, 0 ) 
  const nPrecio = Object.values(carrito).reduce ((acc, {cantidad, precio}) => acc + cantidad * precio,0)

  templateFooter.querySelectorAll('td')[0].textContent = nCantidad
  templateFooter.querySelector('span').textContent = nPrecio 

  const clone = templateFooter.cloneNode(true)
  fragment.appendChild(clone)

  footer.appendChild(fragment)

  const btnVaciar = document.getElementById('vaciar-carrito')
  btnVaciar.addEventListener('click', () => {
    carrito = {}
    pintarCarrito()
     
  })
}

const btnAccion = e => {
  //Aumentamos la cantidad
  if (e.target.classList.contains('btn-info')){
    carrito[e.target.dataset.id]

    const producto = carrito[e.target.dataset.id] 
    producto.cantidad++  
    carrito [e.target.dataset.id] = {...producto }
    pintarCarrito()
  }

  if (e.target.classList.contains('btn-danger')){
    const producto = carrito[e.target.dataset.id] 
    producto.cantidad--
    if(producto.cantidad === 0){
      delete carrito [e.target.dataset.id ]
    }  
    pintarCarrito() 
  }

  e.stopPropagation()
}

