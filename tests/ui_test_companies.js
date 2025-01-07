const test = require('ava');
const DefaultServiceCompanies = require('../service/DefaultServiceCompanies.js');
const DefaultController = require('../controllers/Default.js');
const utils = require('../utils/writer.js');
const got = require('got');

// Tests for PUT /company/{username}

test('PUT /company/{username} - should return 200 for valid data', async t => {
  const username = 'tech_corp';
  const payload = {
    price: 100.5,
    logo: { url: 'logo.png' },
    location: 'Silicon Valley',
    menu: { items: ['Gadgets', 'Accessories'] },
    username: 'tech_corp'
  };

  const response = await got.put(`http://localhost:8080/company/${username}`, {
    json: payload,
    responseType: 'json'
  });

  t.is(response.statusCode, 200);
  t.deepEqual(response.body, payload);
});

test('PUT /company/{username} - should return 400 for invalid data', async t => {
  const username = 'tech_corp';
  const payload = { price: 100.5 }; // Missing required fields

  const error = await t.throwsAsync(() => got.put(`http://localhost:8080/company/${username}`, {
    json: payload,
    responseType: 'json'
  }));

  t.is(error.response.statusCode, 400);
  t.is(error.response.body.message, 'Invalid body');
});

//Tests for valid company username

test('GET /company/{username} - should return 200 for valid username', async t => {
    const username = 'tech_corp';
  
    const response = await got.get(`http://localhost:8080/company/${username}`, {
      responseType: 'json'
    });
  
    t.is(response.statusCode, 200);
    t.truthy(response.body.username);
  });
  
  //missing test for invalid company/{username}
  
  test('GET /company/{username} - should return 400 for wrong data', async t => {
    let username = null;
    const payload = {
      // Example of a payload structure
      name: null
    };
    const error = await t.throwsAsync(() => got.put(`http://localhost:8080/company/${username}`, {
      json: payload,
      responseType: 'json'
    }));
  
    t.is(error.response.statusCode, 400);
    t.is(error.response.body.message, 'Invalid body');
  });