from flask import Flask, render_template

app = Flask(__name__)

negocio = {
    "nombre": "Papi Pollos",
    "slogan": "Comida rápida con sabor ecuatoriano",
    "ciudad": "Quevedo",
    "telefono": "0967995373",
    "correo": "papipollos@gmail.com"
}

productos = [
    {
        "nombre": "Papipollo 1 presa",
        "descripcion": "Incluye papas, ensalada fría con vinagreta, 1 presa de pollo frito, mayonesa y salsa de tomate.",
        "precio": 2.00,
        "stock": 10,
        "icono": "🍗"
    },
    {
        "nombre": "Papipollo 2 presas",
        "descripcion": "Incluye papas, ensalada fría con vinagreta, 2 presas de pollo frito, mayonesa y salsa de tomate.",
        "precio": 3.00,
        "stock": 10,
        "icono": "🍗🍗"
    },
    {
        "nombre": "Hamburguesa completa",
        "descripcion": "Hamburguesa acompañada de papas fritas y salsas.",
        "precio": 2.50,
        "stock": 10,
        "icono": "🍔"
    },
    {
        "nombre": "Hamburguesa Bestia",
        "descripcion": "Hamburguesa acompañada de papas fritas, salsas y 1 presa de pollo frito.",
        "precio": 3.50,
        "stock": 10,
        "icono": "🍔🍗"
    },
    {
        "nombre": "Cola personal",
        "descripcion": "Bebida gaseosa personal para acompañar tu pedido.",
        "precio": 0.50,
        "stock": 15,
        "icono": "🥤"
    },
    {
        "nombre": "Presa adicional",
        "descripcion": "Presa adicional de pollo frito para complementar tu pedido.",
        "precio": 1.00,
        "stock": 10,
        "icono": "🍗"
    }
]

promocion = {
    "titulo": "Arma tu pedido",
    "descripcion": "Elige tu opción favorita y agrega bebidas o presas adicionales.",
    "activa": True
}


@app.route("/")
def inicio():
    return render_template(
        "index.html",
        negocio=negocio,
        promocion=promocion,
        productos=productos
    )


@app.route("/productos")
def ver_productos():
    return render_template(
        "productos.html",
        negocio=negocio,
        productos=productos
    )


if __name__ == "__main__":
    app.run(debug=True)