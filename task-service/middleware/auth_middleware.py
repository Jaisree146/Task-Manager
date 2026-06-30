import os
from functools import wraps

import jwt
from dotenv import load_dotenv
from flask import jsonify, request

load_dotenv()


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify(
                {
                    "message": "Token Missing",
                }
            ), 401

        token = auth_header.split(" ")[1]

        try:
            payload = jwt.decode(
                token,
                os.getenv("JWT_SECRET"),
                algorithms=["HS256"],
            )
            request.user = payload

        except Exception:
            return jsonify(
                {
                    "message": "Invalid Token",
                }
            ), 403

        return f(*args, **kwargs)

    return decorated