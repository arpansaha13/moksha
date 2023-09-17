from rest_framework.parsers import BaseParser
from rest_framework.exceptions import ParseError
from .cryptojs import decrypt
import json
import environ

env = environ.Env()
environ.Env.read_env()


class CryptoParser(BaseParser):
    media_type = 'text/plain'

    def parse(self, stream, media_type=None, parser_context=None):
        ciphertext_b64 = stream.read()
        stringified_json = decrypt(ciphertext_b64, env('PAYLOAD_SECRET').encode()).decode()

        try:
            return json.loads(stringified_json)
        except ValueError as exc:
            raise ParseError('JSON parse error - %s' % str(exc))
