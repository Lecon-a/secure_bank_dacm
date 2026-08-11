from app.extensions import db


class BaseRepository:
    def __init__(self, model_class):
        self.model_class = model_class

    def create(self, instance):
        db.session.add(instance)
        db.session.commit()
        return instance

    def update(self):
        db.session.commit()

    def delete(self, instance):
        db.session.delete(instance)
        db.session.commit()

    def get_by_id(self, item_id):
        return self.model_class.query.get(item_id)

    def get_all(self):
        return self.model_class.query.all()

    def get_active_roles(self):
        return self.model_class.query.filter_by(is_active=True).all()
