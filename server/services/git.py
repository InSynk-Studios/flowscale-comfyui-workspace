import pygit2
import os
import datetime
import subprocess

def run_git_command(repo_path, command):
    print(["git", "-C", repo_path] + command)
    return subprocess.run(["git", "-C", repo_path] + command, text=True)


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


def create_commit_all_service(repo_name, message):
    repo = pygit2.Repository(repo_name)
    repo.index.add_all()
    repo.index.write()
    tree = repo.index.write_tree()
    author = pygit2.Signature('You', 'your.email@example.com')
    committer = pygit2.Signature('You', 'your.email@example.com')
    oid = repo.create_commit('refs/heads/master', author, committer, message, tree, [repo.head.peel().hex])
    # LAST_COMMIT = repo.head.peel().hex
    # ref = repo.references.create('refs/master', LAST_COMMIT)
    return str(oid)


def push_to_remote_service(repo_name, remote_name):
    repo = pygit2.Repository(repo_name)
    remote = repo.remotes[remote_name]
    remote.push(["refs/heads/master:refs/heads/master"])

def checkout_branch(repo_name, branch_name):
    repo = pygit2.Repository(repo_name)
    branch = repo.lookup_branch(branch_name)
    if branch is not None:
        repo.checkout(branch)
        return True
    else:
        print(f"Branch {branch_name} does not exist.")
        return False


def git_log_service(repo_name):
    repo = pygit2.Repository(repo_name)
    # checkout_branch(repo_name, "master")
    if not repo.head_is_unborn:
        # LAST_COMMIT = repo.head.peel().hex
        # ref = repo.references.get('refs/heads/master')
        ref = repo.head.target
        commits = []
        for commit in repo.walk(ref, pygit2.GIT_SORT_TIME):
            commits.append({
                'message': commit.message,
                'author': commit.author.name,
                'date': datetime.datetime.fromtimestamp(commit.commit_time).isoformat(),
                'sha': commit.hex
            })
        return commits
    else:
        return []


def git_diff_service(repo_name):
    repo = pygit2.Repository(repo_name)
    diff = repo.diff("HEAD")
    return diff.patch

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


def checkout_branch_service(repo_name, branch_name):
    repo = pygit2.Repository(repo_name)
    branch = repo.lookup_branch(branch_name)
    repo.checkout(branch)


def create_branch_service(repo_name, new_branch_name):
    repo = pygit2.Repository(repo_name)
    branch = repo.create_branch(new_branch_name, repo.head.peel())


def delete_branch_service(repo_name, branch_name):
    repo = pygit2.Repository(repo_name)
    branch = repo.lookup_branch(branch_name)
    repo.branches.delete(branch.branch_name)


def view_all_branches_service(repo_name):
    repo = pygit2.Repository(repo_name)
    branches = [branch for branch in repo.branches]
    return branches
