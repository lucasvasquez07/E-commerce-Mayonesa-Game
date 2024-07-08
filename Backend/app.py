#  END POINTS
# #endpoint games
# -get_all_games *
# -get_by_categoria*
# -get_by_id_game *
# -get_game_by_name 

# #endpoint user
# -get_user_by_login
# -get_user_by_id*
# -post_user_sing_in
# -put_user_update
# -del_user

# #endpoint games_buys
# -post_game_buy
# -get_games_by_id_user


from flask import Flask, request, jsonify
from models import db, Usuario, Juego, JuegoUsuario

app = Flask(__name__)
port = 5000
app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql+psycopg2://postgre:postgre@localhost:5432/mayonesa'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS']=False
db.init_app(app)

@app.route('/')
def hello_world():
    return 'Bienvenido a el backend de la pagina de MAYONESA'


@app.route("/juegos", methods=["GET"])
def get_all_games():
    try:
        juegos = Juego.query.all()
        juegos_data = []
        for juego in juegos:
            juego_data = {
                "id": juego.id,
                "fecha_de_adicion": juego.date,
                "nombre": juego.name,
                "precio": juego.price,
                "descripcion": juego.description,
                "categoria": juego.category,
                "imagen": juego.image
            }
            juegos_data.append(juego_data)
        return jsonify({"juegos": juegos_data})
    except Exception as error:
        print("Error", error)
        return jsonify({"message": "Internal server error"}), 500

@app.route("/juego/<id_juego>", methods=["GET"])
def get_by_id_game(id_juego):
    try:
        juego = Juego.query.get(int(id_juego))
        if juego:
            juego_data = {
                "id": juego.id,
                "fecha_de_adicion": juego.date,
                "nombre": juego.name,
                "precio": juego.price,
                "descripcion": juego.description,
                "categoria": juego.category,
                "imagen": juego.image
            }
            return jsonify({"juego": juego_data})
        else:
            return jsonify({"message": "Juego no encontrado"}), 204
    except Exception as error:
        print("Error", error)
        return jsonify({"message": "Internal server error"}), 404
    
@app.route("/juegos/<categoria>", methods=["GET"])
def get_by_categoria(categoria):
    try:
        juegos = Juego.query.filter(Juego.category==categoria).all()
        juegos_data = []
        for juego in juegos:
            juego_data = {
                "id": juego.id,
                "fecha_de_adición": juego.date,
                "nombre": juego.name,
                "precio": juego.price,
                "descripcion": juego.description,
                "categoria": juego.category,
                "imagen": juego.image
            }
            juegos_data.append(juego_data)
        return jsonify({"juegos": juegos_data})
    except Exception as error:
        print("Error", error)
        return jsonify({"message": "Internal server error"}), 404


@app.route("/juegos/search", methods=["GET"])
def get_game_by_name(nombre_recibido):
    try:
        juegos = Juego.query.all()
        juegos_data = []
        for juego in juegos:
            if similitud_nombre(juego.nombre_de_juego, nombre_recibido):
                juego_data = {
                    "id": juego.id,
                    "fecha_de_adicion": juego.date,
                    "nombre": juego.name,
                    "precio": juego.price,
                    "descripcion": juego.description,
                    "categoria": juego.category,
                    "imagen": juego.image
                }
                juegos_data.append(juego_data)
        return jsonify({"juegos": juegos_data})
    except Exception as error:
        print("Error", error)
        return jsonify({"message": "Internal server error"}), 500


@app.route("/usuarios/<id_usuario>", methods=["GET"])
def get_user_by_id(id_usuario):
    try:
        usuario = Usuario.query.get(int(id_usuario))
        if usuario:
            usuario_data = {
                "id": usuario.id,
                "fecha_de_creacion": usuario.date,
                "nombre": usuario.name,
                "password": usuario.password,
                "correo": usuario.mail
            }
            return jsonify({"usuario": usuario_data})
        else:
            return jsonify({"message": "Usuario no encontrado"}), 204
    except Exception as error:
        print("Error", error)
        return jsonify({"message": "Internal server error"}), 404


def similitud_nombre(nombre_de_juego, nombre_recibido):
    i = 0
    similar = True
    while len(nombre_recibido) < len(nombre_de_juego) and i < len(nombre_recibido) and similar:
        if nombre_de_juego[i] != nombre_recibido[i]:
            similar = False
        i+=1
    return similar

if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)