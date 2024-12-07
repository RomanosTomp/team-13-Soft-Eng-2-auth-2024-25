const http = require('http');
const test = require('ava');
const got = require('got');
const DefaultService = require('../service/DefaultService.js');
const DefaultController = require('../controllers/Default.js');
const {getStatistics} = require('../service/DefaultService.js');
const { stat } = require('fs');
const utils = require('../utils/writer.js');
const sinon = require('sinon');


test.beforeEach(t => {
	t.context.writeJsonStub = (res, payload) => {
		t.context.response = { res, payload };
	};
	utils.writeJson = t.context.writeJsonStub;
});

//expected keys response should have
const statisticskey = {
	statisticsfile: "string"
}

test('foo', t => {
	t.pass();
});

test('addExpense should call DefaultService.addExpense and return expense', async t => {
	const body = {
		date: "2024-10-01",
		product: "Coffee",
		price: 4.50,
		company: "Coffee Shop",
		userID: 1
	};
	const req = {};
	const res = {}; //Mocj response object
	const next = sinon.spy(); //Mock next as spy

	//Mock DefaultService.addExpense to return body
	sinon.stub(DefaultService, 'addExpense').resolves(body);

	const writeJsonMock = sinon.stub(utils, 'writeJson').callsFake((resObj, response) => {
		resObj.payload = response;
	});	
	
	await DefaultController.addExpense(req, res, next, body);

	t.deepEqual( res.payload, body );

	DefaultService.addExpense.restore();
	utils.writeJson.restore();
});

test('addExpense should throw an error for invalid data', async t => {
	const body = {
		date: "2024-10-01",
		product: "Coffee",
		company: "Coffee Shop",
	};

	// Use `t.throwsAsync` to check that the promise is rejected
	const error = await t.throwsAsync(() => DefaultService.addExpense(body));
	t.is(error.message, 'Invalid expense data');  // Ensure the error message matches
});

test('getExpense should return a list with expenses', async t => {
	const userID = 3;
	const date = "2024-10-01";
	const company = "Coffee Shop";
	
	try{
		const result = await DefaultService.getExpense(userID, date, company);
		t.true(Array.isArray(result));
	} catch(error){
		t.fail('getExpense gave error: ${error.message}');
	}
})


 

////////////////////////////////////////////////////////////////////////////////
//THOMAS' TESTS - User Management
///////////////////////////////////////////////////////////////////////////////


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




test('loginUser should resolve with correct message when called with valid data', async t => {
	const validLogin = {
		email: "john.doe@example.com",
		password: "password123"
	};

	const response = await DefaultService.loginUser(validLogin);
	t.is(response.message, 'Login successful');
});


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


test('retrievePassword should resolve with login info when called with valid email', async t => {
	const validEmail = {
		email: "john.doe@example.com"
	};

	const response = await DefaultService.retrievePassword(validEmail);
	t.is(response.email, validEmail.email);
	t.is(response.password, 'password123');
});


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


///////////////////////////////////////////////////////////////////////////////
//end of Thomas' tests
///////////////////////////////////////////////////////////////////////////////
