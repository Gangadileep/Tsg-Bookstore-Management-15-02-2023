from flask import jsonify
import re
#VALIDATION TO CHECK FOR STRONG PASSWORD
def validate_password_strength(password):
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    if not re.search("[a-z]", password):
        return False, "Password must contain at least one lowercase letter"
    if not re.search("[A-Z]", password):
        return False, "Password must contain at least one uppercase letter"
    if not re.search("[0-9]", password):
        return False, "Password must contain at least one digit"
    if not re.search("[!@#$%^&*()_+=-]", password):
        return False, "Password must contain at least one special character (!@#$%^&*()_+=-)"
    return True, "Password is strong"

def validate_register_data(fullname, username, password ):
# VALIDATION FOR FULLNAME
    if not fullname:
        return jsonify({"error": "Full name is required"}), 400
    if len(fullname) < 3:
        return jsonify({"error": "Full name must be at least 3 characters"}), 400
    if not all(i.isalpha() or i.isspace() for i in fullname):
        return jsonify({"error": "Full name can only contain letters and spaces"}), 400
# VALIDATION FOR USERNAME
    if not username:
        return jsonify({"error": "Username is required"}), 400
    if len(username) < 3:
        return jsonify({"error": "Username must be at least 3 characters"}), 400
# VALIDATION FOR PASSWORD    
    if not password:
        return jsonify({"error": "Password is required"}), 400
    password_is_strong, password_error = validate_password_strength(password)
    if not password_is_strong:
        return jsonify({"error": password_error}), 400
    return None

def validate_form(isbn, bookname, author, category, price):
# ISBN validation (13 digits)
    try:
        int_isbn = int(isbn)
        if len(str(int_isbn)) != 13:
            raise ValueError('ISBN must be a 13-digit number')
    except ValueError:
        raise ValueError('Invalid ISBN format')
# Book name validation (not empty)
    if not bookname:
        raise ValueError('Book name is required')
    
# Author validation (not empty)
    if not author:
        raise ValueError('Author is required')
    
# Category validation (not empty)
    if not category:
        raise ValueError('Category is required')
    
# Price validation (not negative)
    if int(price) < 0:
        raise ValueError('Price must not be negative')


# Example usage:
# try:
#     validate_form('1234567890123', 'Book Title', 'John Doe', 'Fiction', 10)
#     print('Form is valid')
# except ValueError as e:
#     print(e)
