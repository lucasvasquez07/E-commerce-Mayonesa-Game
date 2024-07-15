#  END POINTS
# #endpoint games
# -get_all_games *
# -get_by_categoria*
# -get_by_id_game *
# -get_game_by_name*

# #endpoint user
# -get_user_by_login*
# -get_user_by_id*
# -post_user_sign_in*
# -put_user_update*
# -del_user*

# #endpoint games_buys
# -post_game_buy*
# -get_games_by_id_user*


from flask import Flask, request, jsonify
from models import db, Usuario, Juego, JuegoUsuario
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
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

@app.route("/juegos/id/<id_juego>", methods=["GET"])
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
    
@app.route("/juegos/categoria/<categoria>", methods=["GET"])
def get_by_categoria(categoria):
    try:
        juegos = Juego.query.all()
        juegos_data = []
        if juegos:
            for juego in juegos:
                if categoria in juego.category:
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
            return jsonify({"juego": juegos_data})
        else:
            return jsonify({"message": "No se encontraron juegos"}), 204
    except Exception as error:
        print("Error", error)
        return jsonify({"message": "Internal server error"}), 404


@app.route("/juegos/search", methods=["POST"])
def get_game_by_name():
    try:
        data=request.json
        nombre_recibido = data.get("name")
        juegos = Juego.query.all()
        juegos_data = []
        for juego in juegos:
            if nombre_recibido.lower() in juego.name.lower():
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

@app.route("/usuario/log_in", methods=["POST"])
def get_user_by_log_in():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({"message": "Faltan datos obligatorios."}), 400

        usuario = Usuario.query.filter((Usuario.mail == email) | (Usuario.name == email), Usuario.password == password).first()

        if usuario:
            usuario_data = {
                "id": usuario.id,
                "fecha_de_creacion": usuario.date,
                "nombre": usuario.name,
                "email": usuario.mail
            }
            return jsonify({"usuario": usuario_data}), 200
        else:
            return jsonify({"message": "Alguno de los datos ingresados es incorrecto"}), 401

    except Exception as error:
        print("Error:", error)
        return jsonify({"message": "No se pudo procesar la solicitud."}), 500


@app.route("/usuarios/id/<int:id_usuario>", methods=["GET"])
def get_user_by_id(id_usuario):
    try:
        usuario = Usuario.query.get(id_usuario)
        if usuario:
            usuario_data = {
                "id": usuario.id,
                "fecha_de_creacion": usuario.date,
                "nombre": usuario.name,
                "email": usuario.mail
            }
            return jsonify({"usuario": usuario_data}), 200
        else:
            return jsonify({"message": "Usuario no encontrado"}), 404
    except Exception as error:
        print("Error:", error)
        return jsonify({"message": "Internal server error"}), 500

@app.route("/sign_in", methods=["POST"])
def post_user_sign_in():
    try:
        data = request.json
        name = data.get('name')
        password = data.get('password')
        email = data.get('email')

        # Validaciones básicas
        if not name or not password or not email:
            return jsonify({"message": "Faltan datos obligatorios."}), 400

        if "@" not in email:
            return jsonify({"message": "El correo no es válido."}), 400

        if "@" in name:
            return jsonify({"message": "El nombre no puede contener un @."}), 400

        # Verifica si el nombre de usuario ya existe
        usuario_nombre = Usuario.query.filter(Usuario.name == name).first()
        if usuario_nombre:
            return jsonify({"message": "El nombre del usuario ya existe."}), 409

        # Verifica si el correo ya está vinculado a otra cuenta
        usuario_correo = Usuario.query.filter(Usuario.mail == email).first()
        if usuario_correo:
            return jsonify({"message": "El correo ya está vinculado a otra cuenta."}), 409

        # Crea el nuevo usuario
        nuevo_usuario = Usuario(name=name, password=password, mail=email)
        db.session.add(nuevo_usuario)
        db.session.commit()

        return jsonify({
            "id": nuevo_usuario.id,
            "nombre": nuevo_usuario.name,
            "email": nuevo_usuario.mail,
            "fecha_de_creacion": nuevo_usuario.date
        }), 201

    except Exception as error:
        print("Error:", error)
        return jsonify({"message": "No se pudo guardar el usuario."}), 500


def email_valido(nuevo_email):
    if "@" not in nuevo_email:
        return {"ERROR": "El email no es válido"}
    return None
