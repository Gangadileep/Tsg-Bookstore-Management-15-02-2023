from app import app
from services.admin.book import *
from services.admin.category import *
from services.user.register import *
from services.user.search import *
# RUN SERVER
if __name__ == "__main__":
    app.run()