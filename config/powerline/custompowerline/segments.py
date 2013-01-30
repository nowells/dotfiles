import os


def rvm():
    rvm_string = os.path.basename(os.environ.get('GEM_HOME', '')) or None
    if not rvm_string:
        return
    ruby, _, gemset = rvm_string.partition('@')
    interpreter, _, other = ruby.partition('-')
    version, _, patch = other.partition('-')
    if gemset:
        return '{0}-{1}@{2}'.format(interpreter, version, gemset)
    else:
        return '{0}-{1}'.format(interpreter, version)


def branch():
    from powerline.lib.vcs import guess
    repo = guess(os.path.abspath(os.getcwd()))
    if repo:
        branch = repo.branch()
        return [{
            'contents': branch,
            'highlight_group': 'branch' if branch != 'master' else ['masterbranch', 'branch'],
        }]
    return None
