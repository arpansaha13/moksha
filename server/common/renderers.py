from rest_framework.renderers import JSONRenderer
from .cryptojs import encrypt
import json
import environ

env = environ.Env()
environ.Env.read_env()


class CryptoRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        return encrypt(json.dumps(data), env('PAYLOAD_SECRET')).decode()
