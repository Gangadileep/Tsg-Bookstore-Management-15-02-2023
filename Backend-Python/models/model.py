# CREATING CONSTUCTOR 
class Usertype:
    def __init__(self,id,role):
        self.id=id
        self.role=role
# CREATING CONSTRUCTOR FOR REGISTER
class Register:
    def __init__(self,id,fullname,username,password,role_id):
        self.id=id
        self.fullname=fullname
        self.username=username
        self.password=password
        self.role_id=role_id
# CREATING CONSTRUCTOR
class Category:
    def __init__(self,id,category):
        self.id=id
        self.category=category
# CREATING CONSTRUCTOR FOR BOOK
class Book:
    def __init__(self,id,isbn,bookname, author, category_id, price,admin_id):
        self.id=id
        self.isbn=isbn
        self.bookname=bookname
        self.author=author
        self.category_id=category_id
        self.price=price
        self.admin_id=admin_id