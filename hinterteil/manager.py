from hinterteil import app, db
from hinterteil.eventsmodel import *
import flask.ext.sqlalchemy as alchemy
import flask.ext.restless as restless

manager = restless.APIManager(app, flask_sqlalchemy_db=db)

# Create API endpoints, which will be available at /api/<tablename> by
# default. Allowed HTTP methods can be specified as well.
manager.create_api(Venue, methods=['GET', 'POST', 'PUT', 'HEAD'], max_results_per_page=False, results_per_page=False)
manager.create_api(Event, methods=['GET', 'POST', 'PUT', 'HEAD'], max_results_per_page=False, results_per_page=False)
manager.create_api(Artist, methods=['GET', 'POST', 'PUT', 'HEAD'], max_results_per_page=False, results_per_page=False)
manager.create_api(Performance, methods=['GET', 'POST', 'PUT', 'HEAD'], max_results_per_page=False, results_per_page=False)

#relatively static category-like entities
manager.create_api(PerformanceKind, methods=['GET', 'PUT', 'POST', 'HEAD'], max_results_per_page=False, results_per_page=False)
manager.create_api(Region, methods=['GET', 'PUT', 'POST', 'HEAD'], max_results_per_page=False, results_per_page=False)
manager.create_api(ThirdParty, methods=['GET', 'PUT', 'POST', 'HEAD'], max_results_per_page=False, results_per_page=False)

#third party resources
manager.create_api(ArtistSample, methods=['GET', 'PUT', 'POST', 'HEAD'], max_results_per_page=False, results_per_page=False)
manager.create_api(VenuePage, methods=['GET', 'PUT', 'POST', 'HEAD'], max_results_per_page=False, results_per_page=False)
manager.create_api(EventPage, methods=['GET', 'PUT', 'POST', 'HEAD'], max_results_per_page=False, results_per_page=False)
manager.create_api(ArtistPage, methods=['GET', 'PUT', 'POST', 'HEAD'], max_results_per_page=False, results_per_page=False)
