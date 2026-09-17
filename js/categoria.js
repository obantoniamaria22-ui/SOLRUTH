let categorias = [];

document.getElementById("formCategoria").addEventListener("submit", function(event) {

    event.preventDefault();

    let categoria = {

        idCategoria: document.getElementById("idCategoria").value,
        nombreCategoria: document.getElementById("nombreCategoria").value

    };

    categorias.push(categoria);

    mostrarCategorias();

    this.reset();

});

function mostrarCategorias() {

    let lista = document.getElementById("listaCategorias");

    lista.innerHTML = "";

    categorias.forEach(function(categoria) {

        lista.innerHTML += `
            <p>
                ID: ${categoria.idCategoria} -
                ${categoria.nombreCategoria}
            </p>
        `;

    });

}