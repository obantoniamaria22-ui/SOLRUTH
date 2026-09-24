let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

function redirigirAlInicio() {
  window.location.href = "index.html";
}

document.getElementById("formCliente")?.addEventListener("submit", function(event) {
  event.preventDefault();

  let correo = document.getElementById("correo").value;

  let existe = clientes.find(c => c.correo === correo);
  if (existe) {
    Swal.fire({
      title: "Correo ya registrado",
      text: "Usa otro correo electrónico",
      icon: "warning",
      confirmButtonText: "Aceptar"
    });
    return;
  }

  let cliente = {
    idUsuario: document.getElementById("idUsuario").value,
    nombre: document.getElementById("nombre").value,
    correo: correo,
    contrasena: document.getElementById("contrasena").value,
    fechaRegistro: document.getElementById("fechaRegistro").value
  };

  clientes.push(cliente);
  localStorage.setItem("clientes", JSON.stringify(clientes));

  Swal.fire({
    title: "¡Registro guardado!",
    text: "Bienvenido " + cliente.nombre,
    icon: "success",
    confirmButtonText: "Aceptar"
  }).then(() => redirigirAlInicio());

  this.reset();
  console.log("Clientes:", clientes);
});

document.getElementById("formLogin")?.addEventListener("submit", function(event) {
  event.preventDefault();

  let correo = document.getElementById("loginCorreo").value;
  let contrasena = document.getElementById("loginContrasena").value;

  let encontrado = clientes.find(function(c) {
    return c.correo === correo && c.contrasena === contrasena;
  });

  if (encontrado) {
    localStorage.setItem("usuarioActual", JSON.stringify(encontrado));

    Swal.fire({
      title: "¡Bienvenido!",
      text: encontrado.nombre,
      icon: "success",
      confirmButtonText: "Aceptar"
    }).then(() => redirigirAlInicio());
  } else {
    Swal.fire({
      title: "Error",
      text: "Correo o contraseña incorrectos",
      icon: "error",
      confirmButtonText: "Aceptar"
    });
  }

  this.reset();
});