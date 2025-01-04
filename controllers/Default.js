//Import requiered modules and utils
'use strict';
//Utils for Json response and service containing logic
var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

//Add a new expense
module.exports.addExpense = function addExpense(req, res, next, body) {
  // Supress unused parameters
  void req;
  void next;

  //Call the service to add the expense
  Default.addExpense(body)
    .then(response => {
      console.log('Expense added successfully');
      utils.writeJson(res, response); // Send success response
    })
    .catch(error => {
      console.error(`Error in addExpense: ${error.message}`);
      utils.writeJson(res, { message: error.message }, 400);// Send error response
    });
};

//Creae a new user account
module.exports.createUser = function createUser (req, res, next, body) {
  void req;
  void next;

  Default.createUser(body)
    .then(function (response) {
      console.log('Account created successfully');
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error in createUser: ${error.message}'); // Incorrect string interpolation
      utils.writeJson(res, { message: error.message }, 400);
    });
};

//Edits the citizen information
module.exports.editCitizen = function editCitizen (req, res, next, body, username) {
  void req;
  void next;

  Default.editCitizen(body, username)
    .then(response => {
      utils.writeJson(res, response);
    })
    .catch(error => {
      console.error(`Error in editCitizen: ${error.message}`);
      utils.writeJson(res, { message: error.message }, 400);
    });
};

//Edit the company information
module.exports.editCompany = function editCompany (req, res, next, body, username) {
  void req;
  void next;

  Default.editCompany(body, username)
    .then(response => {
      utils.writeJson(res, response);
    })
    .catch(error => {
      console.error(`Error in editCompany: ${error.message}`);
      utils.writeJson(res, { message: error.message }, 400);
    });
};

//retrieves a citizen by username
module.exports.getCitizen = function getCitizen(req, res, next, username) {
  void req;
  void next;

  Default.getCitizen(username)
    .then(response => {
      utils.writeJson(res, response);
    })
    .catch(error => {
      console.error(`Error in getCitizen: ${error.message}`);
      const statusCode = error.statusCode || 400; //Default to status code 400 if not provided
      utils.writeJson(res, { message: error.message || 'Invalid request' }, statusCode);
    });
};

//Retrieves citizens by age and area
module.exports.getCitizens = function getCitizens (req, res, next, age, area) {
  void req;
  void next;

  Default.getCitizens(age, area)
    .then(response => {
      utils.writeJson(res, response);
    })
    .catch(error => {
      console.error(`Error in getCitizens: ${error.message}`);
      utils.writeJson(res, { message: error.message }, 400);
    });
};

//Retrieves the company information by username
module.exports.getCompany = function getCompany(req, res, next, username) {
  void req;
  void next;

  Default.getCompany(username)
    .then(response => {
      utils.writeJson(res, response);
    })
    .catch(error => {
      console.error(`Error in getCompany: ${error.message}`);
      const statusCode = error.statusCode || 400;
      utils.writeJson(res, { message: error.message || 'Invalid request' }, statusCode);
    });
};

//Retrieves the expenses based on User ID, date and company
module.exports.getExpense = function getExpense(req, res, next, userID, date, company) {
  void req;
  void next;

  Default.getExpense(userID, date, company)
    .then(response => {
      utils.writeJson(res, response);
    })
    .catch(error => {
      console.error(`Error in getExpense: ${error.message}`);
      utils.writeJson(res, { message: error.message }, 400);
    });
};

//Handles the login of a user
module.exports.loginUser = function loginUser (req, res, next, body) {
  void req;
  void next;

  Default.loginUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error in loginUser: ${error.message}');// Incorrect string interpolation
      utils.writeJson(res, { message: error.message }, 400);
    });
};

//Retrieves the password of a user
module.exports.retrievePassword = function retrievePassword (req, res, next, body) {
  void req;
  void next;

  Default.retrievePassword(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error in retrievePassword: ${error.message}'); // Incorrect string interpolation
      utils.writeJson(res, { message: error.message }, 400);
    });
};

//Searches for companies by username
module.exports.searchCompanies = function searchCompanies(req, res, next) {
  void req;
  void next;

  const username = req.query.username;//Extract query parameter from request
  console.log('Received query:', username); // Debugging log
  exports
    .searchCompanies(username)
    .then((response) => {
      console.log('Service response:', response);//Debugging log for response
      res.status(200).json(response); // Send response with status code 200
    })
    .catch((error) => {
      console.error(`Error in searchCompanies: ${error.message}`);
      console.log('Error stack trace:', error.stack); // Debugging log for error stack 
      res.status(error.statusCode || 500).json({ message: error.message }); // Send error response with status code 500
    });
};


