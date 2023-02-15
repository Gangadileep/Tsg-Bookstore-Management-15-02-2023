from services.auth import check_for_token
from app import app
from flask import request
from flask import jsonify
import pymysql
from config import mydb
from services.log import logger

# SEARCHING FOR BOOKS
@app.route('/search', methods=['POST'])
@check_for_token
def searchBook():
    try:
        json = request.json
        search_value = json['search_value']
        conn = mydb.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        print("Search value:", search_value)
        cursor.execute("SELECT bookname, author FROM book WHERE bookname LIKE %s OR author LIKE %s",("%" + search_value + "%", "%" + search_value + "%"))
        empRow = cursor.fetchall()
        print("Result:", empRow)
        conn.commit()
        respone = jsonify(empRow)
        respone.status_code = 200
        return respone
    except pymysql.Error as e:
        logger.error(f"pymysql.Error: {e}")
        return jsonify({'error': 'Error occur in sql syntax'})
