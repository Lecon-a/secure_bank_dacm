class BaseCommandHandler:
    """
    Base class for all command handlers.
    """

    repository = None

    def __init__(self, repository):
        self.repository = repository