const test = require('ava');
const DefaultService = require('../service/DefaultService.js');
const DefaultController = require('../controllers/Default.js');
const utils = require('../utils/writer.js');
const got = require('got');




/////////////////////////////////////////
//UI Tests for User Registration & Login
/////////////////////////////////////////

test('POST /user/ - should return 200 for valid user data', async t=> {
	const payload = {
	   username: 'john_doe',
    	   password: 'password123',
    	   userType: 1,
    	   userID: 123,
    	   email: 'john.doe@example.com',
	};

	const response = await got.post('http://localhost:8080/user/', {
	   json: payload,
	   responseType: 'json',
	});

	t.is(response.statusCode, 200);
	t.deepEqual(response.body, payload);
});


test('POST /user/ - should return 400 for invalid user data', async t => {
  const invalidPayload = { username: 'john_doe' }; // Missing required keys

  const error = await t.throwsAsync(() =>
    got.post(`http://localhost:8080/user/`, {
      json: invalidPayload,
      responseType: 'json',
    })
  );

  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'Invalid user data');
});





test('PUT /user/login - should return 200 for valid credentials', async t => {
  const payload = {
    email: 'john.doe@example.com',
    password: 'password123',
  };

  const response = await got.put(`http://localhost:8080/user/login`, {
    json: payload,
    responseType: 'json',
  });

  t.is(response.statusCode, 200);
  t.is(response.body.message, 'Login successful');
});

test('PUT /user/login - should return 400 for missing credentials', async t => {
  const invalidPayload = { email: '' };

  const error = await t.throwsAsync(() =>
    got.put(`http://localhost:8080/user/login`, {
      json: invalidPayload,
      responseType: 'json',
    })
  );

  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'Missing email or password');
});



///////////////////////////////////////////////
//end
///////////////////////////////////////////////

////////////////////////////////////////////
// UI Tests for Expense Management
////////////////////////////////////////////

test('POST /expense - should return 200 for valid expense data', async t => {
  const payload = {
    userID: 123,
    date: '2024-12-14',
    product: 'Business Trip',
    price: 100,
    company: 'TravelCorp'
  };

  const response = await got.post('http://localhost:8080/expense', {
    json: payload,
    responseType: 'json',
  });

  t.is(response.statusCode, 200);
  t.deepEqual(response.body, payload);
});

test('POST /expense - should return 400 for missing expense data', async t => {
  const invalidPayload = { userID: 123 }; // Missing required keys

  const error = await t.throwsAsync(() =>
    got.post('http://localhost:8080/expense', {
      json: invalidPayload,
      responseType: 'json',
    })
  );

  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'Invalid expense data');
});



test('GET /expense - should return a list of expenses for a valid user', async t => {
  const params = {
    searchParams: {
      userID: 123,
      date: '2024-12-14',
      company: 'TravelCorp'
    },
    responseType: 'json',
  };

  const response = await got('http://localhost:8080/expense', params);

  t.is(response.statusCode, 200);
  t.true(Array.isArray(response.body), 'Response should be an array');
  t.true(response.body.length > 0, 'Response should not be empty');
});

test('GET /expense - should return 400 for missing query parameters', async t => {
  const params = {
    searchParams: {}, // No query parameters provided
    responseType: 'json',
  };

  const error = await t.throwsAsync(() =>
    got('http://localhost:8080/expense', params)
  );

  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'Invalid expense query parameters');
});











///////////////////////////////////////////////
// End
///////////////////////////////////////////////









