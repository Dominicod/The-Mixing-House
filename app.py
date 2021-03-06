from flask import Flask, render_template, request, redirect, jsonify, make_response, session
from flask_session import Session
import sqlite3
from werkzeug.security import check_password_hash, generate_password_hash
from functools import wraps

app = Flask(__name__)

# Makes sure templates are reloading when edited
app.config["TEMPLATES_AUTO_RELOAD"] = True


# Sets secret key and session
app.config["SECRET_KEY"] = ""
app.config["SESSION_PERMANENT"] = False

# Login required
def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'user_id' in session:
            return f(*args, **kwargs)
        else:
            return redirect("/")
    return wrap

# Database setup
try:
    con = sqlite3.connect('mixing.db', check_same_thread=False)
    db = con.cursor()
except:
    print("Could not connect to Database")

# Ensures reponses aren't cached
@app.after_request
def after_request(response):
    # HTTP 1.1
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    response.headers["Expires"] = 0  # HTTP 1.0
    response.headers["Pragma"] = "no-cache"  # Proxies
    return response

# Main homepage of website
@app.route("/")
def index():
    if request.method == "GET":
        return render_template("index.html")

# Log user out
@app.route("/logout")
@login_required
def logout():
    session.clear()
    return redirect("/")

# Login/Register validation
@app.route("/validation", methods=["POST"])
def validation():
    if request.method == "POST":
        req = request.get_json()
        # Clears the cookies
        session.clear()
        # Finds the origin of the request
        if req['origin'] == "signin":
            # Handles login
            db.execute("SELECT * FROM users WHERE username=?", [
                       req['username']])
            user = db.fetchall()
            if len(user) != 1 or not check_password_hash(user[0][2], req['password']):
                return "Invalid Login", 400

        elif req['origin'] == "create":
            # Handles registration
            # Registers the user into the database
            db.execute("SELECT username FROM users WHERE username=?", [
                       req['username']])
            username = db.fetchall()
            if username:
                return "Invalid Login", 400
            else:
                password = generate_password_hash(req['password'])
                db.execute("INSERT INTO users (username, hash) VALUES (?,?)", [
                           req['username'], password])
                con.commit()
        else:
            return "Invalid Login", 400

        # Sets the session for user
        db.execute("SELECT user_id FROM users WHERE username=?", [req['username']])
        id = db.fetchall()
        session["user_id"] = id
        session["username"] = req['username']
        return "Valid Login", 307