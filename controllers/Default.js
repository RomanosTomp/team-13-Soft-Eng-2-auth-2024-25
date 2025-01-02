'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.addExpense = function addExpense(req, res, next, body) {
  void req;
  void next;

  Default.addExpense(body)
    .then(response => {
      console.log('Expense added successfully');
      utils.writeJson(res, response);
    })
    .catch(error => {
      console.error(`Error in addExpense: ${error.message}`);
      utils.writeJson(res, { message: error.message }, 400);
    });
};

module.exports.createUser = function createUser (req, res, next, body) {
  void req;
  void next;

  Default.createUser(body)
    .then(function (response) {
      console.log('Account created successfully');
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error in createUser: ${error.message}');
      utils.writeJson(res, { message: error.message }, 400);
    });
};

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

module.exports.getCitizen = function getCitizen(req, res, next, username) {
  void req;
  void next;

  Default.getCitizen(username)
    .then(response => {
      utils.writeJson(res, response);
    })
    .catch(error => {
      console.error(`Error in getCitizen: ${error.message}`);
      const statusCode = error.statusCode || 400;
      utils.writeJson(res, { message: error.message || 'Invalid request' }, statusCode);
    });
};

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


module.exports.loginUser = function loginUser (req, res, next, body) {
  void req;
  void next;

  Default.loginUser(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error in loginUser: ${error.message}');
      utils.writeJson(res, { message: error.message }, 400);
    });
};

module.exports.retrievePassword = function retrievePassword (req, res, next, body) {
  void req;
  void next;

  Default.retrievePassword(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (error) {
      console.error('Error in retrievePassword: ${error.message}');
      utils.writeJson(res, { message: error.message }, 400);
    });
};

module.exports.searchCompanies = function searchCompanies(req, res, next) {
  void req;
  void next;

  const username = req.query.username;
  console.log('Received query:', username); // Already added
  exports
    .searchCompanies(username)
    .then((response) => {
      console.log('Service response:', response);
      res.status(200).json(response); // Ensure the correct structure is being sent
    })
    .catch((error) => {
      console.error(`Error in searchCompanies: ${error.message}`);
      console.log('Error stack trace:', error.stack); // Log stack trace for debugging
      res.status(error.statusCode || 500).json({ message: error.message });
    });
};


