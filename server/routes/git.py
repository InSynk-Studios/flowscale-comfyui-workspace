from flask import Blueprint, request
from services import git_service as gs

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


@bp.route("/push", methods=["POST"])
def push_to_remote():
    repo_name = request.json["repo_name"]
    remote_name = request.json["remote_name"]
    gs.push_to_remote_service(repo_name, remote_name)
    return {"message": f"Pushed to {remote_name}."}, 200


@bp.route("/log", methods=["GET"])
def git_log():
    repo_name = request.args.get("repo_name")
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
