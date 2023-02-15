# import unittest
# import json
# from services.admin.book import addBook
# from unittest.mock import MagicMock
# from flask import request

# class TestAddBook(unittest.TestCase):
#     def setUp(self):
#         self.valid_data = {
#             'isbn': '978-3-16-148410-0',
#             'bookname': 'The Catcher in the Rye',
#             'author': 'J.D. Salinger',
#             'category_id': '1',
#             'price': '19.99',
#             'admin_id': '1'
#         }
        
#         self.invalid_data = {
#             'isbn': '',
#             'bookname': '',
#             'author': '',
#             'category_id': '',
#             'price': '',
#             'admin_id': ''
#         }


# def test_add_book_success(self):
#     mock_request = MagicMock()
#     mock_request.headers =  request.headers.get('Authorization')
#     response = addBook(self.valid_data)
#     self.assertEqual(response.status_code, 200)
#     self.assertEqual(json.loads(response.data), {'message': 'Book details added successfully!'})

# def test_add_book_error(self):
#     response = addBook(self.invalid_data)
#     self.assertEqual(response.status_code, 400)
#     self.assertEqual(json.loads(response.data), {'error': 'Invalid input. Please fill up all the required fields.'})

# if __name__ == '__main__':
#     unittest.main()
