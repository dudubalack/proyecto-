import os
from flask import Flask, request, jsonify, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from api.utils import APIException, generate_sitemap

# Cargar variables de entorno
load_dotenv()

# Configuración de la aplicación Flask
app = Flask(__name__)
app.url_map.strict_slashes = False
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY", "super-secret")
jwt = JWTManager(app)

# Configuración de la base de datos
db_url = os.getenv("DATABASE_URL")
if db_url:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar base de datos y Flask-Migrate
db.init_app(app)
migrate = Migrate(app, db)

# Permitir solicitudes CORS
CORS(app)

# Configurar admin y comandos
setup_admin(app)
setup_commands(app)

# Registrar blueprint
app.register_blueprint(api, url_prefix='/api')

# Manejar errores
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# Ruta principal
@app.route('/')
def sitemap():
    if os.getenv("FLASK_ENV") == "development":
        return generate_sitemap(app)
    static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
    return send_from_directory(static_file_dir, 'index.html')

# Servir archivos estáticos
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0
    return response

# Ejecutar la aplicación
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
