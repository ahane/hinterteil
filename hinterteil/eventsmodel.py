from hinterteil import db

class Venue(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lon = db.Column(db.Float, nullable=False)
    adress_string = db.Column(db.Unicode, nullable=False)

    description = db.Column(db.Unicode, nullable=True)
    last_modified = db.Column(db.DateTime, nullable=True)

    region = db.relationship('Region', backref='venues')
    region_id = db.Column(db.Integer, db.ForeignKey('region.id'), nullable=False)
    pages = db.relationship('VenuePage', backref='venue')
    source = db.relationship('ThirdParty')
    source_id = db.Column(db.Integer, db.ForeignKey('third_party.id'), nullable=False)

class VenuePage(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.Unicode, unique=True, nullable=False) #url at thridparty
    resource_id = db.Column(db.Unicode, nullable=True) #the id on the third party

    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'), nullable=False)
    third_party = db.relationship('ThirdParty', backref='venue_pages')
    third_party_id = db.Column(db.Integer, db.ForeignKey('third_party.id'), nullable=False)

class Region(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, unique=True, nullable=False)
    country = db.Column(db.Unicode, nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lon = db.Column(db.Float, nullable=False)

class Event(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    start_datetime = db.Column(db.DateTime, nullable=False)
    end_datetime = db.Column(db.DateTime, nullable=True)
    #end_time = db.Column(db.Time, nullable=True)
    description = db.Column(db.Unicode, nullable=True)
    last_modified = db.Column(db.DateTime, nullable=True)

    source = db.relationship('ThirdParty')
    source_id = db.Column(db.Integer, db.ForeignKey('third_party.id'), nullable=False)
    #one-to-many
    performances = db.relationship('Performance', backref='event')
    pages = db.relationship('EventPage', backref='event')
    venue = db.relationship('Venue', backref='events')
    venue_id = db.Column(db.Integer, db.ForeignKey('venue.id'), nullable=False)

class EventPage(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.Unicode, unique=True, nullable=False)

    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    resource_id = db.Column(db.Unicode, nullable=True) #id at third party
    third_party = db.relationship('ThirdParty', backref='event_pages')
    third_party_id = db.Column(db.Integer, db.ForeignKey('third_party.id'), nullable=False)

class Performance(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.DateTime, nullable=True)
    name = db.Column(db.Unicode, nullable=True)

    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'), nullable=False)
    kind = db.relationship('PerformanceKind', backref='performances')
    kind_id = db.Column(db.Integer, db.ForeignKey('performance_kind.name'), nullable=False)

class Artist(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False)
    description = db.Column(db.Unicode, nullable=True)
    last_modified = db.Column(db.DateTime, nullable=True)

    performances = db.relationship('Performance', backref='artist')
    pages = db.relationship('ArtistPage', backref='artist')
    source = db.relationship('ThirdParty')
    source_id = db.Column(db.Integer, db.ForeignKey('third_party.id'), nullable=False)

class ArtistPage(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.Unicode, unique=True, nullable=False) #url at tp

    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'), nullable=False)
    resource_id = db.Column(db.Unicode, nullable=True) #id at tp
    third_party = db.relationship('ThirdParty', backref='artist_pages')
    third_party_id = db.Column(db.Integer, db.ForeignKey('third_party.id'), nullable=False)

class ArtistSample(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.Unicode, unique=True, nullable=False) #url at tp
    name = db.Column(db.Unicode, nullable=True)
    description = db.Column(db.Unicode, nullable=True)
    genre_string = db.Column(db.Unicode, nullable=True)
    label = db.Column(db.Unicode, nullable=True)
    license = db.Column(db.Unicode, nullable=True)

    artist = db.relationship('Artist', backref='samples')
    artist_id = db.Column(db.Integer, db.ForeignKey('artist.id'), nullable=False)
    resource_id = db.Column(db.Unicode, nullable=False)
    third_party = db.relationship('ThirdParty')
    third_party_id = db.Column(db.Integer, db.ForeignKey('third_party.id'), nullable=False)

class ThirdParty(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=False, unique=True)
    url = db.Column(db.Unicode, nullable=False, unique=True)

class PerformanceKind(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Unicode, nullable=True, unique=True)
