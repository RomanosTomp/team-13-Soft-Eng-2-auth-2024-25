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

//Tests for the addEWxpense service

//Test for successful addition of expense
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
//Test for failed addition of expense with invalid data
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

//Test for getExpense service
test('getExpense should return a list with expenses', async t => {
	const userID = 3;
	const date = "2024-10-01";
	const company = "Coffee Shop";
	
	try{
		const result = await DefaultService.getExpense(userID, date, company);
		t.true(Array.isArray(result));
	} catch(error){
		t.fail('getExpense gave error: ' + error.message)
	}
})

//Test fot getCitizen service

//Successful retrieval of citizen's profile
test('getCitizen should return a valid user profile', async t => {
	const username = "TestUser";

	try {
		const result = await DefaultService.getCitizen(username);
		t.true("areaOfResidence" in result && "age" in result && "username" in result)
	} catch(error) {
		t.fail('getCitizen gave error: ' + error.message)
	}
})

//Error handling for invalid username in GetCitizen service
test('getCitizen should throw an error for invalid username', async t => {
	const username = "";

	// Use `t.throwsAsync` to check that the promise is rejected
	const error = await t.throwsAsync(() => DefaultService.getCitizen(username));
	t.is(error.message, 'Invalid username');  // Ensure the error message matches
});
//Test for getCitizens service for successful retrieval of citizens
test('getCitizens should return a valid user profile', async t => {
	const age = 0;
	const area = "areaOfResidence";

	try {
		const result = await DefaultService.getCitizens(age, area);
		let success = true;
		for (let res of result) {
			success = success && ("areaOfResidence" in res && "age" in res && "username" in res);
		}
		t.true(success)
	} catch(error) {
		t.fail('getCitizens gave error: ' + error.message)
	}
})

//Test for getCitizens service for invalid username
test('getCitizens should throw an error for invalid username', async t => {
	const age = null;
	const area = "";

	// Use `t.throwsAsync` to check that the promise is rejected
	const error = await t.throwsAsync(() => DefaultService.getCitizens(age, area));
	t.is(error.message, 'Invalid inputs');  // Ensure the error message matches
});

//Test for getCompany service for successful retrieval of company profile
test('getCompany should return a valid company profile', async t => {
	const username = "TestCompany";

	try {
		const result = await DefaultService.getCompany(username);
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
	const error = await t.throwsAsync(() => DefaultService.getCompany(username));
	t.is(error.message, 'Invalid username');  // Ensure the error message matches
});

//Test fot editCitizen service for successful editing of citizen profile
test('editCitizen should return a valid user profile', async t => {
	const body = {
		areaOfResidence: "areaOfResidence",
		age: 0,
		username: "TestUser"
	};
	const username = "TestUser";

	try {
		const result = await DefaultService.editCitizen(body, username);
		t.true("areaOfResidence" in result && "age" in result && "username" in result)
	} catch(error) {
		t.fail('editCitizen gave error: ' + error.message)
	}
})

//Test for editCitizen service for invalid username
test('editCitizen should throw an error for invalid username', async t => {
	const body = {
		areaOfResidence: "areaOfResidence",
		age: 0,
		username: "username"
	};
	const username = "";

	// Use `t.throwsAsync` to check that the promise is rejected
	const error = await t.throwsAsync(() => DefaultService.editCitizen(body, username));
	t.is(error.message, 'Invalid username');  // Ensure the error message matches
});

//Test for editCitizen service for invalid body
test('editCitizen should throw an error for invalid body', async t => {
	const body = {};
	const username = "TestUser";

	// Use `t.throwsAsync` to check that the promise is rejected
	const error = await t.throwsAsync(() => DefaultService.editCitizen(body, username));
	t.is(error.message, 'Invalid body');  // Ensure the error message matches
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
		const result = await DefaultService.editCompany(body, username);
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
	const error = await t.throwsAsync(() => DefaultService.editCompany(body, username));
	t.is(error.message, 'Invalid username');  // Ensure the error message matches
});
 
//Test for editCompany service for invalid body
test('editCompany should throw an error for invalid body', async t => {
	const body = {};
	const username = "TestCompany";

	// Use `t.throwsAsync` to check that the promise is rejected
	const error = await t.throwsAsync(() => DefaultService.editCompany(body, username));
	t.is(error.message, 'Invalid body');  // Ensure the error message matches
});

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


///JIM///
//Test searchCompanies service should return a list of companies for a valid username
test('searchCompanies should return a list of companies for a valid username', async t => {
	const username = "validCompany";

	try {
		const result = await DefaultService.searchCompanies(username);
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

	const result = await DefaultService.searchCompanies(username);
	t.true(Array.isArray(result), "Result should be an array");
	t.is(result.length, 0, "Result should be an empty array for non-existing username");
});

//Test searchCompanies service should throw an error for an invalid username
test('searchCompanies should throw an error for an invalid username', async (t) => {
	const invalidUsernames = [null, '', undefined];
  
	for (const username of invalidUsernames) {
	  try {
		await DefaultService.searchCompanies(username);
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
  


