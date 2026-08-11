from marshmallow import Schema, fields, validate


class CreatePermissionSchema(Schema):

    permission_name = fields.String(
        required=True,
        validate=validate.Length(min=3, max=100)
    )

    permission_code = fields.String(
        required=True,
        validate=validate.Length(min=2, max=100)
    )

    resource = fields.String(
        required=True,
        validate=validate.Length(min=2, max=100)
    )

    action = fields.String(
        required=True,
        validate=validate.Length(min=2, max=50)
    )

    description = fields.String(
        required=False,
        allow_none=True
    )


class UpdatePermissionSchema(Schema):

    permission_name = fields.String(
        required=True,
        validate=validate.Length(min=3, max=100)
    )

    resource = fields.String(
        required=True
    )

    action = fields.String(
        required=True
    )

    description = fields.String(
        required=False,
        allow_none=True
    )

    is_active = fields.Boolean(
        load_default=True
    )