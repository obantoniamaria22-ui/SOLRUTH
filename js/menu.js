
const prendas = [
  {
    idProducto: 1,
    nombreProducto: "Conjunto Deportivo Negro",
    descripcion: "Top + legging negro de alto impacto",
    precio: 45000,
    categoria: "conjuntos",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdqpaE687UXbLB_8z4StZ2nQhjlQf78SoxnG47Jx3gRovNKpx_Af1QnN8&s=10"
  },
  {
    idProducto: 2,
    nombreProducto: "Conjunto Deportivo Azul",
    descripcion: "Conjunto azul tipo licra larga",
    precio: 45000,
    categoria: "conjuntos",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2eX9Zzv_bGoQL0NaATT4nbMVHumBN6eXttWBa6qdVliElOAK79XPkRRk-&s=10"
  },
  {
    idProducto: 3,
    nombreProducto: "Legging Fitness Rosado",
    descripcion: "Legging rosado de compresión",
    precio: 38000,
    categoria: "leggings",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-jIsntZq1oxkawbISUtiUWEBOn9LhMs9TpFSGOlkRit2YTC3bQ8eA6fxo&s=10"
  },
  {
    idProducto: 4,
    nombreProducto: "Legging Negro Clásico",
    descripcion: "Legging negro tiro alto",
    precio: 35000,
    categoria: "leggings",
    imagen: "https://ropamujerbonita.com/wp-content/uploads/2023/12/808-leggins-negro-tiro-alto-mujer.jpg"
  },
  {
    idProducto: 5,
    nombreProducto: "Top Deportivo Azul bebe",
    descripcion: "Top corto deportivo de alto impacto",
    precio: 35000,
    categoria: "tops",
    imagen: "https://studiofco.vtexassets.com/arquivos/ids/1728379/BLUSA-AZULCLARO-S0223-3.jpg?v=639021042088870000"
  },
  {
    idProducto: 6,
    nombreProducto: "Top Deportivo Blanco",
    descripcion: "Top blanco con soporte medio",
    precio: 32000,
    categoria: "tops",
    imagen: "https://www.puntoblanco.co/cdn/shop/files/new-match-play-blanco-908-746098_000908-5.jpg?v=1771861319&width=1000"
  },
  {
    idProducto: 7,
    nombreProducto: "Enterizo Deportivo Negro",
    descripcion: "Enterizo largo de licra negra",
    precio: 55000,
    categoria: "enterizos",
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2iSiZ5m8eTF7NZpaNXNTbda4wm8vnZEv9clB_CklpgShKnkF2KOR59qw&s=10"
  }
];

const productos = prendas;
const listaImagenes = prendas.map((prenda) => prenda.imagen);

const nombresCategorias = {
  todos: "🛍️ Todos",
  conjuntos: "👕 Conjuntos",
  leggings: "🩳 Leggings",
  tops: "👚 Tops",
  enterizos: "👗 Enterizos"
};

function reconstruirMenu() {
  const nav = document.querySelector(".menu-categorias");
  if (!nav) return;

  nav.innerHTML = "";

  const categorias = ["todos", ...new Set(productos.map((p) => p.categoria))];

  categorias.forEach((categoria, index) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "menu-btn" + (index === 0 ? " activo" : "");
    boton.dataset.categoria = categoria;
    boton.textContent = nombresCategorias[categoria] || categoria;
    boton.addEventListener("click", function () {
      filtrarMenu(categoria, boton);
    });
    nav.appendChild(boton);
  });
}

function mostrarProductos(lista) {
  let contenedor = document.getElementById("productos-grid");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  let listaFinal = lista || productos;

  if (listaFinal.length === 0) {
    contenedor.innerHTML = `
      <p style="grid-column:1/-1;text-align:center;color:#888;padding:30px;">
        😢 No se encontraron productos
      </p>
    `;
    return;
  }

  listaFinal.forEach(function(prod) {
    contenedor.innerHTML += `
      <div class="producto-card">
        <img src="${prod.imagen}" alt="${prod.nombreProducto}"
             onerror="this.src='https://via.placeholder.com/200x220?text=Sin+Imagen'">
        <h3>${prod.nombreProducto}</h3>
        <p class="descripcion">${prod.descripcion}</p>
        <p class="precio">$${prod.precio.toLocaleString()}</p>
        <button class="btn-comprar" onclick="agregarAlCarrito(${prod.idProducto})">
          Comprar ahora
        </button>
      </div>
    `;
  });
}



