from flask import Blueprint, request
import pygit2
import os

bp = Blueprint("git", __name__)


@bp.route("/create_repo", methods=["POST"])
def create_repo():
    repo_name = request.json["repo_name"]
    repo = pygit2.init_repository(repo_name, bare=False)
    return {"message": f"Repository {repo_name} created."}, 200


@bp.route("/create_commit", methods=["POST"])
def create_commit():
    repo_name = request.json["repo_name"]
    message = request.json["message"]
    files = request.json["files"]
    repo = pygit2.Repository(repo_name)
    index = repo.index
    for file in files:
        index.add(file)
    index.write()
    tree = index.write_tree()
    author = pygit2.Signature("You", "you@example.com")
    committer = pygit2.Signature("You", "you@example.com")
    oid = repo.create_commit(
        "refs/heads/master",
        author,
        committer,
        message,
        tree,
        [] if repo.head_is_unborn else [repo.head.get_object().hex],
    )
    return {"message": f"Commit {oid} created."}, 200


@bp.route("/push", methods=["POST"])
def push_to_remote():
    repo_name = request.json["repo_name"]
    remote_name = request.json["remote_name"]
    repo = pygit2.Repository(repo_name)
    remote = repo.remotes[remote_name]
    remote.push(["refs/heads/master:refs/heads/master"])
    return {"message": f"Pushed to {remote_name}."}, 200


@bp.route("/log", methods=["GET"])
def git_log():
    repo_name = request.args.get("repo_name")
    repo = pygit2.Repository(repo_name)
    logs = []
    for commit in repo.walk(repo.head.target, pygit2.GIT_SORT_TIME):
        logs.append(
            {
                "Commit": commit.hex,
                "Author": commit.author.name,
                "Date": commit.commit_time,
                "Message": commit.message.strip(),
            }
        )
    return {"logs": logs}, 200


@bp.route("/diff", methods=["GET"])
def git_diff():
    repo_name = request.args.get("repo_name")
    repo = pygit2.Repository(repo_name)
    diff = repo.diff("HEAD")
    diffs = [str(patch) for patch in diff]
    return {"diffs": diffs}, 200
