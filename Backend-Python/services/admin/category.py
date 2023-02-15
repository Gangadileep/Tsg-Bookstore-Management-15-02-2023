from app import app
from flask import request
from services.dbconnection import connect_and_commit
from flask import jsonify 
from models.model import Category
from services.auth import check_for_token
from services.log import logger
import pymysql
from config import mydb

# CREATING CATEGORY DETAILS
@app.route('/category', methods=['POST'])
@check_for_token
def addCategory(id=None):
    try:
        json = request.json
        category=json['category']
        categoryobj = Category(id, category)
        if category and request.method =='POST':
            sqlQuery = "INSERT INTO category(category) VALUES(%s)"
            bindData = categoryobj.category
            connect_and_commit(sqlQuery, bindData)
            respone = jsonify('Category details added successfully!')
            respone.status_code = 200
            return respone
        else:
            return showMessage()
    except KeyError as e:
        logger.error(f"KeyError: {e}")
        return jsonify({'error': 'A required key is missing from the request'})
# LISTING CATEGORY
@app.route('/category', methods=['GET'])
@check_for_token
def Categorylist(id=None):
    try:
        conn = mydb.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT id,category FROM category")
        empRows = cursor.fetchall()
        respone = jsonify(empRows)
        respone.status_code = 200
        return respone
    except pymysql.Error as e:
        logger.error(f"pymysql.Error: {e}")
        return jsonify({'error': 'Error occur in sql syntax'})
    except KeyError as e:
        logger.error(f"KeyError: {e}")
        return jsonify({'error': 'A required key is missing from the request'})
    finally:
        cursor.close()
        conn.close()


# DELETING THE CATEGORY DETAILS
@app.route('/category/<id>', methods=['DELETE'])
@check_for_token
def deleteCategory(id):
    try:
        sqlQuery = "DELETE FROM category WHERE id =%s"
        data = (id,)
        connect_and_commit(sqlQuery, data)
        response = jsonify('Category Details deleted successfully!')
        response.status_code = 200
        return response
    except Exception as e:
        print(e)
        response = jsonify('Error Occured while deleting the category')
        response.status_code = 500
        return response

#ERROR HANDLING       
@app.errorhandler(404)
def showMessage(error=None):
    message = {
        'status': 404,
        'message': 'Record not found: ' + request.url,
    }
    respone = jsonify(message)
    respone.status_code = 404
    return respone