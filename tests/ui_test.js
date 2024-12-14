const test = require('ava');
const nock = require('nock');
const got = require('got');

// Define the base URL for the mock server
const BASE_URL = 'http://localhost:8080';

/**
 * Tests for POST /user/
 */

// Test: Valid user data should return 200
test('POST /user/ - should return 200 for valid user data', async t => {
    const validUserData = {
        username: 'john_doe',
        password: 'password123',
        userType: 1,
        userID: 123,
        email: 'john.doe@example.com'
    };

    nock(BASE_URL)
        .post('/user/', validUserData)
        .reply(200, validUserData);

    const response = await got.post(`${BASE_URL}/user/`, {
        json: validUserData,
        responseType: 'json'
    });

    t.is(response.statusCode, 200);
    t.deepEqual(response.body, validUserData);
});

// Test: Invalid user data should return 400
test('POST /user/ - should return 400 for invalid user data', async t => {
    const invalidUserData1 = {}; // Missing all required fields
    const invalidUserData2 = {
        username: '',
        password: '',
        userType: null,
        userID: '',
        email: ''
    };

    nock(BASE_URL)
        .post('/user/', invalidUserData1)
        .reply(400, { message: 'Invalid user data' });

    nock(BASE_URL)
        .post('/user/', invalidUserData2)
        .reply(400, { message: 'Invalid user data' });

    const error1 = await t.throwsAsync(() =>
        got.post(`${BASE_URL}/user/`, {
            json: invalidUserData1,
            responseType: 'json'
        })
    );
    t.is(error1.response.statusCode, 400);
    t.is(error1.response.body.message, 'Invalid user data');

    const error2 = await t.throwsAsync(() =>
        got.post(`${BASE_URL}/user/`, {
            json: invalidUserData2,
            responseType: 'json'
        })
    );
    t.is(error2.response.statusCode, 400);
    t.is(error2.response.body.message, 'Invalid user data');
});

/**
 * Tests for PUT /user/login/
 */

// Test: Valid login credentials should return 200
test('PUT /user/login/ - should return 200 for valid credentials', async t => {
    const validLoginData = {
        email: 'john.doe@example.com',
        password: 'password123'
    };

    nock(BASE_URL)
        .put('/user/login/', validLoginData)
        .reply(200, { message: 'Login successful' });

    const response = await got.put(`${BASE_URL}/user/login/`, {
        json: validLoginData,
        responseType: 'json'
    });

    t.is(response.statusCode, 200);
    t.deepEqual(response.body, { message: 'Login successful' });
});

// Test: Missing or invalid credentials should return 400
test('PUT /user/login/ - should return 400 for missing or invalid credentials', async t => {
    const invalidLoginData1 = {}; // Missing both email and password
    const invalidLoginData2 = {
        email: '',
        password: ''
    };

    nock(BASE_URL)
        .put('/user/login/', invalidLoginData1)
        .reply(400, { message: 'Missing email or password' });

    nock(BASE_URL)
        .put('/user/login/', invalidLoginData2)
        .reply(400, { message: 'Missing email or password' });

    const error1 = await t.throwsAsync(() =>
        got.put(`${BASE_URL}/user/login/`, {
            json: invalidLoginData1,
            responseType: 'json'
        })
    );
    t.is(error1.response.statusCode, 400);
    t.is(error1.response.body.message, 'Missing email or password');

    const error2 = await t.throwsAsync(() =>
        got.put(`${BASE_URL}/user/login/`, {
            json: invalidLoginData2,
            responseType: 'json'
        })
    );
    t.is(error2.response.statusCode, 400);
    t.is(error2.response.body.message, 'Missing email or password');
});

