import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    password = db.Column(db.String(128), nullable=False)
    date = db.Column(db.DateTime, default=datetime.datetime.now)
    name = db.Column(db.String(31), nullable=False)
    mail = db.Column(db.String(63), unique=True)

class Juego(db.Model): 
    __tablename__ = 'juegos_en_stock'
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.datetime.now)
    name = db.Column(db.String(63), nullable=False)
    price = db.Column(db.Integer)
    description = db.Column(db.String(255))
    category = db.Column(db.String(255))
    image = db.Column(db.String(2047))

class JuegoUsuario(db.Model): 
    __tablename__ = 'juegos_de_usuarios'
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('usuarios.id'), nullable=False)
    id_game = db.Column(db.Integer, db.ForeignKey('juegos_en_stock.id'), nullable=False)
    purchase_date = db.Column(db.DateTime, default=datetime.datetime.now)
