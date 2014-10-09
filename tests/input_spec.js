var frisby = require('frisby');
var API_URL = 'http://localhost:5000/api'

RegionA = {
    name: 'RegionA',
    country: 'CountryA',
    lat: 51.001, lon: 13.001};
RegionB = {
        name: 'RegionB',
        country: 'CountryA',
        lat: 51.001, lon: 13.002};
frisby.create('Input RegionA')
    .post(API_URL+'/region', RegionA, { json: true })
    .expectHeaderContains('Content-Type', 'json')
    .expectStatus(201)
    .expectJSON(RegionA)
    .expectJSONTypes({id: Number})
    .toss();
frisby.create('Input RegionB')
    .post(API_URL+'/region', RegionB, { json: true })
    .expectStatus(201)
    .toss();
//
PerformanceKindA = {
    name: 'PerformanceKindA'};
PerformanceKindB = {
        name: 'PerformanceKindB'};

//Test Proper Creation
frisby.create('Input performanceKindA')
    .post(API_URL+'/performance_kind', PerformanceKindA, { json: true })
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(201) // CREATED
        .expectJSON(PerformanceKindA)
        .expectJSONTypes({id: Number})
.toss();
frisby.create('Input performanceKindB')
    .post(API_URL+'/performance_kind', PerformanceKindB, { json: true })
        .expectStatus(201)
.toss();

//Test Retrieval of created
frisby.create('Get performanceKindA')
    .get(API_URL+'/performance_kind/'+PerformanceKindA.name)
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(200) // OK
        .expectJSON(PerformanceKindA)
.toss();

//Test Refusal of duplicate Names
frisby.create('Input performanceKindA')
    .post(API_URL+'/performance_kind', PerformanceKindA, { json: true })
    .expectStatus(400) // CONFLICT
.toss();

//Test for bad syntax
frisby.create('Input Giberish')
    .post(API_URL+'/performance_kind', {lat: "abc"}, { json: true })
    .expectStatus(400) // BAD SYNTAX
.toss();

//

//
ThirdPartyA = {
    name: 'thirdPartyA',
    url: 'http://thirdpartya.de'};
ThirdPartyB = {
    name: 'thirdPartyB',
    url: 'http://thirdpartyb.de'};

//Test Proper Creation
frisby.create('Input thirdPartyA')
    .post(API_URL+'/third_party', ThirdPartyA, { json: true })
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(201) // CREATED
        .expectJSON(ThirdPartyA)
        .expectJSONTypes({id: Number})
.toss();
frisby.create('Input thirdPartyB')
    .post(API_URL+'/third_party', ThirdPartyB, { json: true })
        .expectStatus(201)
.toss();

//Test Retrieval of created
frisby.create('Get thirdPartyA')
    .get(API_URL+'/third_party/'+ThirdPartyA.name)
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(200) // OK
        .expectJSON(ThirdPartyA)
.toss();

//Test Refusal of duplicate Names
frisby.create('Input duplicate thirdPartyA')
    .post(API_URL+'/third_party', ThirdPartyA, { json: true })
    .expectStatus(400)  // CONFLICT
.toss();

//Test for bad syntax
frisby.create('Input Giberish')
    .post(API_URL+'/third_party', {lat: "abc"}, { json: true })
    .expectStatus(400)  // BAD SYNTAX
.toss();


VenueA = {
    name: 'VenueA',
    lat: 13.001,
    lon: 51.002,
    region: {id: 1},
    source: {id: 1}
    };
VenueB = {
    name: 'VenueB',
    lat: 13.001,
    lon: 51.002,
    region: {id: 1},
    source: {id: 1}
    //flask-restless doesn't seem to support input by anything but id
    //region: {name: RegionB.name},
    //source: {name: ThirdPartyB.name}
    };

//Test Proper Creation
frisby.create('Input VenueA')
    .post(API_URL+'/venue', VenueA, { json: true })
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(201) // CREATED
        .expectJSON(VenueA)
        .expectJSON('region', RegionA)
        .expectJSON('source', ThirdPartyA)
        .expectJSONTypes({id: Number})
.toss();
frisby.create('Input VenueB')
    .post(API_URL+'/venue', VenueB, { json: true })
        .expectStatus(201)
.toss();

//Test Retrieval of created
frisby.create('Get VenueA')
    .get(API_URL+'/venue/1')
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(200) // OK
        .expectJSON('region', RegionA)
        .expectJSON('source', ThirdPartyA)
.toss();


//Test for bad syntax
frisby.create('Input Gibberish Venue')
    .post(API_URL+'/venue', {bert: "abc"}, { json: true })
    .expectStatus(400)  // BAD SYNTAX
.toss();


