from flask import Flask, request, jsonify, Blueprint
from api.models import db, User, Rol, Post
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime
from sqlalchemy import desc
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Esto habilita CORS para todas las rutas de tu aplicación Flask

api = Blueprint('api', __name__)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

@api.route('/register', methods=['POST'])
def register():
    body_email = request.json.get('email')
    body_name = request.json.get('first_name')
    body_last_name = request.json.get('last_name')
    body_rol_id = request.json.get('rol_id')
    body_password = request.json.get('password')

    if not body_email or not body_name or not body_last_name or not body_rol_id or not body_password:
        return jsonify({'message': 'Falta información'}), 400

    if User.query.filter_by(email=body_email).first():
        return jsonify({'message': 'Este usuario ya existe'}), 400

    # Verificar si el rol existe
    rol = Rol.query.get(body_rol_id)
    if not rol:
        return jsonify({'message': 'Rol inválido'}), 400

    user = User(
        email=body_email,
        name=body_name,
        last_name=body_last_name,
        rol_id=body_rol_id,
        password=body_password
    )
    db.session.add(user)
    db.session.commit()
    return jsonify({'user': user.serialize(), 'message': 'Usuario creado'}), 200

@api.route('/rol', methods=['GET'])
def rol():
    rol = Rol.query.all()
    rol_all = list(map(lambda rol: rol.serialize(), rol))
    return jsonify({"rol": rol_all})

@api.route('/login', methods=['POST'])
def login():
    body_email = request.json.get('email')
    body_password = request.json.get('password')
    if body_email and body_password:
        user = User.query.filter_by(email=body_email, password=body_password).first()
        if user:
            access_token = create_access_token(identity=user.id)
            return jsonify({"token": access_token, "user": user.serialize()}), 200
        else:
            return jsonify({'message': 'Datos incorrectos'}), 400
    else:
        return jsonify({'message': 'Falta información'}), 400

@api.route('/crear-post', methods=['POST'])
@jwt_required()
def crear_post():
    user = get_jwt_identity()
    titulo = request.json.get('title')
    contenido = request.json.get('text')
    dia = datetime.now().strftime('%Y-%m-%d')
    if titulo and contenido:
        post = Post(title=titulo, text=contenido, user_id=user, fecha=dia)
        db.session.add(post)
        db.session.commit()
        return jsonify({'message': 'Se creó el post', "post": post.serialize()}), 200
    else:
        return jsonify({'message': 'Falta información'}), 400

@app.route('/post/<int:id>', methods=['PUT'])
def update_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({"msg": "Post not found"}), 404
    
    data = request.get_json()
    post.title = data.get('title', post.title)
    post.content = data.get('content', post.content)
    db.session.commit()
    
    return jsonify(post.serialize()), 200

@app.route('/post/<int:id>', methods=['DELETE'])
def delete_post(id):
    post = Post.query.get(id)
    if not post:
        return jsonify({"msg": "Post not found"}), 404
    
    db.session.delete(post)
    db.session.commit()
    
    return jsonify({"msg": "Post deleted"}), 200

@api.route('/posts', methods=['GET'])
def listado():
    posts = Post.query.all()
    data = [post.serialize() for post in posts]
    return jsonify(data), 200

@api.route('/post-privado', methods=['GET'])
@jwt_required()
def listado_privado():
    user = get_jwt_identity()
    
    posts = Post.query.all()
    data = [post.serialize() for post in posts]
    return jsonify(data), 200

@api.route('/post/<id>', methods=['GET'])
def detalle_de_post(id):
    post = Post.query.get(id)
    return jsonify(post.serialize()), 200

@api.route('/ultimos-posts', methods=['GET'])
def ultimos_posts():
    posts = Post.query.order_by(desc(Post.id)).limit(3).all()
    data = [post.serialize() for post in posts]
    return jsonify(data), 200
