import shelve

from flask import Flask

app = Flask(__name__)


@app.route('/todos')
def get_todos():
    s = shelve.open('todos')
    try:
        todos = s.keys()
    finally:
        s.close()
    return ', '.join(todos)


@app.route('/todos/add/<todo_string>')
def add_todo(todo_string):
    s = shelve.open('todos')
    try:
        s[todo_string] = {'active': 0}
    finally:
        s.close()
    return get_todos()


@app.route('/todos/remove/<todo_string>')
def remove_todo(todo_string):
    s = shelve.open('todos')
    try:
        del s[todo_string]
    finally:
        s.close()
    return get_todos()


if __name__ == "__main__":
    app.run(debug=True)
