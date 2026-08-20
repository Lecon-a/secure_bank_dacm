from dataclasses import dataclass
from uuid import UUID


@dataclass
class ListAuditLogsQuery:
    actor_user_id: UUID | None = None
    decision: str | None = None
    event_type: str | None = None
    resource: str | None = None
    action: str | None = None
    limit: int = 50
