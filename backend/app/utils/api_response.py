from flask import jsonify

class ApiResponse:
    """
    The standard API response helper.

    Provides a consistent JSON response across the application.
    """

    @staticmethod
    def success(message="Success", data=None, status_code=200, meta=None):
        return jsonify({
            "success": True,
            "message": message,
            "data": data,
            "meta": meta
        }), status_code

    
    @staticmethod
    def error(message="An error occurred.", status_code=400, errors=None):
        return jsonify({
            "success": False,
            "message": message,
            "errors": errors
        }), status_code
