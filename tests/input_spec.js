var frisby = require('frisby');
var API_URL = 'http://localhost:5000/api'
frisby.create('Input PerformanceKind')
    .post(API_URL+'/performance_kind', {name: 'eee'}, { json: true })
    .expectHeaderContains('Content-Type', 'json')
    .expectStatus(201)
    .expectJSON({name: 'eee'})
    .expectJSONTypes({id: Number, performances: Array})
    .toss();
