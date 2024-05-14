from flask import Blueprint, request
from services import git as gs

bp = Blueprint("git", __name__)


@bp.route("/create_repo", methods=["POST"])
def create_repo():
    repo_name = request.json["repo_name"]
    gs.create_repo_service(repo_name)
    return {"message": f"Repository {repo_name} created."}, 200


@bp.route("/create_commit", methods=["POST"])
def create_commit():
    repo_name = request.json["repo_name"]
    message = request.json["message"]
    files = request.json["files"]
    oid = gs.create_commit_service(repo_name, message, files)
    return {"message": f"Commit {oid} created."}, 200


@bp.route("/create_commit_all", methods=["POST"])
def create_commit_all():
    repo_name = request.json["repo_name"]
    message = request.json["message"]
    oid = gs.create_commit_all_service(repo_name, message)
    return {"message": f"Commit {oid} created."}, 200


@bp.route("/push", methods=["POST"])
def push_to_remote():
    repo_name = request.json["repo_name"]
    remote_name = request.json["remote_name"]
    gs.push_to_remote_service(repo_name, remote_name)
    return {"message": f"Pushed to {remote_name}."}, 200


@bp.route("/log", methods=["GET"])
def git_log():
    repo_name = request.args.get("repo_name")
    print(repo_name)
    logs = gs.git_log_service(repo_name)
    return {"logs": logs}, 200


@bp.route("/diff", methods=["GET"])
def git_diff():
    repo_name = request.args.get("repo_name")
    diffs = gs.git_diff_service(repo_name)
    return {"diffs": diffs}, 200


@bp.route("/status", methods=["GET"])
def git_status():
    repo_name = request.args.get("repo_name")
    status = gs.git_status_service(repo_name)
    return {"status": status}, 200


@bp.route("/discard_unstaged", methods=["POST"])
def discard_unstaged():
    repo_name = request.json["repo_name"]
    gs.discard_unstaged_service(repo_name)
    return {"message": "Unstaged changes discarded."}, 200


@bp.route("/discard_unstaged_file", methods=["POST"])
def discard_unstaged_file():
    repo_name = request.json["repo_name"]
    file_path = request.json["file_path"]
    gs.discard_unstaged_file_service(repo_name, file_path)
    return {"message": f"Unstaged changes in {file_path} discarded."}, 200


@bp.route("/stage_all_changes", methods=["POST"])
def stage_all_changes():
    repo_name = request.json["repo_name"]
    gs.stage_all_changes_service(repo_name)
    return {"message": "All changes staged."}, 200


@bp.route("/stage_file_change", methods=["POST"])
def stage_file_change():
    repo_name = request.json["repo_name"]
    file_path = request.json["file_path"]
    gs.stage_file_change_service(repo_name, file_path)
    return {"message": f"Changes in {file_path} staged."}, 200


@bp.route("/add_remote", methods=["POST"])
def add_remote():
    repo_name = request.json["repo_name"]
    remote_name = request.json["remote_name"]
    url = request.json["url"]
    gs.add_remote_service(repo_name, remote_name, url)
    return {"message": f"Remote {remote_name} added."}, 200


@bp.route("/checkout_branch", methods=["POST"])
def checkout_branch():
    repo_name = request.json["repo_name"]
    branch_name = request.json["branch_name"]
    if_branch = gs.checkout_branch(repo_name, branch_name)
    if if_branch:
        return {"message": f"Checked out branch {branch_name}."}, 200
    return {"message": f"Branch {branch_name} not found."}, 404


@bp.route("/create_branch", methods=["POST"])
def create_branch():
    repo_name = request.json["repo_name"]
    new_branch_name = request.json["new_branch_name"]
    gs.create_branch_service(repo_name, new_branch_name)
    return {"message": f"Created branch {new_branch_name}."}, 200


@bp.route("/delete_branch", methods=["POST"])
def delete_branch():
    repo_name = request.json["repo_name"]
    branch_name = request.json["branch_name"]
    gs.delete_branch_service(repo_name, branch_name)
    return {"message": f"Deleted branch {branch_name}."}, 200


@bp.route("/view_all_branches", methods=["GET"])
def view_all_branches():
    repo_name = request.args.get("repo_name")
    branches = gs.view_all_branches_service(repo_name)
    return {"branches": branches}, 200
