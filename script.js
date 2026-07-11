let totalPedidos = 0;

const formulario = document.getElementById("formularioPedido");
const nombre = document.getElementById("nombre");
const producto = document.getElementById("producto");
const categoria = document.getElementById("categoria");

const errorNombre = document.getElementById("errorNombre");
const errorProducto = document.getElementById("errorProducto");
const errorCategoria = document.getElementById("errorCategoria");

const listaPedidos = document.getElementById("listaPedidos");
const mensaje = document.getElementById("mensaje");
const total = document.getElementById("totalPedidos");

function validarNombre() {
    const valorNombre = nombre.value.trim();

    if (valorNombre === "") {
        nombre.classList.add("is-invalid");
        nombre.classList.remove("is-valid");
        errorNombre.textContent = "El nombre es obligatorio.";
        return false;
    }

    if (valorNombre.length < 3) {
        nombre.classList.add("is-invalid");
        nombre.classList.remove("is-valid");
        errorNombre.textContent = "El nombre debe tener al menos 3 caracteres.";
        return false;
    }

    nombre.classList.add("is-valid");
    nombre.classList.remove("is-invalid");
    errorNombre.textContent = "";
    return true;
}

function validarProducto() {
    const valorProducto = producto.value.trim();

    if (valorProducto === "") {
        producto.classList.add("is-invalid");
        producto.classList.remove("is-valid");
        errorProducto.textContent = "La descripción es obligatoria.";
        return false;
    }

    if (valorProducto.length < 5) {
        producto.classList.add("is-invalid");
        producto.classList.remove("is-valid");
        errorProducto.textContent = "La descripción debe tener al menos 5 caracteres.";
        return false;
    }

    producto.classList.add("is-valid");
    producto.classList.remove("is-invalid");
    errorProducto.textContent = "";
    return true;
}

function validarCategoria() {
    if (categoria.value === "") {
        categoria.classList.add("is-invalid");
        categoria.classList.remove("is-valid");
        errorCategoria.textContent = "Debe seleccionar una categoría.";
        return false;
    }

    categoria.classList.add("is-valid");
    categoria.classList.remove("is-invalid");
    errorCategoria.textContent = "";
    return true;
}

nombre.addEventListener("input", validarNombre);
nombre.addEventListener("blur", validarNombre);

producto.addEventListener("input", validarProducto);
producto.addEventListener("blur", validarProducto);

categoria.addEventListener("input", validarCategoria);
categoria.addEventListener("blur", validarCategoria);

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const nombreValido = validarNombre();
    const productoValido = validarProducto();
    const categoriaValida = validarCategoria();

    if (!nombreValido || !productoValido || !categoriaValida) {
        mensaje.className = "alert alert-danger mt-3";
        mensaje.textContent = "Revise los campos antes de registrar el pedido.";
        return;
    }

    const tarjeta = document.createElement("div");
    tarjeta.className = "card p-3 mb-2";

    const titulo = document.createElement("h4");
    titulo.textContent = producto.value.trim();

    const cliente = document.createElement("p");
    cliente.textContent = "Cliente: " + nombre.value.trim();

    const tipo = document.createElement("p");
    tipo.textContent = "Categoría: " + categoria.value;

    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "btn btn-warning btn-sm";

    tarjeta.appendChild(titulo);
    tarjeta.appendChild(cliente);
    tarjeta.appendChild(tipo);
    tarjeta.appendChild(botonEliminar);

    listaPedidos.appendChild(tarjeta);

    totalPedidos++;
    total.textContent = totalPedidos;

    mensaje.className = "alert alert-success mt-3";
    mensaje.textContent = "Pedido registrado correctamente.";

    botonEliminar.addEventListener("click", function () {
        tarjeta.remove();
        totalPedidos--;
        total.textContent = totalPedidos;
    });

    formulario.reset();

    nombre.classList.remove("is-valid", "is-invalid");
    producto.classList.remove("is-valid", "is-invalid");
    categoria.classList.remove("is-valid", "is-invalid");

    errorNombre.textContent = "";
    errorProducto.textContent = "";
    errorCategoria.textContent = "";
});