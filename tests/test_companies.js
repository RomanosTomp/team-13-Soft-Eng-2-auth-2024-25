const test = require('ava');
const DefaultServiceCompanies = require('../service/DefaultServiceCompanies.js');
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

//actual testing begins here

//Test for getCompany service for successful retrieval of company profile
test('getCompany should return a valid company profile', async t => {
    const username = "TestCompany";

    try {
        const result = await DefaultServiceCompanies.getCompany(username);
        t.true("price" in result && "logo" in result && 
            "location" in result && "menu" in result && "username" in result)
    } catch(error) {
        t.fail('getCompany gave error: ' + error.message)
    }
})

//Test for getCompany service for invalid company name
test('getCompany should throw an error for invalid company name', async t => {
    const username = "";

    // Use `t.throwsAsync` to check that the promise is rejected
    const error = await t.throwsAsync(() => DefaultServiceCompanies.getCompany(username));
    t.is(error.message, 'Invalid username');  // Ensure the error message matches
});

//Test for editCompany service for successful editing of company profile
test('editCompany should return a valid company profile', async t => {
    const body = {
        price: 0.1,
        logo: {},
        location: "location",
        menu: {},
        username: "TestCompany"
    };
    const username = "TestCompany";

    try {
        const result = await DefaultServiceCompanies.editCompany(body, username);
        t.true("price" in result && "logo" in result && 
            "location" in result && "menu" in result && "username" in result)
    } catch(error) {
        t.fail('editCompany gave error: ' + error.message)
    }
})

//Test for editCompany service for invalid company name
test('editCompany should throw an error for invalid company name', async t => {
    const body = {
        price: 0.1,
        logo: {},
        location: "location",
        menu: {},
        username: "TestCompany"
    };
    const username = "";

    // Use `t.throwsAsync` to check that the promise is rejected
    const error = await t.throwsAsync(() => DefaultServiceCompanies.editCompany(body, username));
    t.is(error.message, 'Invalid username');  // Ensure the error message matches
});
 
//Test for editCompany service for invalid body
test('editCompany should throw an error for invalid body', async t => {
    const body = {};
    const username = "TestCompany";

    // Use `t.throwsAsync` to check that the promise is rejected
    const error = await t.throwsAsync(() => DefaultServiceCompanies.editCompany(body, username));
    t.is(error.message, 'Invalid body');  // Ensure the error message matches
});

//Test searchCompanies service should return a list of companies for a valid username
test('searchCompanies should return a list of companies for a valid username', async t => {
	const username = "validCompany";

	try {
		const result = await DefaultServiceCompanies.searchCompanies(username);
		t.true(Array.isArray(result), "Result should be an array");
		t.true(result.length > 0, "Result should not be empty");
		t.true(result.every(company => "price" in company && "logo" in company && 
			"location" in company && "menu" in company && "username" in company), 
			"Each company should have the required properties"
		);
	} catch(error) {
		t.fail('searchCompanies gave an error: ' + error.message);
	}
});

//Test searchCompanies service should return an empty array for a non-existing username
test('searchCompanies should return an empty array for a non-existing username', async t => {
	const username = "NonExistingCompany";

	const result = await DefaultServiceCompanies.searchCompanies(username);
	t.true(Array.isArray(result), "Result should be an array");
	t.is(result.length, 0, "Result should be an empty array for non-existing username");
});

//Test searchCompanies service should throw an error for an invalid username
test('searchCompanies should throw an error for an invalid username', async (t) => {
	const invalidUsernames = [null, '', undefined];
  
	for (const username of invalidUsernames) {
	  try {
		await DefaultServiceCompanies.searchCompanies(username);
		t.fail(`Expected an error for input "${username}" but none was thrown`);
	  } catch (error) {
		t.is(
		  error.message,
		  'Invalid username',
		  `Expected "Invalid username" for input "${username}"`
		);
	  }
	}
  });
