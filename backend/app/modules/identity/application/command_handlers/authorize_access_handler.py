class AuthorizeAccessHandler(BaseCommandHandler):

    def __init__(self):
        self.service = AuthorizationService()

    def handle(self, command):

        return self.service.authorize(command.request)