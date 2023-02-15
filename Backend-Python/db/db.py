import mysql.connector
mydb = mysql.connector.connect(
    host = "localhost",
    user = "root",
    password = "",
    database = "bookstore"
)
# TABLE FOR ADMIN AND USER ROLE
mydb_Create_Table_Query = """CREATE TABLE role (
id int(100) not null auto_increment,
role varchar(50) not null,
CONSTRAINT type_pk PRIMARY KEY (id)
)"""
# TABLE FOR USER REGISTRATION
mydb_Create_Table_Query = """CREATE TABLE user
( id int(100) not null AUTO_INCREMENT PRIMARY KEY,
  fullname varchar(50) not null,
  username varchar(50) not null,
  password varchar(255) not null,
  role_id int(100) not null,
  FOREIGN KEY(role_id) REFERENCES role(id) 
)"""
# # TABLE FOR STORING CATEGORY DETAILS OF BOOK
mydb_Create_Table_Query = """CREATE TABLE category
(id int(100) not null auto_increment,
category varchar(50) not null,
CONSTRAINT category_pk PRIMARY KEY (id)
)"""
# TABLE FOR STORING DETAILS OF BOOKS
mydb_Create_Table_Query = """CREATE TABLE book
(id int(100) not null AUTO_INCREMENT PRIMARY KEY,
isbn varchar(30) not null UNIQUE ,
bookname varchar(50) not null,
author varchar(50) not null,
category_id int(100) not null,
price numeric(50) not null,
admin_id int(50) not null,
FOREIGN KEY (category_id) REFERENCES category(id),
FOREIGN KEY (admin_id) REFERENCES user(id)
)"""
cursor = mydb.cursor()
result = cursor.execute(mydb_Create_Table_Query)
print(" Table created successfully")