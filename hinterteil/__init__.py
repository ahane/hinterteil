import flask
import flask.ext.sqlalchemy as alchemy
import flask.ext.restless as restless
#import sys

app = flask.Flask(__name__)
app.config['DEBUG'] = True

#args = sys.argv
#if len(args) > 1:
#    app.config['SQLALCHEMY_DATABASE_URI'] = args[1]
#else:
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = alchemy.SQLAlchemy(app)

import hinterteil.eventsmodel
import hinterteil.manager
db.create_all()
# Create the Flask-Restless API manager.

#app.run()
