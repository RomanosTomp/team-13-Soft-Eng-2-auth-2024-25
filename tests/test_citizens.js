const test = require('ava');
const DefaultServiceCitizens = require('../service/DefaultServiceCitizens.js');
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

//testing begins here
//TESTS FOR CITIZENS
//Tests for the addExpense service

//Test for successful addition of expense
test('addExpense should resolve with the correct response', async t => {
    const validBody = {
        date: "2024-10-01",
        product: "Coffee",
        price: 4.50,
        company: "Coffee Shop",
        userID: 1
    };
    const response = await DefaultServiceCitizens.addExpense(validBody);
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
  
    const error1 = await t.throwsAsync(() => DefaultServiceCitizens.addExpense(missingDataTypes));
    t.is(error1.message, 'Invalid expense data');
  
    const error2 = await t.throwsAsync(() => DefaultServiceCitizens.addExpense(emptyValues));
    t.is(error2.message, 'Invalid expense data');
});

//Test for getExpense service
test('getExpense should return a list with expenses', async t => {
    const userID = 3;
    const date = "2024-10-01";
    const company = "Coffee Shop";
    
    try{
        const result = await DefaultServiceCitizens.getExpense(userID, date, company);
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
        const result = await DefaultServiceCitizens.getCitizen(username);
        t.true("areaOfResidence" in result && "age" in result && "username" in result)
    } catch(error) {
        t.fail('getCitizen gave error: ' + error.message)
    }
})

//Error handling for invalid username in GetCitizen service
test('getCitizen should throw an error for invalid username', async t => {
    const username = "";

    // Use `t.throwsAsync` to check that the promise is rejected
    const error = await t.throwsAsync(() => DefaultServiceCitizens.getCitizen(username));
    t.is(error.message, 'Invalid username');  // Ensure the error message matches
});
//Test for getCitizens service for successful retrieval of citizens
test('getCitizens should return a valid user profile', async t => {
    const age = 0;
    const area = "areaOfResidence";

    try {
        const result = await DefaultServiceCitizens.getCitizens(age, area);
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
    const error = await t.throwsAsync(() => DefaultServiceCitizens.getCitizens(age, area));
    t.is(error.message, 'Invalid inputs');  // Ensure the error message matches
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
        const result = await DefaultServiceCitizens.editCitizen(body, username);
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
    const error = await t.throwsAsync(() => DefaultServiceCitizens.editCitizen(body, username));
    t.is(error.message, 'Invalid username');  // Ensure the error message matches
});

//Test for editCitizen service for invalid body
test('editCitizen should throw an error for invalid body', async t => {
    const body = {};
    const username = "TestUser";

    // Use `t.throwsAsync` to check that the promise is rejected
    const error = await t.throwsAsync(() => DefaultServiceCitizens.editCitizen(body, username));
    t.is(error.message, 'Invalid body');  // Ensure the error message matches
});