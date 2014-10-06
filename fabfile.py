from fabric.api import local
import restapi.app as app
def test():
    local('echo aa')
    #app = local('python restapi.py')
    #local('jamine-node tests/')
    #app.stop()
