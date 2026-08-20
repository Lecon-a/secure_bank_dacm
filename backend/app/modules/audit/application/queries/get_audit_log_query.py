from dataclasses import dataclass
from uuid import UUID


@dataclass
class GetAuditLogQuery:
    audit_log_id: UUID
