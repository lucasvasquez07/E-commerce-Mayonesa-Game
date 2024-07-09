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
        juegos = Juego.query.filter(Juego.category==categoria).all()
        juegos_data = []
        if juegos:
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
            return jsonify({"juego": juego_data})
        else:
            return jsonify({"message": "No se encontraron juegos"}), 204
    except Exception as error:
        print("Error", error)
        return jsonify({"message": "Internal server error"}), 404

@app.route("/juegos/search", methods=["GET"])
def get_game_by_name():
    try:
        data=request.json
        nombre_recibido = data.get("name")
        juegos = Juego.query.all()
        juegos_data = []
        for juego in juegos:
            if similitud_nombre(juego.name, nombre_recibido):
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
    
def similitud_nombre(nombre_de_juego, nombre_recibido):
    i = 0
    similar = True
    while len(nombre_recibido) < len(nombre_de_juego) and i < len(nombre_recibido) and similar:
        if nombre_de_juego[i] != nombre_recibido[i]:
            similar = False
        i+=1
    return similar

@app.route("/usuario/log_in", methods=["GET"])
def get_user_by_log_in():
    try:
        data = request.json

        name = data.get('name')
        password = data.get('password')

        if "@" in name:
            usuario = Usuario.query.filter(Usuario.mail == name, Usuario.password == password).first()
        else:
            usuario = Usuario.query.filter(Usuario.name == name, Usuario.password == password).first()

        if usuario:
            usuario_data = {
                "id": usuario.id,
                "fecha_de_creacion": usuario.date,
                "nombre": usuario.name,
                "correo": usuario.mail
            }
        else:
            return jsonify({"message": "ERROR. Alguno de los datos ingresados es incorrecto"})

        return jsonify({"Usuario": usuario_data})
    except:
        return jsonify({"message": "ERROR. Alguno de los datos ingresados es incorrecto."})


@app.route("/usuarios/id/<id_usuario>", methods=["GET"])
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

@app.route("/sign_in", methods=["POST"])
def post_user_sign_in():
    try:
        data = request.json

        name = data.get('name')
        password = data.get('password')
        mail = data.get('mail')

        if "@" not in mail:
            return jsonify({"ERROR": "El mail no es valido"})
        
        if "@" in name:
            return jsonify({"ERROR": "El nombre no puede contener un @"})
        
        nuevo_usuario = Usuario(name=name, password=password, mail=mail)

        db.session.add(nuevo_usuario)
        db.session.commit()

        return jsonify({"id": nuevo_usuario.id,"name" : nuevo_usuario.name,"correo" : nuevo_usuario.mail, "fecha de creacion": nuevo_usuario.date })
    except:
        return jsonify({"message": "ERROR. No se pudo guardar el usuario "})
    
@app.route("/data_user/<int:id_usuario>", methods=["PUT"]) #Actualizo el nombre de usuario
def put_user_update(id_usuario):
    try:
        usuario_actualizar = Usuario.query.get(id_usuario)
        if(usuario_actualizar):
            nuevo_nombre_usuario = request.json.get("nuevo_nombre")
            if(nuevo_nombre_usuario):
                usuario_actualizar.name = nuevo_nombre_usuario
                db.session.commit()
                return jsonify({"message": "Nombre de Usuario actualizado correctamente"}), 200
            else:
                return jsonify({"message": "Datos incompletos: se necesita 'nuevo_nombre' en el cuerpo de la solicitud"}), 400
        else:
            return jsonify({"message": "Usuario no encontrado"}), 404
    except Exception as error:
        print("Error", error)
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

@app.route("/game_buy", methods=["POST"]) #Defino la ruta y es un metodo POST para crear una compra.
def post_game_buy():
    try:
        usuario_compra = request.form.get("user-buy")
        id_juego = request.form.get("game-id")
        existe_compra = JuegoUsuario.query.filter(JuegoUsuario.id_game == id_juego, JuegoUsuario.id_user == usuario_compra).first()
        if(not existe_compra):
            nuevo_juego = JuegoUsuario(id_game=id_juego, id_user=usuario_compra)
            db.session.add(nuevo_juego)
            db.session.commit()
            return jsonify({"message": "Compra realizada exitosamente"}), 200
        else:
            return jsonify({"message": "Ya hay una compra registrada con este juego"}), 409
    except Exception as error:
        print("Error", error)
        return jsonify({"message": "Internal server error"}), 500

@app.route("/data_user/user_games", methods=["GET"]) #Defino la ruta y es un meotodo POST para obtener los juegos comprados del usuario.
def get_games_by_id_user():
    try:
        usuario_id = request.args.get("user_id")
        juegos_comprados = JuegoUsuario.query.filter_by(id_user=usuario_id).all() #Juegos comprados por el usuario
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
        return jsonify({"Juegos comprados": lista_juegos}) , 200  

    except Exception as error:
        print("Error", error)
        return jsonify({"message": "Internal server error"}), 500

if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)