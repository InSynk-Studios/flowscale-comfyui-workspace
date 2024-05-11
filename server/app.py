from flask import Flask
from routes import git

app = Flask(__name__)

# Register the git routes
app.register_blueprint(git.bp)

if __name__ == '__main__':
    app.run(debug=True)