def email_unico(email, id_usuario):
    existe_email = Usuario.query.filter(Usuario.mail == email, Usuario.id != id_usuario).first()
    if existe_email:
        return {"ERROR": "El email ya está en uso"}
    return None 
def validar_contraseña(contraseña):
    if len(contraseña) < 8 or len(contraseña) > 15:
        return {"ERROR": "La contraseña debe ser entre 8 y 15 caracteres"}
    return None

@app.route("/data_user/<int:id_usuario>", methods=["PUT"])  # Actualizo el nombre de usuario, email, y contraseña
def put_user_update(id_usuario):
    try:
        usuario_actualizar = id_usuario
        if not usuario_actualizar:
            return jsonify({"message": "Usuario no encontrado"}), 404
        nuevo_nombre_usuario = request.json.get("nuevo_nombre")
        nuevo_email = request.json.get("nuevo_email")
        nueva_contraseña = request.json.get("nueva_contraseña")
        if nuevo_nombre_usuario:
            usuario_existente = Usuario.query.filter(Usuario.name == nuevo_nombre_usuario, Usuario.id != id_usuario).first()
            if usuario_existente:
                return jsonify({"message": "Nombre de usuario ya en uso"}), 400
            usuario_actualizar.name = nuevo_nombre_usuario
        if nuevo_email:
            error_email = email_valido(nuevo_email)
            if error_email:
                return jsonify(error_email), 400
            
            error_email_unico = email_unico(nuevo_email, id_usuario)
            if error_email_unico:
                return jsonify(error_email_unico), 400
            usuario_actualizar.mail = nuevo_email
        if nueva_contraseña:
            error_contraseña = validar_contraseña(nueva_contraseña)
            if error_contraseña:
                return jsonify(error_contraseña), 400
            usuario_actualizar.password = nueva_contraseña
        db.session.commit()
        return jsonify({"message": "Usuario actualizado correctamente"}), 200
    except Exception as error:
        print("Error:", error)
        return jsonify({"message": "Internal server error"}), 500
    
@app.route("/data_user/<int:id_usuario>", methods=["DELETE"])
def del_user(id_usuario):
    try:
        usuario_eliminar = Usuario.query.get(id_usuario)
        if usuario_eliminar:
            db.session.delete(usuario_eliminar)
            db.session.commit()
            return jsonify({"message": "Usuario eliminado correctamente"}), 200
        else:
            return jsonify({"message": "Usuario no encontrado"}), 404

    except Exception as error:
        print("Error", error)
        return jsonify({"message": "Internal server error"}), 500

@app.route("/game_buy", methods=["POST"])  # Defino la ruta y es un metodo POST para crear una compra.
def post_game_buy():
    try:
        data = request.json  
        usuario_compra = data.get("user-buy")
        id_juego = data.get("game-id")
        existe_compra = JuegoUsuario.query.filter(JuegoUsuario.id_game == id_juego, JuegoUsuario.id_user == usuario_compra).first()
        if not existe_compra:
            nuevo_juego = JuegoUsuario(id_game=id_juego, id_user=usuario_compra)
            db.session.add(nuevo_juego)
            db.session.commit()
            return jsonify({"message": "Compra realizada exitosamente"}), 200
        else:
            return jsonify({"message": "Ya hay una compra registrada con este juego"}), 409
    except Exception as error:
        print("Error", error)
        return jsonify({"message": "Internal server error"}), 500

@app.route("/data_user/user_games/<int:id_usuario>", methods=["GET"]) #Defino la ruta y es un meotodo POST para obtener los juegos comprados del usuario.
def get_games_by_id_user(id_usuario):
    try:
        juegos_comprados = JuegoUsuario.query.filter_by(id_user=id_usuario).all() #Juegos comprados por el usuario
        lista_juegos = []
        for juego_comprado in juegos_comprados:
            juego = Juego.query.filter_by(id=juego_comprado.id_game).first()
            if juego:
                juegos_diccionario = {
                    "id": juego.id,
                    "fecha_de_adicion": juego.date,
                    "nombre": juego.name,
                    "precio": juego.price,
                    "descripcion": juego.description,
                    "categoria": juego.category,
                    "imagen": juego.image
                }
                lista_juegos.append(juegos_diccionario)                
        return jsonify({"juegos_comprados": lista_juegos}) , 200  

    except Exception as error:
        print("Error", error)
        return jsonify({"message": "Internal server error"}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)