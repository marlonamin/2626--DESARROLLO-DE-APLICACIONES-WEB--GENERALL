
const productos = [
    {
        nombre: "Papipollo",
        descripcion: "Pollo acompañado de papas fritas y diferentes salsas.",
        categoria: "Papipollo",
        icono: "🍗"
    },
    {
        nombre: "Hamburguesa",
        descripcion: "Hamburguesa preparada con carne, vegetales y salsas.",
        categoria: "Hamburguesa",
        icono: "🍔"
    },
    {
        nombre: "Salchipapa",
        descripcion: "Papas fritas acompañadas de salchicha y diferentes salsas.",
        categoria: "Salchipapa",
        icono: "🍟"
    }
];

const pedidos = [];

const productosDinamicos =
    document.getElementById("productosDinamicos");

const formulario =
    document.getElementById("formularioPedido");

const nombre =
    document.getElementById("nombre");

const producto =
    document.getElementById("producto");

const categoria =
    document.getElementById("categoria");

const errorNombre =
    document.getElementById("errorNombre");

const errorProducto =
    document.getElementById("errorProducto");

const errorCategoria =
    document.getElementById("errorCategoria");

const mensaje =
    document.getElementById("mensaje");

const listaPedidos =
    document.getElementById("listaPedidos");

const totalPedidos =
    document.getElementById("totalPedidos");

const spinnerPedido =
    document.getElementById("spinnerPedido");


function mostrarProductos() {
    productosDinamicos.innerHTML = "";

    productos.forEach(function (productoActual) {
        const columna = document.createElement("div");

        columna.className = "col-md-6 col-lg-4";

        columna.innerHTML = `
            <div class="card tarjeta-producto h-100 border-0 shadow-sm text-center">
                <div class="card-body p-4">

                    <div class="producto-icono mb-3">
                        ${productoActual.icono}
                    </div>

                    <h3 class="card-title">
                        ${productoActual.nombre}
                    </h3>

                    <p class="card-text">
                        ${productoActual.descripcion}
                    </p>

                    <button
                        type="button"
                        class="btn btn-warning boton-pedir"
                        data-producto="${productoActual.nombre}"
                        data-categoria="${productoActual.categoria}"
                    >
                        Pedir
                    </button>

                </div>
            </div>
        `;

        productosDinamicos.appendChild(columna);
    });

    const botonesPedir =
        document.querySelectorAll(".boton-pedir");

    botonesPedir.forEach(function (boton) {
        boton.addEventListener("click", function () {
            producto.value =
                boton.dataset.producto + " con gaseosa";

            categoria.value =
                boton.dataset.categoria;

            validarProducto();
            validarCategoria();

            document
                .getElementById("contacto")
                .scrollIntoView({
                    behavior: "smooth"
                });
        });
    });
}


function validarNombre() {
    const valorNombre = nombre.value.trim();

    if (valorNombre === "") {
        nombre.classList.add("is-invalid");
        nombre.classList.remove("is-valid");

        errorNombre.textContent =
            "El nombre es obligatorio.";

        return false;
    }

    if (valorNombre.length < 3) {
        nombre.classList.add("is-invalid");
        nombre.classList.remove("is-valid");

        errorNombre.textContent =
            "El nombre debe tener al menos 3 caracteres.";

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

        errorProducto.textContent =
            "La descripción del pedido es obligatoria.";

        return false;
    }

    if (valorProducto.length < 5) {
        producto.classList.add("is-invalid");
        producto.classList.remove("is-valid");

        errorProducto.textContent =
            "La descripción debe tener al menos 5 caracteres.";

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

        errorCategoria.textContent =
            "Debe seleccionar una categoría.";

        return false;
    }

    categoria.classList.add("is-valid");
    categoria.classList.remove("is-invalid");

    errorCategoria.textContent = "";

    return true;
}


function mostrarPedidos() {
    listaPedidos.innerHTML = "";

    totalPedidos.textContent = pedidos.length;

    if (pedidos.length === 0) {
        listaPedidos.innerHTML = `
            <div class="alert alert-light">
                Todavía no existen pedidos registrados.
            </div>
        `;

        return;
    }

    pedidos.forEach(function (pedidoActual, indice) {
        const pedido = document.createElement("div");

        pedido.className = "pedido-registrado";

        pedido.innerHTML = `
            <h3 class="h5">
                ${pedidoActual.producto}
            </h3>

            <p class="mb-1">
                <strong>Cliente:</strong>
                ${pedidoActual.nombre}
            </p>

            <p class="mb-3">
                <strong>Categoría:</strong>
                ${pedidoActual.categoria}
            </p>

            <button
                type="button"
                class="btn btn-warning btn-sm boton-eliminar"
                data-indice="${indice}"
            >
                Eliminar
            </button>
        `;

        listaPedidos.appendChild(pedido);
    });

    const botonesEliminar =
        document.querySelectorAll(".boton-eliminar");

    botonesEliminar.forEach(function (boton) {
        boton.addEventListener("click", function () {
            const indice =
                Number(boton.dataset.indice);

            pedidos.splice(indice, 1);

            mostrarPedidos();

            mensaje.className =
                "alert alert-warning mt-3";

            mensaje.textContent =
                "El pedido fue eliminado.";
        });
    });
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

    if (
        !nombreValido ||
        !productoValido ||
        !categoriaValida
    ) {
        mensaje.className =
            "alert alert-danger mt-3";

        mensaje.textContent =
            "Revise los campos antes de registrar el pedido.";

        return;
    }

    spinnerPedido.classList.remove("d-none");

    const botonRegistrar =
        formulario.querySelector("button[type='submit']");

    botonRegistrar.disabled = true;

    setTimeout(function () {
        const nuevoPedido = {
            nombre: nombre.value.trim(),
            producto: producto.value.trim(),
            categoria: categoria.value
        };

        pedidos.push(nuevoPedido);

        mostrarPedidos();

        mensaje.className =
            "alert alert-success mt-3";

        mensaje.textContent =
            "Pedido registrado correctamente.";

        formulario.reset();

        nombre.classList.remove(
            "is-valid",
            "is-invalid"
        );

        producto.classList.remove(
            "is-valid",
            "is-invalid"
        );

        categoria.classList.remove(
            "is-valid",
            "is-invalid"
        );

        errorNombre.textContent = "";
        errorProducto.textContent = "";
        errorCategoria.textContent = "";

        spinnerPedido.classList.add("d-none");

        botonRegistrar.disabled = false;

        const modalPedido =
            new bootstrap.Modal(
                document.getElementById("modalPedido")
            );

        modalPedido.show();

    }, 800);
});


mostrarProductos();
mostrarPedidos();
