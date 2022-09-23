  
import os
from flask_admin import Admin
from .models import db, User, Profesional_de_la_salud, Rol, Post, Grupo_de_apoio
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Rol, db.session))
    admin.add_view(ModelView(Profesional_de_la_salud, db.session))
    admin.add_view(ModelView(Grupo_de_apoio, db.session))
    admin.add_view(ModelView(Post, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))