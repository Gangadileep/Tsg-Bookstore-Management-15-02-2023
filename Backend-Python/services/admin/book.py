from distutils.util import execute
from multiprocessing import connection
from sqlite3 import Cursor
from app import app
from flask import request
from services.dbconnection import connect_and_commit
from models.model import Book
from flask import jsonify
import pymysql
from config import mydb
from validations import  validate_form
from services.auth import check_for_token,check_for_admin
from services.log import logger

#INSERTING BOOK DETAILS
@app.route('/book', methods=['POST'])
@check_for_token
def addBook(id=None):
    try:
        json = request.json
        isbn = json['isbn'] 
        bookname = json['bookname'] 
        author = json['author']    
        category_id = json['category_id']
        price = json['price']
        admin_id = json['admin_id']
        bookObj = Book(id,isbn, bookname, author, category_id, price, admin_id)
        
        if request.method == 'POST':
            validate_form(isbn, bookname, author, category_id, price)
            
            sqlQuery = "INSERT INTO book(isbn, bookname, author, category_id, price, admin_id) VALUES(%s,%s,%s, %s, %s, %s)"
            bindData = (bookObj.isbn, bookObj.bookname, bookObj.author, bookObj.category_id, bookObj.price, bookObj.admin_id)  
            connect_and_commit(sqlQuery, bindData)

            return jsonify({'message': 'Book details added successfully!'})
        else:
            return showMessage()
    except ValueError as e:
        return jsonify({'error': str(e)})
    except pymysql.Error as e:
        logger.error(f"pymysql.Error: {e}")
        return jsonify({'error': 'Error occur in sql syntax'})
    except KeyError as e:
        logger.error(f"KeyError: {e}")
        return jsonify({'error': str(e)})


# VIEWING ALL BOOKS
@app.route('/book', methods=['GET'])
@check_for_token
def book():
    try:
        conn = mydb.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT book.id, book.isbn, book.bookname, book.author, category.category, book.price, book.admin_id FROM book JOIN category ON book.category_id=category.id")
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

# VIEWING PARTICULAR BOOK 
@app.route('/book/<id>', methods=['GET'])
@check_for_token
def bookDetails(id):
    try:
        conn = mydb.connect()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT book.id, book.isbn, book.bookname, book.author, category.category, book.price, book.admin_id FROM book JOIN category ON book.category_id=category.id WHERE book.id=%s",(id))
        empRow = cursor.fetchone()
        respone = jsonify(empRow)
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

#UPDATING THE BOOK DETAILS    
@app.route('/book/<id>', methods=['PUT'])
@check_for_token
# @check_for_admin
def updateBook(id):
    try:
# get the admin credentials from the request
        _json = request.json
        _id= id
        _isbn =_json['isbn']
        _bookname = _json['bookname']
        _author= _json['author']
        _category_id = _json['category_id']
        _price = _json['price']
        _admin_id =_json['admin_id']
        book= Book(_id,_isbn,_bookname, _author, _category_id, _price,_admin_id)
        if _isbn and _bookname and _author and _category_id and _price and _admin_id and request.method  == 'PUT':
            conn = mydb.connect()
            cursor = conn.cursor()
            query = "SELECT bookname FROM book WHERE id=%s"
            bindData = book.id
            data = cursor.execute(query, bindData)
            print("book")
            if data == 0:
                conn.commit()
                response = jsonify('Book does not exist')
                return response

            elif data == 1:
                sqlQuery = " UPDATE book SET isbn= %s, bookname= %s, author= %s, category_id= %s, price= %s, admin_id=%s  WHERE id=%s "
                bindData = (book.isbn, book.bookname, book.author, book.category_id, book.price, book.admin_id, book.id)
                cursor.execute(sqlQuery, bindData)
                conn.commit()
                respone = jsonify('Book updated successfully!')
                respone.status_code = 200
                print(respone)
                return respone
                
        else:
            return showMessage()
    except pymysql.Error as e:
        logger.error(f"pymysql.Error: {e}")
        return jsonify({'error': 'Error occur in sql syntax'})
    except KeyError as e:
        logger.error(f"KeyError: {e}")
        return jsonify({'error': 'A required key is missing from the request'})

# DELETING BOOK DETAILS
@app.route('/book/<isbn>', methods=['DELETE'])
@check_for_token
# @check_for_admin
def deleteBook(isbn):
    try:            
        connect_and_commit("DELETE FROM book WHERE isbn =%s",(isbn))     
        respone = jsonify('Book Details deleted successfully!')
        respone.status_code = 200
        return respone
    except KeyError as e:
        logger.error(f"KeyError: {e}")
        return jsonify({'error': 'A required key is missing from the request'})

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