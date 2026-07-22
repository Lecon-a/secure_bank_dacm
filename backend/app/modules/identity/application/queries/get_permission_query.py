from dataclasses import dataclass
from uuid import UUID


@dataclass
class GetPermissionQuery:
    permission_id: UUID