from flask import Flask
from config import mysql
from routes.task_routes import task_bp
from dotenv import load_dotenv
import os
load_dotenv()
app = Flask(__name__)
app.config["MYSQL_HOST"] = os.getenv("DB_HOST")
app.config["MYSQL_USER"] = os.getenv("DB_USER")
app.config["MYSQL_PASSWORD"] = os.getenv("DB_PASSWORD")
app.config["MYSQL_DB"] = os.getenv("DB_NAME")
mysql.init_app(app)
app.register_blueprint(task_bp)
if __name__ == "__main__":
    app.run(
    host="0.0.0.0",
    port=5001,
    debug=True
)