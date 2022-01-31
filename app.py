from flask import Flask, render_template, redirect
from flask_session import Session

app = Flask(__name__)

# Makes sure templates are reloading when edited
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Ensures reponses aren't cached
@app.after_request
def after_request(response):
    response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate" # HTTP 1.1 
    response.headers["Expires"] = 0 # HTTP 1.0
    response.headers["Pragma"] = "no-cache" # Proxies
    return response

# Main homepage of website
@app.route("/")
def index():
    return render_template("landing.html")

@app.route("/register")
def register():
    return render_template("register.html")

@app.route("/login")
def login():
    return render_template("login.html")