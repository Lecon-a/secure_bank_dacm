from app.modules.identity.models.user_attribute import UserAttribute


class UserAttributeRepository:

    def get_by_user_id(self, user_id):

        return (
            UserAttribute.query
            .filter_by(user_id=user_id)
            .first()
        )

    def create(self, user_id, **attributes):

        user_attribute = UserAttribute(
            user_id=user_id,
            **attributes,
        )

        return user_attribute