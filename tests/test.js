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

