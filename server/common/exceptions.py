from rest_framework.exceptions import APIException


class CustomAPIException(APIException):
    default_detail = {}

    def __init__(self, *args, **kwargs):
        message = kwargs.pop('message', '')
        self.default_detail['message'] = message
        super().__init__(*args, **kwargs)


class BadRequest(CustomAPIException):
    status_code = 400
    default_code = 'bad_request'
    default_detail = {
        'status': 400,
        'error': 'Bad Request',
        'message': '',
    }


class Conflict(CustomAPIException):
    status_code = 409
    default_code = 'conflict'
    default_detail = {
        'status': 409,
        'error': 'Conflict',
        'message': '',
    }


class Unauthorized(CustomAPIException):
    status_code = 401
    default_code = 'unauthorized'
    default_detail = {
        'status': 401,
        'error': 'Unauthorized',
        'message': '',
    }


class InternalServerError(CustomAPIException):
    status_code = 500
    default_code = 'internal_server_error'
    default_detail = {
        'status': 500,
        'error': 'Internal server error',
        'message': 'Could not perform the task. There is some problem.',
    }
