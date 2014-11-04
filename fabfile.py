from fabric.api import local, parallel, task, serial
from multiprocessing import Process


def run():
    #app.run()
    local('gunicorn -b localhost:5000 hinterteil:app -D -p guni_pid')
    #return local('python run.py &')
    #return server
def kill():
    local('kill `cat guni_pid`')
def test():
    #run()
    #local('python run.py', capture=True)
    #server = Process(target=run)
    reset_database()
    run()
    try:
        local('jasmine-node tests/')
    except:
        pass
    finally:
        kill()
    #server = local('fab run')
    #tester = local('fab run_tests')
    #server.terminate()
    #run_tests()
    #server.terminate()

def reset_database():
    try:
        local('rm hinterteil/test.db')
    except:
        pass

def show_gunis():
    local('ps -xa | grep gunicorn')

def run_tests():
    local('jasmine-node tests/')
