from werkzeug.security import generate_password_hash


class Security():
    
    @staticmethod
    def hash_password(password):
        return generate_password_hash(password)