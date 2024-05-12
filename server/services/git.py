import pygit2
import os


def create_repo_service(repo_name):
    repo = pygit2.init_repository(repo_name, bare=False)
    return repo


def create_commit_service(repo_name, message, files):
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
    return oid


def push_to_remote_service(repo_name, remote_name):
    repo = pygit2.Repository(repo_name)
    remote = repo.remotes[remote_name]
    remote.push(["refs/heads/master:refs/heads/master"])


def git_log_service(repo_name):
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
    return logs


def git_diff_service(repo_name):
    repo = pygit2.Repository(repo_name)
    diff = repo.diff("HEAD")
    diffs = [str(patch) for patch in diff]
    return diff


def git_status_service(repo_name):
    repo = pygit2.Repository(repo_name)
    status = repo.status()
    return status


def discard_unstaged_service(repo_name):
    repo = pygit2.Repository(repo_name)
    repo.reset("HEAD", pygit2.GIT_RESET_HARD)


def discard_unstaged_file_service(repo_name, file_path):
    repo = pygit2.Repository(repo_name)
    repo.checkout_head(paths=[file_path])


def stage_all_changes_service(repo_name):
    repo = pygit2.Repository(repo_name)
    repo.index.add_all()
    repo.index.write()


def stage_file_change_service(repo_name, file_path):
    repo = pygit2.Repository(repo_name)
    repo.index.add(file_path)
    repo.index.write()


def add_remote_service(repo_name, remote_name, url):
    repo = pygit2.Repository(repo_name)
    repo.remotes.create(remote_name, url)
