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









