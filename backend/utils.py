from exceptions           import (
    PasswordError
)

def validate_password(password):
    validators = [
            lambda x: any(password in ['!','@','#','$','%','&','*'] for password in x),
            lambda x: any(password.isupper() for password in x),
            lambda x: any(password.islower() for password in x),
            lambda x: any(password.isdigit() for password in x),
            lambda x: 20> len(password) >= 8,
            ]

    for index, validator in enumerate(validators):
        if not validator(password):
            if index == 0:
                raise PasswordError('S101')
            elif index == 1:
                raise PasswordError('S102')
            elif index == 2:
                raise PasswordError('S103')
            elif index == 3:
                raise PasswordError('S104')
            elif index == 4:
                raise PasswordError('S105')
    return False