//Posting with venue or third_party objets doesnt work
//Therefore PUT on a Venue object is preferable! 
//The child object posted on a parent has to include the parent
//As in VenueB!
// VenuePageA = {
//     url: 'http://www.VenuePageA.com',
//     venue: {id: 1},
//     third_party: {id: 1}};

VenuePageA = {
    url: 'http://www.VenuePageA.com',
    venue_id: 1,
    third_party_id: 1};


VenuePageB = {
    url: 'http://www.VenuePageB.com',
    venue: {id: 2},
    third_party: {id: 1}};

//Test Proper Creation
frisby.create('Input VenuePageA')
    .post(API_URL+'/venue_page', VenuePageA, { json: true })
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(201) // CREATED
        .expectJSON(VenuePageA)
        .expectJSONTypes({id: Number})
        .expectJSONTypes({'venue': Object})
        .expectJSONTypes({'third_party': Object})
        .expectJSON({'venue_id': 1, 'third_party_id': 1})
.toss();

frisby.create('Input VenuePageB as PUT on VenueA')
    .put(API_URL+'/venue/1', {'pages': {'add': VenuePageB}}, { json: true })
    .expectStatus(200) //OK
    .expectJSON(VenueA)
    .expectJSONTypes({pages: Array})
    .expectJSONTypes()
    .expectJSON('pages', [{url: VenuePageA.url}, {url: VenuePageB.url}])
.toss();
    

//Test Retrieval of created
frisby.create('Get VenuePageA')
    .get(API_URL+'/venue_page/1')
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(200) // OK
        .expectJSON(VenuePageA)
.toss();

//Test Refusal of duplicate Names
frisby.create('Double Input VenuePageA')
    .post(API_URL+'/venue_page', VenuePageA, { json: true })
    .expectStatus(400)  // CONFLICT
.toss();

//Test for bad syntax
frisby.create('Input Gibberish')
    .post(API_URL+'/venue_page', { lat: "abc" }, { json: true })
    .expectStatus(400)  // BAD SYNTAX
.toss();


//After we created the VenuePage we test if it is contained in the Venue request
//Test Retrieval of created
frisby.create('Get VenueA after PageA Input')
    .get(API_URL+'/venue/1')
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(200) // OK
        .expectJSON('region', RegionA)
        .expectJSON('source', ThirdPartyA)
        .expectJSON('pages', [{url: VenuePageA.url}, {url: VenuePageB.url}])
.toss();

EventA = {
    name: 'EventA',
    start_date: '2014-10-21',
    venue_id: 1,
    source: {id: 1}
    };
EventB = {
    name: 'EventB',
    start_date: '2014-10-23',
    venue: {id: 1},
    source: {id: 1}
    };

//Test Proper Creation
frisby.create('Input EventA')
    .post(API_URL+'/event', EventA, { json: true })
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(201) // CREATED
        .expectJSON(EventA)
        .expectJSON('venue', {id: VenueA.id})
        .expectJSON('source', {id: ThirdPartyA.id})
        .expectJSONTypes({id: Number})
.toss();

frisby.create('Input EventB as PUT on VenueA')
    .put(API_URL+'/venue/1', {'events': {'add': EventB}}, { json: true })
    .expectStatus(200) //OK
    .expectJSON({id: 1})
    .inspectJSON()
    .expectJSON('events', [{name: EventA.name}, {name: EventB.name}])
.toss();
    

//Test Retrieval of created
frisby.create('Get EventA')
    .get(API_URL+'/event/1')
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(200) // OK
.toss();



//Test for bad syntax
frisby.create('Input Gibberish Event')
    .post(API_URL+'/event', {lat: "abc"}, { json: true })
    .expectStatus(400)  // BAD SYNTAX
.toss();

EventPageA = {
    url: 'http://www.EventPageA.com',
    event_id: 1,
    third_party_id: 1};
EventPageB = {
    url: 'http://www.EventPageB.com',
    third_party: {id: 2},
    event: {id: 1}};

//Test Proper Creation
frisby.create('Input EventPageA')
    .post(API_URL+'/event_page', EventPageA, { json: true })
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(201) // CREATED
        .expectJSON(EventPageA)
        .expectJSONTypes({id: Number})
        .expectJSON('event', {id: EventA.id})
        .expectJSON('third_party', {id: ThirdPartyA.id})
.toss();

frisby.create('Input EventPageB as PUT on EventA')
    .put(API_URL+'/event/1', {'pages': {'add': EventPageB}}, { json: true })
    .expectStatus(200) //OK
    .expectJSON({'id': 1})
    .expectJSON('pages', [{url: EventPageA.url}, {url: EventPageB.url}])
.toss();
    

//Test Retrieval of created
frisby.create('Get EventPageA')
    .get(API_URL+'/event_page/1')
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(200) // OK
        .expectJSON(EventPageA)
.toss();

//Test Refusal of duplicate Names
frisby.create('Double Input EventPageA')
    .post(API_URL+'/event_page', EventPageA, { json: true })
    .expectStatus(400)  // CONFLICT
