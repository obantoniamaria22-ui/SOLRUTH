let productos = [
  { idProducto: 1, nombreProducto: "Conjunto Deportivo Negro", descripcion: "Top + legging negro", precio: 45000, idCategoria: 1, imagen: "img/conjunto-negro.jpg" },
  { idProducto: 2, nombreProducto: "Conjunto Deportivo Azul",  descripcion: "Conjunto azul tipo licra", precio: 45000, idCategoria: 1, imagen: "img/conjunto-azul.jpg" },
  { idProducto: 3, nombreProducto: "Top Deportivo Negro",      descripcion: "Top corto de alto impacto", precio: 35000, idCategoria: 4, imagen: "img/top-negro.jpg" }
];

let inventario = [];
let pedidos = [];

function mostrarProductos() {
  let contenedor = document.getElementById("productos-grid");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  productos.forEach(function(prod) {
    contenedor.innerHTML += `
      <div class="producto-card">
        <img src="${prod.imagen}" alt="${prod.nombreProducto}"
             onerror="this.src='https://via.placeholder.com/200x220?text=Sin+Imagen'">
        <h3>${prod.nombreProducto}</h3>
        <p class="precio">$${prod.precio.toLocaleString()}</p>
        <div class="tallas">
          <span>S</span><span>M</span><span>L</span><span>XL</span>
        </div>
        <button class="btn-comprar" onclick="agregarAlCarrito(${prod.idProducto})">
          Comprar ahora
        </button>
      </div>
    `;
  });
}


let carrito = [];

function agregarAlCarrito(idProducto) {
  let producto = productos.find(p => p.idProducto === idProducto);
  if (!producto) return;

  carrito.push(producto);
  alert("✅ Agregado al carrito: " + producto.nombreProducto);
  mostrarCarrito();
}


function mostrarCarrito() {
  let lista = document.getElementById("carrito-items");
  if (!lista) return;

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach(function(item) {
    total += item.precio;
    lista.innerHTML += `
      <div class="carrito-item">
        <img src="${item.imagen}" onerror="this.src='https://via.placeholder.com/70'">
        <div class="info">
          <h4>${item.nombreProducto}</h4>
          <p>${item.descripcion}</p>
        </div>
        <span class="precio">$${item.precio.toLocaleString()}</span>
      </div>
    `;
  });

  let totalEl = document.getElementById("carrito-total");
  if (totalEl) totalEl.textContent = "Total: $" + total.toLocaleString();
}


document.getElementById("formPedido")?.addEventListener("submit", function(event) {
  event.preventDefault();

  let pedido = {
    idPedido: document.getElementById("idPedido").value,
    idUsuario: document.getElementById("idUsuario").value,
    fechaPedido: document.getElementById("fechaPedido").value,
    estadoPedido: document.getElementById("estadoPedido").value,
    totalPedido: document.getElementById("totalPedido").value
  };

  pedidos.push(pedido);
  mostrarPedidos();
  this.reset();
});

function mostrarPedidos() {
  let lista = document.getElementById("listaPedidos");
  if (!lista) return;

  lista.innerHTML = "";

  pedidos.forEach(function(pedido) {
    lista.innerHTML += `
      <div class="producto">
        <h3>Pedido #${pedido.idPedido}</h3>
        <p>Usuario: ${pedido.idUsuario}</p>
        <p>Fecha: ${pedido.fechaPedido}</p>
        <p>Estado: ${pedido.estadoPedido}</p>
        <p>Total: $${pedido.totalPedido}</p>
      </div>
    `;
  });
}

    document.getElementById("formBuscar").reset();
    Swal.fire({
    title: "¡Inventario guardado!",
    text: "Inventario guardado correctamente",
    icon: "success",
    confirmButtonText: "Guardar inventario"
});

mostrarProductos();
mostrarCarrito();