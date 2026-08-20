from flask import Blueprint
from flask_jwt_extended import jwt_required

from app.utils.api_response import ApiResponse

from app.modules.dashboard.services.dashboard_service import (
    DashboardService,
)


dashboard_bp = Blueprint(
    "dashboard",
    __name__,
    url_prefix="/api/v1/dashboard",
)


@dashboard_bp.get("/summary")
@jwt_required()
def dashboard_summary():

    summary = DashboardService.get_summary()

    return ApiResponse.success(
        message="Dashboard summary retrieved successfully.",
        data=summary,
    )