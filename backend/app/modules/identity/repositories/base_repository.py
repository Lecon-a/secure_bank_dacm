from app.extensions import db


class BaseRepository:
    """
    Base repository providing common database operations.
    """

    model = None

    def __init__(self):
        if self.model is None:
            raise ValueError("Model must be defined.")

    def create(self, entity):
        db.session.add(entity)
        db.session.commit()
        return entity

    def update(self):
        db.session.commit()

    def delete(self, entity):
        db.session.delete(entity)
        db.session.commit()

    def get_by_id(self, entity_id):
        return self.model.query.get(entity_id)

    def get_all(self):
        return self.model.query.all()

    def count(self):
        return self.model.query.count()

    def exists(self, **filters):
        return self.model.query.filter_by(**filters).first() is not None

    def commit(self):
        db.session.commit()

    def rollback(self):
        db.session.rollback()

    def filter_by(self, **kwargs):
        return self.model.query.filter_by(**kwargs).all()