function filtrarMenu(categoria, boton) {
  document.querySelectorAll(".menu-btn").forEach((b) => b.classList.remove("activo"));
  if (boton) boton.classList.add("activo");

  const titulo = document.getElementById("tituloCategoria");
  if (titulo) {
    titulo.textContent = categoria === "todos"
      ? "Todos los productos"
      : "Categoría: " + (nombresCategorias[categoria] || categoria).replace(/^[^\s]+\s/, "");
  }

  const resultados = categoria === "todos"
    ? productos
    : productos.filter((p) => p.categoria === categoria);

  mostrarProductos(resultados);
}

let inputBuscar = document.getElementById("inputBuscar");
let btnBuscar = document.getElementById("btnBuscar");

function buscarProductos() {
  let texto = inputBuscar.value.toLowerCase().trim();

  let filtrados = productos.filter(function(p) {
    return p.nombreProducto.toLowerCase().includes(texto) ||
           p.descripcion.toLowerCase().includes(texto);
  });

  mostrarProductos(filtrados);
}

inputBuscar?.addEventListener("input", buscarProductos);
btnBuscar?.addEventListener("click", buscarProductos);



let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(idProducto) {
  let producto = productos.find(p => p.idProducto === idProducto);
  if (!producto) return;

  carrito.push(producto);
  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarContadorCarrito();

  Swal.fire({
    title: "¡Agregado!",
    text: producto.nombreProducto + " - $" + producto.precio.toLocaleString(),
    icon: "success",
    timer: 1500,
    showConfirmButton: false
  });
}



function actualizarContadorCarrito() {
  let btn = document.getElementById("btnCarrito");
  if (btn) btn.textContent = "🛒 Carrito (" + carrito.length + ")";
}



document.getElementById("btnLogin")?.addEventListener("click", function() {
  Swal.fire({
    title: "Iniciar sesión",
    text: "Aquí iría el formulario de login",
    icon: "info",
    confirmButtonText: "Aceptar"
  });
});
function abrirCarrito() {
  document.getElementById("carritoOverlay").classList.add("abierto");
  mostrarCarrito();
}

function cerrarCarrito() {
  document.getElementById("carritoOverlay").classList.remove("abierto");
}

document.getElementById("carritoOverlay")?.addEventListener("click", function(e) {
  if (e.target === this) cerrarCarrito();
});

function mostrarCarrito() {
  let contenedor = document.getElementById("carrito-items");
  if (!contenedor) return;

  if (carrito.length === 0) {
    contenedor.innerHTML = `
      <p class="carrito-vacio">🛒 Tu carrito está vacío</p>
    `;
    document.getElementById("carrito-total").textContent = "Total: $0";
    return;
  }

  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach(function(item, index) {
    total += item.precio;
    contenedor.innerHTML += `
      <div class="carrito-item">
        <img src="${item.imagen}" onerror="this.src='https://via.placeholder.com/65'">
        <div class="info">
          <h4>${item.nombreProducto}</h4>
          <p>${item.descripcion}</p>
        </div>
        <span class="precio">$${item.precio.toLocaleString()}</span>
        <button class="eliminar" onclick="eliminarDelCarrito(${index})">✕</button>
      </div>
    `;
  });

  document.getElementById("carrito-total").textContent = "Total: $" + total.toLocaleString();
}

+function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  actualizarContadorCarrito();
}

function pagar() {
  if (carrito.length === 0) {
    Swal.fire({
      title: "Carrito vacío",
      text: "Agrega productos antes de pagar",
      icon: "info",
      confirmButtonText: "Aceptar"
    });
    return;
  }

  let total = carrito.reduce((suma, item) => suma + item.precio, 0);

  Swal.fire({
    title: "¡Pedido realizado!",
    text: "Total: $" + total.toLocaleString(),
    icon: "success",
    confirmButtonText: "Aceptar"
  });

  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  actualizarContadorCarrito();
}

+document.getElementById("btnCarrito")?.addEventListener("click", abrirCarrito);


mostrarProductos();
actualizarContadorCarrito();