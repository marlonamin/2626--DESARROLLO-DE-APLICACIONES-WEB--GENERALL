from flask import Flask, render_template, redirect, url_for, flash
import sqlite3
import os

from forms.producto_form import ProductoForm


app = Flask(__name__)

# Clave utilizada por Flask-WTF para la protección CSRF
app.config["SECRET_KEY"] = "papi-pollos-proyecto-2026"


# -------------------------------------------------
# INFORMACIÓN DEL NEGOCIO
# -------------------------------------------------

negocio = {
    "nombre": "Papi Pollos",
    "slogan": "Comida rápida con sabor ecuatoriano",
    "ciudad": "Quevedo",
    "telefono": "0967995373",
    "correo": "papipollos@gmail.com"
}


promocion = {
    "titulo": "Arma tu pedido",
    "descripcion": "Combina tus productos favoritos y disfruta el sabor de Papi Pollos.",
    "activa": True
}


# -------------------------------------------------
# BASE DE DATOS SQLITE
# -------------------------------------------------

RUTA_DB = os.path.join(
    os.path.dirname(__file__),
    "data",
    "papipollos.db"
)


def conectar_db():
    conn = sqlite3.connect(RUTA_DB)
    conn.row_factory = sqlite3.Row
    return conn


def crear_base_datos():
    conn = conectar_db()

    conn.execute("""
        CREATE TABLE IF NOT EXISTS productos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            descripcion TEXT NOT NULL,
            categoria TEXT NOT NULL,
            precio REAL NOT NULL,
            stock INTEGER NOT NULL,
            icono TEXT
        )
    """)

    conn.commit()
    conn.close()


crear_base_datos()


# -------------------------------------------------
# PRODUCTOS INICIALES
# -------------------------------------------------

def insertar_productos_iniciales():
    conn = conectar_db()

    cantidad = conn.execute(
        "SELECT COUNT(*) FROM productos"
    ).fetchone()[0]

    if cantidad == 0:

        productos_iniciales = [
            (
                "Papipollo 1 presa",
                "Papas, ensalada fría con vinagreta, 1 presa de pollo frito, mayonesa y salsa de tomate.",
                "Papipollo",
                2.00,
                10,
                "🍗"
            ),
            (
                "Papipollo 2 presas",
                "Papas, ensalada fría con vinagreta, 2 presas de pollo frito, mayonesa y salsa de tomate.",
                "Papipollo",
                3.00,
                10,
                "🍗🍗"
            ),
            (
                "Hamburguesa completa",
                "Hamburguesa acompañada de papas fritas y salsas.",
                "Hamburguesa",
                2.50,
                10,
                "🍔"
            ),
            (
                "Hamburguesa Bestia",
                "Hamburguesa, papas fritas, salsas y 1 presa de pollo frito.",
                "Hamburguesa",
                3.50,
                10,
                "🍔🍗"
            ),
            (
                "Cola personal",
                "Bebida gaseosa personal para acompañar el pedido.",
                "Bebida",
                0.50,
                20,
                "🥤"
            ),
            (
                "Presa adicional",
                "Una presa adicional de pollo frito.",
                "Adicional",
                1.00,
                15,
                "🍗"
            )
        ]

        conn.executemany("""
            INSERT INTO productos
            (nombre, descripcion, categoria, precio, stock, icono)
            VALUES (?, ?, ?, ?, ?, ?)
        """, productos_iniciales)

        conn.commit()

    conn.close()


insertar_productos_iniciales()


# -------------------------------------------------
# RUTA DE INICIO
# -------------------------------------------------

@app.route("/")
def inicio():

    conn = conectar_db()

    productos = conn.execute(
        "SELECT * FROM productos"
    ).fetchall()

    conn.close()

    return render_template(
        "index.html",
        negocio=negocio,
        promocion=promocion,
        productos=productos
    )


# -------------------------------------------------
# RUTA DE PRODUCTOS
# -------------------------------------------------

@app.route("/productos")
def ver_productos():

    conn = conectar_db()

    productos = conn.execute(
        "SELECT * FROM productos"
    ).fetchall()

    conn.close()

    return render_template(
        "productos.html",
        negocio=negocio,
        productos=productos
    )


# -------------------------------------------------
# REGISTRAR PRODUCTO
# -------------------------------------------------

@app.route(
    "/productos/nuevo",
    methods=["GET", "POST"]
)
def nuevo_producto():

    form = ProductoForm()

    if form.validate_on_submit():

        conn = conectar_db()

        conn.execute("""
            INSERT INTO productos
            (nombre, descripcion, categoria, precio, stock, icono)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            form.nombre.data,
            form.descripcion.data,
            form.categoria.data,
            float(form.precio.data),
            form.stock.data,
            "🍴"
        ))

        conn.commit()
        conn.close()

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


# -------------------------------------------------
# EJECUTAR APLICACIÓN
# -------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)