from flask import Flask, render_template, redirect, url_for, flash

from forms.producto_form import ProductoForm


app = Flask(__name__)

# Clave utilizada por Flask-WTF para la protección CSRF
app.config["SECRET_KEY"] = "papi-pollos-proyecto-2026"


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
        "descripcion": "Papas, ensalada fría con vinagreta, 1 presa de pollo frito, mayonesa y salsa de tomate.",
        "categoria": "Papipollo",
        "precio": 2.00,
        "stock": 10,
        "icono": "🍗"
    },
    {
        "nombre": "Papipollo 2 presas",
        "descripcion": "Papas, ensalada fría con vinagreta, 2 presas de pollo frito, mayonesa y salsa de tomate.",
        "categoria": "Papipollo",
        "precio": 3.00,
        "stock": 10,
        "icono": "🍗🍗"
    },
    {
        "nombre": "Hamburguesa completa",
        "descripcion": "Hamburguesa acompañada de papas fritas y salsas.",
        "categoria": "Hamburguesa",
        "precio": 2.50,
        "stock": 10,
        "icono": "🍔"
    },
    {
        "nombre": "Hamburguesa Bestia",
        "descripcion": "Hamburguesa, papas fritas, salsas y 1 presa de pollo frito.",
        "categoria": "Hamburguesa",
        "precio": 3.50,
        "stock": 10,
        "icono": "🍔🍗"
    },
    {
        "nombre": "Cola personal",
        "descripcion": "Bebida gaseosa personal para acompañar el pedido.",
        "categoria": "Bebida",
        "precio": 0.50,
        "stock": 20,
        "icono": "🥤"
    },
    {
        "nombre": "Presa adicional",
        "descripcion": "Una presa adicional de pollo frito.",
        "categoria": "Adicional",
        "precio": 1.00,
        "stock": 15,
        "icono": "🍗"
    }
]


promocion = {
    "titulo": "Arma tu pedido",
    "descripcion": "Combina tus productos favoritos y disfruta el sabor de Papi Pollos.",
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


@app.route(
    "/productos/nuevo",
    methods=["GET", "POST"]
)
def nuevo_producto():

    form = ProductoForm()

    if form.validate_on_submit():

        nuevo = {
            "nombre": form.nombre.data,
            "descripcion": form.descripcion.data,
            "categoria": form.categoria.data,
            "precio": float(form.precio.data),
            "stock": form.stock.data,
            "icono": "🍽️"
        }

        productos.append(nuevo)

        flash(
            "Producto registrado correctamente.",
            "success"
        )

        return redirect(
            url_for("ver_productos")
        )

    return render_template(
        "formulario_producto.html",
        negocio=negocio,
        form=form
    )


if __name__ == "__main__":
    app.run(debug=True)