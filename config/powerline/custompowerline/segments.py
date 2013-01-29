import subprocess
import os


def rvm():
    rvm_command = os.path.expanduser('~/.rvm/bin/rvm-prompt',)
    if os.path.exists(rvm_command):
        proc = subprocess.Popen(
            [rvm_command, 'u', 'v', 'g'],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        output, _ = proc.communicate()
        if output:
            return u'%s' % output.strip().decode('utf-8')
