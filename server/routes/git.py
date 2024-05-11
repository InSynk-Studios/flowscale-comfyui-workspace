from flask import Blueprint, request, jsonify
from services import git

bp = Blueprint('git', __name__, url_prefix='/git')

@bp.route('/', methods=['POST'])
def handle_git_request():
    # Extract data from the request
    data = request.get_json()

    # Perform Git operations here using the data
    git.perform_operation(data)

    # Return a response
    return jsonify({"message": "Git operation successful"})