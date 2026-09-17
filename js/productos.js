let productos = [];

document.getElementById("formProducto").addEventListener("submit", function(event) {

    event.preventDefault();

    let producto = {

        idProducto: document.getElementById("idProducto").value,
        nombre: document.getElementById("nombreProducto").value,
        descripcion: document.getElementById("descripcion").value,
        precio: document.getElementById("precio").value,
        idCategoria: document.getElementById("idCategoria").value

    };

    productos.push(producto);

    mostrarProductos();

    this.reset();

});

function mostrarProductos() {

    let lista = document.getElementById("listaProductos");

    lista.innerHTML = "";

    productos.forEach(function(producto) {

        lista.innerHTML += `
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