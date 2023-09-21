from rest_framework.renderers import JSONRenderer
from .cryptojs import encrypt
import environ

env = environ.Env()
environ.Env.read_env()


class CryptoRenderer(JSONRenderer):
    charset = 'utf-8'

    def render(self, data, accepted_media_type=None, renderer_context=None):
        json_rendered = super().render(data, accepted_media_type, renderer_context)
        return encrypt(json_rendered, env('PAYLOAD_SECRET')).decode()
