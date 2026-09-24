let categorias = [];

document.getElementById("formCategoria").addEventListener("submit", function (event) {

    event.preventDefault();

    let categoria = {

        idCategoria: document.getElementById("idCategoria").value,
        nombre: document.getElementById("nombreCategoria").value

    };

    categorias.push(categoria);

    console.log(categorias);

    document.getElementById("formCategoria").reset();
    Swal.fire({
        title: "¡Categoría guardada!",
        text: "La categoría se registró correctamente.",
        icon: "success",
        confirmButtonText: "Aceptar"
    });


});