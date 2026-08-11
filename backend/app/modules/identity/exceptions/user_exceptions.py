class UserAlreadyExistsException(Exception):
    """Exception raised when a user already exists in the system."""
    pass

class ValidationException(Exception):
    """Exception raised for validation errors."""
    pass

class AuthenticationException(Exception):
    """Exception raised for authentication failures."""
    pass    

class AuthorizationException(Exception):
    """Exception raised for authorization failures."""
    pass    

class UserNotFoundException(Exception): 
    """Exception raised when a requested user is not found."""
    pass

class ConflictException(Exception): 
    """Exception raised when a conflict is detected."""
    pass

class DatabaseException(Exception): 
    """Exception raised for database-related errors."""
    pass