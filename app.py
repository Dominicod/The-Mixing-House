from crypt import methods
import re
from flask import Flask, render_template, request, redirect, jsonify, make_response, session
from flask_session import Session
import sqlite3
from werkzeug.security import check_password_hash, generate_password_hash

from itsdangerous import json

app = Flask(__name__)

# Makes sure templates are reloading when edited
app.config["TEMPLATES_AUTO_RELOAD"] = True

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

"""
@app.route("/")
def index():
    return render_template("landing.html")
"""

# Landing page of website

@app.route("/landing")
def index():
    return render_template("landing.html")

# Website Registration


@app.route("/register")
def register():
    return render_template("register.html")

# Website Login


@app.route("/login")
def login():
    return render_template("login.html")

# Login/Register validation


@app.route("/validation", methods=["POST", "GET"])
def validation():
    if request.method == "POST":
        req = request.get_json()
        # Clears the cookies
        #session.clear()
        if req['origin'] == "/login":
            print("login")
        elif req['origin'] == "/register":
            # Registers the user into the database
            db.execute("SELECT username FROM users WHERE username=?", [req['username']])
            username = db.fetchall()
            if username:
                return jsonify(400)
            else:
                password = generate_password_hash(req['password'])
                db.execute("INSERT INTO users (username, hash) VALUES (?,?)", [req['username'], password])
                #con.commit()
        else: return jsonify(400)

        return jsonify(307)
    if request.method == "GET":
        return redirect("/landing")