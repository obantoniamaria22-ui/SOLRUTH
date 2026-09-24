function irAProductos() {
  const inputBuscar = document.getElementById("buscar");
  const texto = (inputBuscar ? inputBuscar.value : "").trim();
  const url = new URL("productos.html", window.location.href);

  if (texto) {
    url.searchParams.set("buscar", texto);
  }

  window.location.href = url.pathname + url.search;
}

function buscarProducto() {
  irAProductos();
}

let tabLogin = document.getElementById("tabLogin");
let tabRegistro = document.getElementById("tabRegistro");
let formLogin = document.getElementById("formLogin");
let formRegistro = document.getElementById("formRegistro");

if (tabLogin && tabRegistro) {
  tabLogin.addEventListener("click", function() {
    tabLogin.classList.add("activo");
    tabRegistro.classList.remove("activo");
    if (formLogin) formLogin.style.display = "block";
    if (formRegistro) formRegistro.style.display = "none";
  });

  tabRegistro.addEventListener("click", function() {
    tabRegistro.classList.add("activo");
    tabLogin.classList.remove("activo");
    if (formLogin) formLogin.style.display = "none";
    if (formRegistro) formRegistro.style.display = "block";
  });
}

const inputBuscar = document.getElementById("inputBuscar");
if (inputBuscar) {
  inputBuscar.addEventListener("input", function() {
    let texto = this.value.toLowerCase();
    let tarjetas = document.querySelectorAll(".producto-card");

    tarjetas.forEach(function(card) {
      let nombre = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = nombre.includes(texto) ? "block" : "none";
    });
  });
}

document.getElementById("formIndex")?.reset();

const inputHomeBuscar = document.getElementById("buscar");
if (inputHomeBuscar) {
  inputHomeBuscar.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      buscarProducto();
    }
  });
}