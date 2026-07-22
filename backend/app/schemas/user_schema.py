from marshmallow import Schema, fields, validate


class UserSchema(Schema):

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

    phone_number = fields.String()

