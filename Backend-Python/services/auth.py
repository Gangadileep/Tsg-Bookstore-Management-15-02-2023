import jwt
from flask import jsonify
from flask import request
from app import app
from functools import wraps

def check_for_token(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        access_token = request.headers.get('Authorization')
        print (access_token)
        access_token = access_token.replace('Bearer ', '')
        # print(access_token)
        if not access_token:
            return jsonify({'message': 'Missing token!'}), 403
        try:
            jwt.decode(access_token, app.config['JWT_SECRET_KEY'], algorithms='HS256')
            print(access_token) 
        except:
            return jsonify({'message': 'Invalid token!'}), 403  
        return func(*args, **kwargs)
    return wrapped

def check_for_admin(func):
    @wraps(func)
    def wrapped(*args, **kwargs):
        # Get the payload from the token
        access_token = request.headers.get('Authorization')
        access_token = access_token.replace('Bearer ', '')
        payload = jwt.decode(access_token, app.config['JWT_SECRET_KEY'], algorithms='HS256')

        # Check if the user is an admin with admin_id equal to 1
        if payload.get('is_admin') != True or payload.get('admin_id') != 1:
            return jsonify({'message': 'Unauthorized: Admin access required!'}), 401
        return func(*args, **kwargs)
    return wrapped

