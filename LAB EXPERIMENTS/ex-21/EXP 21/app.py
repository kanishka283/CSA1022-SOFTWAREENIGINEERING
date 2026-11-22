from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
tasks = []

@app.route("/")
def index():
    return render_template("index.html", tasks=tasks)

@app.route("/add", methods=["POST"])
def add():
    t = request.form.get("task", "").strip()
    if t:
        tasks.append(t)
    return redirect(url_for("index"))

@app.route("/delete/<int:i>")
def delete(i):
    if 0 <= i < len(tasks):
        tasks.pop(i)
    return redirect(url_for("index"))

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
