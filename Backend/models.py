import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuarios(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(128), nullable=False)
    fecha_de_creacion = db.Column(db.DateTime, default=datetime.datetime.now)
    nombre = db.Column(db.String(31), nullable=False)
    correo = db.Column(db.String(63), unique=True)

class Juegos(db.Model):
    __tablename__ = 'juegos_en_stock'
    id = db.Column(db.Integer, primary_key=True)
    fecha_de_adicion = db.Column(db.DateTime, default=datetime.datetime.now)
    nombre_de_juego = db.Column(db.String(63), nullable=False)
    precio = db.Column(db.Integer)
    descripcion = db.Column(db.String(255))
    categoria = db.Column(db.String(15))
    imagen = db.Column(db.String(255))

class JuegosUsuarios(db.Model):
    __tablename__ = 'juegos_de_usuarios'
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    id_juego = db.Column(db.Integer, db.ForeignKey('juegos_en_stock.id'))
    fecha_de_compra = db.Column(db.DateTime, default=datetime.datetime.now)

Usuarios.juegos = db.relationship('JuegosUsuarios', backref='usuario', lazy=True)
Juegos.usuarios = db.relationship('JuegosUsuarios', backref='juego', lazy=True)
