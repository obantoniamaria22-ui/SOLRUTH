let clientes = [];

document.getElementById("formCliente").addEventListener("submit", function(event) {

    event.preventDefault();

    let cliente = {

        idUsuario: document.getElementById("idUsuario").value,
        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        contrasena: document.getElementById("contrasena").value,
        fechaRegistro: document.getElementById("fechaRegistro").value

    };

    clientes.push(cliente);

    alert("Cliente registrado correctamente.");

    this.reset();

});

document.getElementById("formLogin").addEventListener("submit", function(event) {

    event.preventDefault();

    let correo = document.getElementById("loginCorreo").value;
    let contrasena = document.getElementById("loginContrasena").value;

    let clienteEncontrado = clientes.find(function(cliente) {

        return cliente.correo === correo &&
               cliente.contrasena === contrasena;

    });

    if (clienteEncontrado) {

        alert("Bienvenido/a " + clienteEncontrado.nombre);

    } else {

        alert("Correo o contraseña incorrectos.");

    }

});