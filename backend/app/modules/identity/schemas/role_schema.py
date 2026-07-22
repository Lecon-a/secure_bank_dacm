from marshmallow import Schema, fields, validate


class CreateRoleSchema(Schema):
    role_name = fields.String(
        required=True,
        validate=validate.Length(min=3, max=100),
    )

    role_code = fields.String(
        required=True,
        validate=validate.Length(min=2, max=50),
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
        validate=validate.Length(min=3, max=100),
    )

    description = fields.String(
        required=False,
        allow_none=True,
    )

    is_active = fields.Boolean(
        required=False,
        load_default=True,
    )