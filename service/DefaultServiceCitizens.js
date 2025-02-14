'use strict';

/**
 * Edit citizen's profile
 * FR7 - Citizen must be able to manage his personal data 
 *
 * body Citizen_username_body Citizen model
 * username String The username
 * returns citizen_username_body
 **/
exports.editCitizen = function(body, username) {
    return new Promise(function(resolve, reject) {
      var examples = {};
      examples['application/json'] = {
        "areaOfResidence": "areaOfResidence",
        "age": 0,
        "username": "username"
      };
  
      const isValidUsername = (typeof username === 'string' || username instanceof String) && username.length > 0;
  
      if (isValidUsername) {
        const isValidBody = body && "areaOfResidence" in body && "age" in body && "username" in body;
  
        if (isValidBody) {
          // Return the modified example based on the body for realistic responses
          examples['application/json'] = {
            "areaOfResidence": body.areaOfResidence,
            "age": body.age,
            "username": body.username
          };
          resolve(examples[Object.keys(examples)[0]]);
        } else {
          const error = new Error('Invalid body');
          error.statusCode = 400; // Attach proper status code
          reject(error);
        }
      } else {
        const error = new Error('Invalid username');
        error.statusCode = 400; // Attach proper status code
        reject(error);
      }
    });
  };

  /**
 * Get citizen's profile
 * FR7 - Citizen must be able to manage his personal data 
 *
 * username String The username
 * returns inline_response_200_1
 **/
exports.getCitizen = function(username, query = {}) {
    return new Promise(function(resolve, reject) {
      const isValid = typeof username === 'string' && username.length > 0;
  
      if (isValid) {
        resolve({
          areaOfResidence: query.area || 'Unknown',
          age: query.age || 0,
          username
        });
      } else {
        const error = new Error('Invalid username');
        error.statusCode = 400;
        reject(error);
      }
    });
  };

  /**
 * Add an expense
 * FR8 - Citizen must be able to add an expense 
 *
 * body Expense_body Expense model
 * returns expense_body
 **/
exports.addExpense = function(body) {
  return new Promise(function(resolve, reject) {

    const requiredKeys = ['date', 'product', 'price', 'company', 'userID'];
    const isValid = requiredKeys.every(key => (key in body) && body[key] !== '');

    if (!isValid) {
      const error = new Error('Invalid expense data');
      reject(error);
    }
    else{
      resolve(body);
    }
  });
}

/**
 * Get citizens userID based on demographic paramters
 * FR13 - System must be able to calculate statistics 
 *
 * age String Age of citizen users
 * area String Area of residence of citizen users
 * returns List
 **/
exports.getCitizens = function(age,area) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
      "areaOfResidence" : "areaOfResidence",
      "age" : 0,
      "username" : "username"
    }, {
      "areaOfResidence" : "areaOfResidence",
      "age" : 0,
      "username" : "username"
    } ];
    const isValid = age != null || (typeof area == 'string' && area.length > 0);
    if (isValid) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      const error = new Error('Invalid inputs');
      reject(error);
    }
  });
}

/**
 * Get expense based either on userID, company, date or all of the above
 * FR9   - Citizen must be able to see his/her/its expenses history FR10  - View Citizen Statistics FR13  - System must be able to calculate statistics 
 *
 * userID Integer ID of the user who added the expense (optional)
 * date String Date of expense (optional)
 * company String Company's name of expense (optional)
 * returns List
 **/
exports.getExpense = function(userID,date,company) {
  return new Promise(function(resolve, reject) {
    if (userID || date || company) {
      var examples = {};
      examples['application/json'] = [ {
        "date" : "20/03/2001",
        "product" : "Grinder",
        "price" : 6.027456183070403,
        "company" : "Kushal's Coffee Shop",
        "userID" : 0
      }, {
        "date" : "21/03/2001",
        "product" : "Tea bags",
        "price" : 7.027456183070403,
        "company" : "Kushal's Coffee Shop",
        "userID" : 1
      } ];
      resolve(examples['application/json']);
    }else {
      reject(new Error('Invalid expense query parameters'));
    }
  });
}