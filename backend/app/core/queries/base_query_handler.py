class BaseQueryHandler:
    """
    Base class for all query handlers.
    """

    repository = None

    def __init__(self, repository):
        self.repository = repository