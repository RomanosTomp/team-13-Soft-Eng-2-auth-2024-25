//required consts for proper testings

const test = require('ava');
const DefaultServiceCitizens = require('../service/DefaultServiceCitizens.js');
const DefaultController = require('../controllers/Default.js');
const utils = require('../utils/writer.js');
const got = require('got');

////////////////////////////////////////////
// UI Tests for Expense Management
////////////////////////////////////////////

//Test for valid expense data
test('POST /expense - should return 200 for valid expense data', async t => {
  const payload = {
    userID: 123,
    date: '2024-12-14',
    product: 'Business Trip',
    price: 100,
    company: 'TravelCorp'
  };

  const response = await got.post('http://localhost:8080/expense', { //path
    json: payload,
    responseType: 'json',
  });

  t.is(response.statusCode, 200); //response code
  t.deepEqual(response.body, payload);
});

//Test for invalid missing expense data
test('POST /expense - should return 400 for missing expense data', async t => {
  const invalidPayload = { userID: 123 }; // Missing required keys

  const error = await t.throwsAsync(() =>
    got.post('http://localhost:8080/expense', { //path
      json: invalidPayload,
      responseType: 'json',
    })
  );

  t.is(error.response.statusCode, 400); //response code
  t.is(error.response.body.message, 'Invalid expense data');
});


//Test for valid expense query parameters and return a list of expenses
test('GET /expense - should return a list of expenses for a valid user', async t => {
  const params = {
    searchParams: {
      userID: 123,
      date: '2024-12-14',
      company: 'TravelCorp'
    },
    responseType: 'json',
  };

  const response = await got('http://localhost:8080/expense', params); //path

  t.is(response.statusCode, 200); //response code
  t.true(Array.isArray(response.body), 'Response should be an array');
  t.true(response.body.length > 0, 'Response should not be empty');
});

//test for invalid expense query parameters
test('GET /expense - should return 400 for missing query parameters', async t => {
  const params = {
    searchParams: {}, // No query parameters provided
    responseType: 'json',
  };

  const error = await t.throwsAsync(() =>
    got('http://localhost:8080/expense', params) //path
  );

  t.is(error.response.statusCode, 400); //response code
  t.is(error.response.body.message, 'Invalid expense query parameters');
});

///////////////////////////////////////////////
// End
///////////////////////////////////////////////

// Tests for PUT citizen username
//Tests for valid citizen username
test('PUT /citizen/{username} - should return 200 for valid data', async t => {
  const username = 'john_doe';
  const payload = { 
      username: 'john_doe',
      areaOfResidence: 'Downtown',
      age: 30 
  };

  const response = await got.put(`http://localhost:8080/citizen/${username}`, {  //path
      json: payload, 
      responseType: 'json' 
  });

  t.is(response.statusCode, 200); //response code
  t.deepEqual(response.body, payload);
});

//Tests for invalid citizen username
test('PUT /citizen/{username} - should return 400 for invalid data', async t => {
  const username = 'john_doe';
  const payload = { age: 30 }; // Missing required fields

  const error = await t.throwsAsync(() => got.put(`http://localhost:8080/citizen/${username}`, { //path
      json: payload, 
      responseType: 'json' 
  }));

  t.is(error.response.statusCode, 400); //response code
  t.is(error.response.body.message, 'Invalid body');
});

//Tests for valid citizen username

//Tests for valid citizen username and return a list of citizens
test('GET /citizen/{username} - should return 200 for valid username', async t => {
  const username = 'john_doe';

  const response = await got.get(`http://localhost:8080/citizen/${username}`, { //path
    responseType: 'json'
  });

  t.is(response.statusCode, 200); //response code
  t.truthy(response.body.username);
});


//missing test for invalid get citizen/{username} with code 400
test('GET /citizen/{username} - should return 400 for wrong data', async t => {
  let username = null;
  const payload = {
    // Example of a payload structure
    name: null
  };
  const error = await t.throwsAsync(() => got.put(`http://localhost:8080/citizen/${username}`, { //path
    json: payload,
    responseType: 'json'
  }));

  t.is(error.response.statusCode, 400); //response code
  t.is(error.response.body.message, 'Invalid body');
});