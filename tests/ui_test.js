//required consts for proper testings

const test = require('ava');
const DefaultService = require('../service/DefaultService.js');
const DefaultServiceCitizens = require('../service/DefaultServiceCitizens.js');
const DefaultServiceCompanies = require('../service/DefaultServiceCompanies.js');
const DefaultController = require('../controllers/Default.js');
const utils = require('../utils/writer.js');
const got = require('got');




/////////////////////////////////////////
//UI Tests for User Registration & Login
/////////////////////////////////////////

//Test for valid user data
test('POST /user/ - should return 200 for valid user data', async t=> {
	const payload = {
	   username: 'john_doe',
    	   password: 'password123',
    	   userType: 1,
    	   userID: 123,
    	   email: 'john.doe@example.com',
	};

	const response = await got.post('http://localhost:8080/user/', { //path
	   json: payload,
	   responseType: 'json',
	});

	t.is(response.statusCode, 200); //response code
	t.deepEqual(response.body, payload);
});

//Test for invalid user data
test('POST /user/ - should return 400 for invalid user data', async t => {
  const invalidPayload = { username: 'john_doe' }; // Missing required keys

  const error = await t.throwsAsync(() =>
    got.post(`http://localhost:8080/user/`, { //path
      json: invalidPayload,
      responseType: 'json',
    })
  );

  t.is(error.response.statusCode, 400); //response code
  t.is(error.response.body.message, 'Invalid user data');
});




//Test for valid login credentials
test('PUT /user/login - should return 200 for valid credentials', async t => {
  const payload = {
    email: 'john.doe@example.com',
    password: 'password123',
  };

  const response = await got.put(`http://localhost:8080/user/login`, { //path
    json: payload,
    responseType: 'json',
  });

  t.is(response.statusCode, 200); //response code
  t.is(response.body.message, 'Login successful');
});

//Test for invalid login credentials
test('PUT /user/login - should return 400 for missing credentials', async t => {
  const invalidPayload = { email: '' };

  const error = await t.throwsAsync(() =>
    got.put(`http://localhost:8080/user/login`, { //path
      json: invalidPayload,
      responseType: 'json',
    })
  );

  t.is(error.response.statusCode, 400); //response code
  t.is(error.response.body.message, 'Missing email or password');
});

///////////////////////////////////////////////
//end
///////////////////////////////////////////////