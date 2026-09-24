let pedidos = [];

document.getElementById("formPedido").addEventListener("submit", function(event) {

    event.preventDefault();

    let pedido = {

        idPedido: document.getElementById("idPedido").value,
        idUsuario: document.getElementById("idUsuario").value,
        fechaPedido: document.getElementById("fechaPedido").value,
        estadoPedido: document.getElementById("estadoPedido").value,
        totalPedido: document.getElementById("totalPedido").value

    };

    pedidos.push(pedido);
    Swal.fire({
        title: "¡Pedido guardado!",
        text: "El pedido se registró correctamente.",
        icon: "success",
        confirmButtonText: "Guardar pedido"
    });
    mostrarPedidos();

    this.reset();

});

function mostrarPedidos() {

    let lista = document.getElementById("listaPedidos");

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