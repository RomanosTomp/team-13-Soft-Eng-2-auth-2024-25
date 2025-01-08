//Import required modules and utils
const test = require('ava');
const DefaultService = require('../service/DefaultService.js');
const DefaultController = require('../controllers/Default.js');
const {getStatistics} = require('../service/DefaultService.js');
const { stat } = require('fs');
const utils = require('../utils/writer.js');
const sinon = require('sinon');

//Stub for siumulating response writing during testing
test.beforeEach(t => {
	t.context.writeJsonStub = (res, payload) => {
		res.payload = payload;
	};
});

//expected keys response should have
const statisticskey = {
	statisticsfile: "string"
}

//Basic test to confirm AVA is working
test('foo', t => {
	t.pass();
});
//TESTS FOR DEFAULT SERVICES
//Test for createUser service for successful creation of user
test('createUser should resolve with the correct response when called with valid data', async t => {
	const validBody = {
		username: "john_doe",
   		password: "password123",
    		userType: 1,
    		userID: 123,
    		email: "john.doe@example.com"
	};

  	const response = await DefaultService.createUser(validBody);
  	t.deepEqual(response, validBody);
});


//Test for createUser service for invalid data
test('createUser should reject with an error when called with invalid data', async t => {
  	const missingDataTypes = {
    		username: "john_doe",
    		password: "password123",
    		userType: 1,  // userType is correct, but the others are missing the correct data types
  	};

  	const emptyValues = {
    		username: "",
    		password: "",
    		userType: "",  // Empty values for fields
    		userID: "",
    		email: ""
  	};

  	const error1 = await t.throwsAsync(() => DefaultService.createUser(missingDataTypes));
  	t.is(error1.message, 'Invalid user data');

  	const error2 = await t.throwsAsync(() => DefaultService.createUser(emptyValues));
  	t.is(error2.message, 'Invalid user data');
});



//Test for loginUser service for successful login
test('loginUser should resolve with correct message when called with valid data', async t => {
	const validLogin = {
		email: "john.doe@example.com",
		password: "password123"
	};

	const response = await DefaultService.loginUser(validLogin);
	t.is(response.message, 'Login successful');
});

//Test for loginUser service for invalid data
test('loginUser should reject with error message when called with invalid data', async t => {
	const missingValue = {
		email: "john.doe@example.com"
	};

	const emptyValues = {
		email: "",
		password: ""
	};

	const error1 = await t.throwsAsync(() => DefaultService.loginUser(missingValue));
	t.is(error1.message, 'Missing email or password');

	const error2 = await t.throwsAsync(() => DefaultService.loginUser(emptyValues));
	t.is(error2.message, 'Missing email or password');
});

//Test for retrievePassword service for successful retrieval of password
test('retrievePassword should resolve with login info when called with valid email', async t => {
	const validEmail = {
		email: "john.doe@example.com"
	};

	const response = await DefaultService.retrievePassword(validEmail);
	t.is(response.email, validEmail.email);
	t.is(response.password, 'password123');
});

//Test for retrievePassword service for invalid email
test('retrievePassword should reject with error message when called without valid email', async t => {
	const missingEmail = {};
	const emptyEmail = {
		email: ""
	};

	const error1 = await t.throwsAsync(() => DefaultService.retrievePassword(missingEmail));
	t.is(error1.message, 'Missing email');

	const error2 = await t.throwsAsync(() => DefaultService.retrievePassword(emptyEmail));
	t.is(error2.message, 'Missing email');
});
  


