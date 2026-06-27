let totalPedidos = 0;

const formulario = document.getElementById("formularioPedido");
const listaPedidos = document.getElementById("listaPedidos");
const mensaje = document.getElementById("mensaje");
const total = document.getElementById("totalPedidos");

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const producto = document.getElementById("producto").value;
    const categoria = document.getElementById("categoria").value;

    if (nombre === "" || producto === "" || categoria === "") {
        mensaje.textContent = "Por favor complete todos los campos.";
        mensaje.style.color = "red";
        return;
    }

    const tarjeta = document.createElement("div");
    tarjeta.className = "card p-3 mb-2";

    tarjeta.innerHTML = `
        <h4>${producto}</h4>
        <p>Cliente: ${nombre}</p>
        <p>Categoría: ${categoria}</p>
        <button class="btn btn-warning btn-sm">Eliminar</button>
    `;

    const botonEliminar = tarjeta.querySelector("button");

    botonEliminar.addEventListener("click", function() {
        tarjeta.remove();
        totalPedidos--;
        total.textContent = totalPedidos;
    });

    listaPedidos.appendChild(tarjeta);

    totalPedidos++;
    total.textContent = totalPedidos;

    mensaje.textContent = "Pedido registrado correctamente.";
    mensaje.style.color = "green";

    formulario.reset();
});