.toss();

//Test for bad syntax
frisby.create('Input Gibberish EventPage')
    .post(API_URL+'/event_page', { lat: "abc" }, { json: true })
    .expectStatus(400)  // BAD SYNTAX
.toss();

ArtistA = {
    name: 'ArtistA',
    source_id: 1
    };
ArtistB = {
    name: 'ArtistB',
    source_id: 1
    };

//Test Proper Creation
frisby.create('Input ArtistA')
    .post(API_URL+'/artist', ArtistA, { json: true })
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(201) // CREATED
        .expectJSON(ArtistA)
        .expectJSONTypes({id: Number})
.toss();

frisby.create('Input ArtistB')
    .post(API_URL+'/artist', ArtistB, { json: true })
        .expectStatus(201) // CREATED
.toss();

    

//Test Retrieval of created
frisby.create('Get ArtistA')
    .get(API_URL+'/artist/1')
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(200) // OK
.toss();



//Test for bad syntax
frisby.create('Input Gibberish Artist')
    .post(API_URL+'/artist', {lat: "abc"}, { json: true })
    .expectStatus(400)  // BAD SYNTAX
.toss();

ArtistPageA = {
    url: 'http://www.ArtistPageA.com',
    artist_id: 1,
    third_party_id: 1};
ArtistPageB = {
    url: 'http://www.ArtistPageB.com',
    artist: {id: 1},
    third_party: {id: 2}};

//Test Proper Creation
frisby.create('Input ArtistPageA')
    .post(API_URL+'/artist_page', ArtistPageA, { json: true })
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(201) // CREATED
        .expectJSON(ArtistPageA)
        .expectJSONTypes({id: Number})
        .expectJSON('artist', {name: ArtistA.name})
        .expectJSON('third_party', {url: ThirdPartyA.url})
.toss();

frisby.create('Input ArtistPageB as PUT on ArtistA')
    .put(API_URL+'/artist/1', {'pages': {'add': ArtistPageB}}, { json: true })
    .expectStatus(200) //OK
    .expectJSON({'id': 1})
    .expectJSON('pages', [{url: ArtistPageA.url}, {url: ArtistPageB.url}])
.toss();
    

//Test Retrieval of created
frisby.create('Get ArtistPageA')
    .get(API_URL+'/artist_page/1')
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(200) // OK
        .expectJSON(ArtistPageA)
.toss();

//Test Refusal of duplicate Names
frisby.create('Double Input ArtistPageA')
    .post(API_URL+'/artist_page', ArtistPageA, { json: true })
    .expectStatus(400)  // CONFLICT
.toss();

//Test for bad syntax
frisby.create('Input Gibberish ArtistPageA')
    .post(API_URL+'/artist_page', { lat: "abc" }, { json: true })
    .expectStatus(400)  // BAD SYNTAX
.toss();


PerformanceA = {
    name: 'PerformanceA',
    event_id: 1,
    artist_id: 1,
    kind_id: 1};
PerformanceB = {
    name: 'PerformanceB',
    artist_id: 1,
    kind_id: 1
    };

//Entering objects doesn't work for this PUT why?
// PerformanceC = {
//     name: 'PerformanceC',
//     event: {id: 1}, 
//     kind: {id: 2}
//     };
PerformanceC = {
    name: 'PerformanceC',
    event_id: 1, 
    kind_id: 2
    };


//Test Proper Creation
frisby.create('Input PerformanceA')
    .post(API_URL+'/performance', PerformanceA, { json: true })
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(201) // CREATED
        .expectJSON(PerformanceA)
        .expectJSONTypes({id: Number})
.toss();

frisby.create('Input PerformanceB as PUT on EventA')
    .put(API_URL+'/event/1', {'performances': {'add': PerformanceB}}, { json: true })
    .expectStatus(200) //OK
    .expectJSON({'id': 1})
    .expectJSON('performances', [{name: PerformanceA.name}, {name: PerformanceB.name}])
.toss();

frisby.create('Input PerformanceC as PUT on ArtistA')
    .put(API_URL+'/artist/1', {'performances': {'add': PerformanceC}}, { json: true })
    .expectStatus(200) //OK
    .expectJSON({'id': 1})
    .expectJSON('performances', [{name: PerformanceA.name}, {name: PerformanceB.name}, {name: PerformanceC.name}])
.toss();

    

//Test Retrieval of created
frisby.create('Get PerformanceA')
    .get(API_URL+'/performance/1')
        .expectHeaderContains('Content-Type', 'json')
        .expectStatus(200) // OK
.toss();

//Test for bad syntax
frisby.create('Input Gibberish Performance')
    .post(API_URL+'/performance', {lat: "abc"}, { json: true })
    .expectStatus(400)  // BAD SYNTAX
.toss();