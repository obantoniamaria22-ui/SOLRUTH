let productos = [];

function getProductosFiltrados(texto = "") {
    const valor = texto.toLowerCase().trim();

    if (!valor) {
        return productos;
    }

    return productos.filter(function (producto) {
        return (producto.nombre || "").toLowerCase().includes(valor) ||
               (producto.descripcion || "").toLowerCase().includes(valor);
    });
}

function buscar() {
    const input = document.getElementById("busqueda");
    const texto = input ? input.value : "";
    mostrarProductos(getProductosFiltrados(texto));
}

document.getElementById("formProducto").addEventListener("submit", function (event) {

    event.preventDefault();

    let producto = {

        idProducto: document.getElementById("idProducto").value,
        nombre: document.getElementById("nombreProducto").value,
        descripcion: document.getElementById("descripcion").value,
        precio: document.getElementById("precio").value,
        idCategoria: document.getElementById("idCategoria").value

    };

    productos.push(producto);
    document.getElementById("formProducto").reset();
    Swal.fire({
        title: "¡Pedido guardado!",
        text: "El pedido se registró correctamente.",
        icon: "success",
        confirmButtonText: "Guardar pedido"
    });

    mostrarProductos(getProductosFiltrados(document.getElementById("busqueda")?.value || ""));

    this.reset();

});

function mostrarProductos(lista = productos) {

    let listaProductos = document.getElementById("listaProductos");
    if (!listaProductos) return;

    listaProductos.innerHTML = "";

    lista.forEach(function (producto) {

        listaProductos.innerHTML += `
            <div class="producto">

                <h3 class="nombre">
                    ${producto.nombre}
                </h3>

                <p>${producto.descripcion}</p>

                <p>Precio: $${producto.precio}</p>

                <p>ID Categoría: ${producto.idCategoria}</p>

            </div>
        `;

    });

}

const params = new URLSearchParams(window.location.search);
const textoInicial = params.get("buscar") || "";

if (document.getElementById("busqueda")) {
    document.getElementById("busqueda").value = textoInicial;
    mostrarProductos(getProductosFiltrados(textoInicial));

    document.getElementById("busqueda").addEventListener("input", function () {
        mostrarProductos(getProductosFiltrados(this.value));
    });
}