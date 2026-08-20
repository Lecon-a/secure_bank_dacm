from marshmallow import Schema, fields, validate


class CreateRoleSchema(Schema):

    role_name = fields.String(
        required=True,
        validate=validate.Length(
            min=3,
            max=100,
        ),
    )

    role_code = fields.String(
        required=True,
        validate=validate.Length(
            min=2,
            max=50,
        ),
    )

    description = fields.String(
        required=False,
        allow_none=True,
    )

    is_system = fields.Boolean(
        required=False,
        load_default=False,
    )


class UpdateRoleSchema(Schema):

    role_name = fields.String(
        required=True,
        validate=validate.Length(
            min=3,
            max=100,
        ),
    )

    description = fields.String(
        required=False,
        allow_none=True,
    )

    is_active = fields.Boolean(
        required=False,
        load_default=True,
    )


class RoleResponseSchema(Schema):

    id = fields.UUID()

    role_name = fields.String()

    role_code = fields.String()

    description = fields.String(
        allow_none=True,
    )

    is_system = fields.Boolean()

    is_active = fields.Boolean()

    created_by = fields.UUID(
        allow_none=True,
    )

    updated_by = fields.UUID(
        allow_none=True,
    )

    created_at = fields.DateTime(
        allow_none=True,
    )

    updated_at = fields.DateTime(
        allow_none=True,
    )