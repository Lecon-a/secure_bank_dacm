from marshmallow import Schema, fields, validate


class UserCreateSchema(Schema):

    employee_id = fields.String(
        required=True
    )

    first_name = fields.String(
        required=True
    )

    last_name = fields.String(
        required=True
    )   

    email = fields.Email(
        required = True
    )

    password = fields.String(
        required = True,
        validate = validate.Length(min=8)
    )

    phone_number = fields.String(required=False)

class UserResponseSchema(Schema):
    id = fields.UUID()
    employee_id = fields.String()
    first_name = fields.String()
    last_name = fields.String()
    email = fields.String()
    phone_number = fields.String()
    account_status = fields.String()
    created_at = fields.String()
    update_at = fields.String()

