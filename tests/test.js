const test = require('ava');
const DefaultService = require('../service/DefaultService.js');
const DefaultController = require('../controllers/Default.js');
const {getStatistics} = require('../service/DefaultService.js');
const { stat } = require('fs');
const utils = require('../utils/writer.js');
const sinon = require('sinon');


test.beforeEach(t => {
	t.context.writeJsonStub = (res, payload) => {
		res.payload = payload;
	};
});

//expected keys response should have
const statisticskey = {
	statisticsfile: "string"
}

test('foo', t => {
	t.pass();
});

test('addExpense should resolve with the correct response', async t => {
	const validBody = {
		date: "2024-10-01",
		product: "Coffee",
		price: 4.50,
		company: "Coffee Shop",
		userID: 1
	};
	const response = await DefaultService.addExpense(validBody);
	t.deepEqual(response, validBody);
});

test('addExpense should throw an error for invalid data', async t => {
	const missingDataTypes = {
		  date: "11-12-2024",
		  product: "tennis ball",
	};
  
	const emptyValues = {
		  date: "",
		  product: "",
		  price: "",  // Empty values for fields
		  company: "",
		  userID: ""
	};
  
	const error1 = await t.throwsAsync(() => DefaultService.addExpense(missingDataTypes));
	t.is(error1.message, 'Invalid expense data');
  
	const error2 = await t.throwsAsync(() => DefaultService.addExpense(emptyValues));
	t.is(error2.message, 'Invalid expense data');
});


test('getExpense should return a list with expenses', async t => {
	const userID = 3;
	const date = "2024-10-01";
	const company = "Coffee Shop";
	
	try{
		const result = await DefaultService.getExpense(userID, date, company);
		t.true(Array.isArray(result));
	} catch(error){
		t.fail('editCitizen gave error: ' + error.message)
	}
})

test('getCitizen should return a valid user profile', async t => {
	const username = "TestUser";

	try {
		const result = await DefaultService.getCitizen(username);
		t.true("areaOfResidence" in result && "age" in result && "username" in result)
	} catch(error) {
		t.fail('getCitizen gave error: ' + error.message)
	}
})

test('getCitizen should throw an error for invalid username', async t => {
	const username = "";

	// Use `t.throwsAsync` to check that the promise is rejected
	const error = await t.throwsAsync(() => DefaultService.getCitizen(username));
	t.is(error.message, 'Invalid username');  // Ensure the error message matches
});

test('getCompany should return a valid company profile', async t => {
	const username = "TestCompany";

	try {
		const result = await DefaultService.getCompany(username);
		t.true("price" in result && "logo" in result && 
			"location" in result && "menu" in result && "username" in result)
	} catch(error) {
		t.fail('editCompany gave error: ' + error.message)
	}
})

test('getCompany should throw an error for invalid company name', async t => {
	const username = "";

	// Use `t.throwsAsync` to check that the promise is rejected
	const error = await t.throwsAsync(() => DefaultService.getCompany(username));
	t.is(error.message, 'Invalid username');  // Ensure the error message matches
});

test('editCitizen should return a valid user profile', async t => {
	const body = {};
	const username = "TestUser";

	try {
		const result = await DefaultService.editCitizen(body, username);
		t.true("areaOfResidence" in result && "age" in result && "username" in result)
	} catch(error) {
		t.fail('editCitizen gave error: ' + error.message)
	}
})

test('editCitizen should throw an error for invalid username', async t => {
	const body = {};
	const username = "";

	// Use `t.throwsAsync` to check that the promise is rejected
	const error = await t.throwsAsync(() => DefaultService.editCitizen(body, username));
	t.is(error.message, 'Invalid username');  // Ensure the error message matches
});

test('editCompany should return a valid company profile', async t => {
	const body = {};
	const username = "TestCompany";

	try {
		const result = await DefaultService.editCompany(body, username);
		t.true("price" in result && "logo" in result && 
			"location" in result && "menu" in result && "username" in result)
	} catch(error) {
		t.fail('editCompany gave error: ' + error.message)
	}
})

test('editCompany should throw an error for invalid company name', async t => {
	const body = {};
	const username = "";

	// Use `t.throwsAsync` to check that the promise is rejected
	const error = await t.throwsAsync(() => DefaultService.editCompany(body, username));
	t.is(error.message, 'Invalid username');  // Ensure the error message matches
});
