from app.core.repositories.base_repository import BaseRepository

from app.modules.identity.models.trust import TrustScore


class TrustRepository(BaseRepository):

    def __init__(self):
        super().__init__(TrustScore)

    def get_current_score(self, user_id):
        return (
            TrustScore.query
            .filter_by(user_id=user_id)
            .first()
        )

    def get_by_user_id(self, user_id):
        return (
            TrustScore.query
            .filter_by(user_id=user_id)
            .first()
        )

    def update_score(self, user_id, score):
        trust_score = self.get_current_score(user_id)

        if trust_score is None:
            return None

        trust_score.score = score

        self.session.commit()

        return trust_score