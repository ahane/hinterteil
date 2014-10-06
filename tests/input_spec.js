var frisby = require('frisby');
var API_URL = 'http://localhost:5000/api'

regionA = {
    name: 'RegionA',
    country: 'CountryA',
    lat: 51.001, lon: 13.001};
regionB = {
        name: 'RegionB',
        country: 'CountryA',
        lat: 51.001, lon: 13.002};
frisby.create('Input RegionA')
    .post(API_URL+'/region', regionA, { json: true })
    .expectHeaderContains('Content-Type', 'json')
    .expectStatus(201)
    .expectJSON(regionA)
    .expectJSONTypes({id: Number})
    .toss();
frisby.create('Input RegionB')
    .post(API_URL+'/region', regionB, { json: true })
    .expectStatus(201)
    .toss();
