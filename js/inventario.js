let inventario = [];

document.getElementById("formInventario").addEventListener("submit", function(event) {

    event.preventDefault();

    let registro = {

        idInventario: document.getElementById("idInventario").value,
        idProducto: document.getElementById("idProducto").value,
        talla: document.getElementById("talla").value,
        color: document.getElementById("color").value,
        cantidad: document.getElementById("cantidad").value

    };

    inventario.push(registro);

    mostrarInventario();

    this.reset();

});

function mostrarInventario() {

    let lista = document.getElementById("listaInventario");

    lista.innerHTML = "";

    inventario.forEach(function(item) {

        lista.innerHTML += `
            <div class="producto">

                <p>ID Inventario: ${item.idInventario}</p>
                <p>ID Producto: ${item.idProducto}</p>
                <p>Talla: ${item.talla}</p>
                <p>Color: ${item.color}</p>
                <p>Disponible: ${item.cantidad}</p>

            </div>
        `;

    });

}