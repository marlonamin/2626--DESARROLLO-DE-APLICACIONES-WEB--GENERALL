from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, IntegerField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length, NumberRange


class ProductoForm(FlaskForm):

    nombre = StringField(
        "Nombre del producto",
        validators=[
            DataRequired(message="El nombre del producto es obligatorio."),
            Length(
                min=3,
                max=50,
                message="El nombre debe tener entre 3 y 50 caracteres."
            )
        ]
    )

    descripcion = StringField(
        "Descripción",
        validators=[
            DataRequired(message="La descripción es obligatoria."),
            Length(
                min=5,
                max=150,
                message="La descripción debe tener entre 5 y 150 caracteres."
            )
        ]
    )

    categoria = SelectField(
        "Categoría",
        choices=[
            ("", "Seleccione una categoría"),
            ("Papipollo", "Papipollo"),
            ("Hamburguesa", "Hamburguesa"),
            ("Bebida", "Bebida"),
            ("Adicional", "Adicional")
        ],
        validators=[
            DataRequired(message="Debe seleccionar una categoría.")
        ]
    )

    precio = DecimalField(
        "Precio",
        places=2,
        validators=[
            DataRequired(message="El precio es obligatorio."),
            NumberRange(
                min=0.50,
                max=50,
                message="El precio debe estar entre $0,50 y $50."
            )
        ]
    )

    stock = IntegerField(
        "Stock",
        validators=[
            DataRequired(message="El stock es obligatorio."),
            NumberRange(
                min=0,
                max=100,
                message="El stock debe estar entre 0 y 100."
            )
        ]
    )

    submit = SubmitField("Registrar producto")