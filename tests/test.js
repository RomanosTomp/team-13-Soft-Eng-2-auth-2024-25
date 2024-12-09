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
		t.fail('getExpense gave error: ${error.message}');
	}
})

