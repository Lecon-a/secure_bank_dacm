class ApplicationException(Exception):

    status_code = 400

    def __init__(self, message):
        self.message = message
        super().__init__(message)