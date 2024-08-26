from api.models import db, Rol
from routes import app

def populate_roles():
    roles = ['Usuario', 'Profesional de la Salud']
    for r in roles:
        if not Rol.query.filter_by(rol=r).first():
            role = Rol(rol=r)
            db.session.add(role)
    db.session.commit()
    print("Roles added!")

if __name__ == '__main__':
    with app.app_context():
        populate_roles()
