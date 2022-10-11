from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(250))
    last_name = db.Column(db.String(250))
    rol_id = db.Column(db.Integer,db.ForeignKey('rol.id'))
    profesional_de_la_salud = db.relationship("Profesional_de_la_salud",backref='user')
    posts = db.relationship("Post",backref='user')

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "last_name": self.last_name,
            "rol_id": self.rol_id,
            "profesional_de_salud": self.profesional_de_la_salud,
            "posts": list(map(lambda post: post.serialize(), self.posts)),
            # do not serialize the password, its a security breach
        }
class Rol (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    rol = db.Column(db.String(80),unique=True,nullable=False)
    user = db.relationship('User',backref='rol')

    def __repr__(self):
        return f'<Rol {self.rol}>'


    def serialize(self):
        return{
           "id": self.id,
           "rol": self.rol, 
        }
     


class Profesional_de_la_salud (db.Model):
    # Here we define columns for the table address.
    # Notice that each column is also a normal Python instance attribute.
    id = db.Column(db.Integer, primary_key=True)
    grado = db.Column(db.String(250),nullable=False)
    especialidad = db.Column(db.String(250), nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))

    def __repr__(self):
        return f'<Profesional_de_la_salud {self.especialidad}>'


    def serialize(self):
        return{
           "id": self.id,
           "grado": self.grado, 
           "especialidad": self.especialidad,
           "user_id": self.user_id,
        }




class Post (db.Model):
    # Here we define columns for the table address.
    # Notice that each column is also a normal Python instance attribute.
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    fecha = db.Column(db.DateTime(timezone=True))
    text = db.Column(db.String(300),nullable=False)
    title = db.Column(db.String(150),nullable=False)


    def __repr__(self):
        return f'<Post {self.id}>'


    def serialize(self):
        return{
           "id": self.id,
           "user_id": self.user_id,
           "text": self.text,
           "title": self.title,

        }
      
class Comment (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
    post_id = db.Column(db.Integer,db.ForeignKey('post.id'))
    user = db.relationship('User', backref='comment')
    post = db.relationship('Post', backref='comment')
    creado = db.Column(db.DateTime(timezone=True))
    txt = db.Column(db.String(300),nullable=False)

    def __repr__(self):
        return f'<Post {self.id}>'


    def serialize(self):
        return{
           "id": self.id,
           "user_id": self.user_id,
           "creado": self.creado,
           "txt": self.txt,

        }
        