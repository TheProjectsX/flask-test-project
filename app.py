from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# App
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///todo.db"
db = SQLAlchemy(app)

# TODO DB
class TODO(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(200), nullable=False)
    done = db.Column(db.Boolean, default=False)
    time = db.Column(db.DateTime, default=datetime.now())

    def __repr__(self) -> str:
        return f"{self.id} - {self.content}"

@app.route("/", methods=["GET", "POST"])
def home():
    if (request.method == "POST"):
        content = request.form["content"]
        todo = TODO(content=content)
        db.session.add(todo)
        db.session.commit()
    
    AllTodo = TODO.query.all()

    return render_template("index.html", todoData=AllTodo)

@app.route("/delete/<int:id>")
def delete(id):
    todo = TODO.query.filter_by(id=id).one()
    db.session.delete(todo)
    db.session.commit()
    
    return redirect("/")

@app.route("/toggle-done/<int:id>")
def toggleDone(id):
    todo = TODO.query.filter_by(id=id).one()
    if (todo.done):
        todo.done = False
    else:
        todo.done = True
    
    db.session.add(todo)
    db.session.commit()
    
    return redirect("/")

if (__name__ == "__main__"):
    app.run(debug=True)