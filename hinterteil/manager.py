from hinterteil import app, db
from hinterteil.eventsmodel import *
import flask.ext.sqlalchemy as alchemy
import flask.ext.restless as restless

manager = restless.APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(Venue, methods=['GET', 'POST', 'PUT', 'HEAD'])
manager.create_api(Event, methods=['GET', 'POST', 'PUT', 'HEAD'])
manager.create_api(Artist, methods=['GET', 'POST', 'PUT', 'HEAD'])
manager.create_api(Performance, methods=['GET', 'POST', 'PUT', 'HEAD'])

#relatively static category-like entities
manager.create_api(PerformanceKind, methods=['GET', 'PUT', 'POST', 'HEAD'], primary_key='name')
manager.create_api(Region, methods=['GET', 'PUT', 'POST', 'HEAD'], primary_key='name')
manager.create_api(ThirdParty, methods=['GET', 'POST', 'HEAD'], primary_key='name')

#third party resources
manager.create_api(ArtistSample, methods=['GET', 'POST', 'HEAD'])
manager.create_api(VenuePage, methods=['GET', 'POST', 'HEAD'])
manager.create_api(EventPage, methods=['GET', 'POST', 'HEAD'])
manager.create_api(ArtistPage, methods=['GET', 'POST', 'HEAD'])
