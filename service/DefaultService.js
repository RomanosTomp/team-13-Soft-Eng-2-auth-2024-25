'use strict';


/**
 * Add an expense
 * FR8 - Citizen must be able to add an expense 
 *
 * body Expense_body Expense model
 * returns expense_body
 **/
exports.addExpense = function(body) {
  return new Promise(function(resolve, reject) {
    console.log('addExpense called with:', body);//debugging
    // Check if all required fields are present
    if (body.product && body.price && body.company && body.userID && body.date) {
      // If data is valid, return a valid example (resolve)
      const example = {
        "date": body.date,
        "product": body.product,
        "price": body.price,
        "company": body.company,
        "userID": body.userID
      };
      resolve(example);  // Resolve with valid data
    } else {
      console.log('Invalid expense data',body);//debugging
      // If any required field is missing, reject the promise
      const error = new Error('Invalid expense data');
      reject(error);  // Reject with an error
    }
  });
};



/**
 * Create a new user account
 * FR1 - User must be able to register as Citizen or Company 
 *
 * body User_body User model
 * returns user_body
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "password" : "password",
  "userType" : 6,
  "userID" : 0,
  "email" : "email",
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edit citizen's profile
 * FR7 - Citizen must be able to manage his personal data 
 *
 * body Citizen_username_body Citizen model
 * username String The username
 * returns citizen_username_body
 **/
exports.editCitizen = function(body,username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "areaOfResidence" : "areaOfResidence",
  "age" : 0,
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Edit company's profile
 * FR11 - Company must be able to enter and edit its data 
 *
 * body Company_username_body Company model
 * username String The username
 * returns company_username_body
 **/
exports.editCompany = function(body,username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "price" : 0.8008281904610115,
  "logo" : { },
  "location" : "location",
  "menu" : { },
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get citizen's profile
 * FR7 - Citizen must be able to manage his personal data 
 *
 * username String The username
 * returns inline_response_200_1
 **/
exports.getCitizen = function(username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "areaOfResidence" : "areaOfResidence",
  "age" : 0,
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
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
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get company's profile
 * FR6 - User must be able to view company's details 
 *
 * username String The username
 * returns inline_response_200
 **/
exports.getCompany = function(username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "price" : 0.8008281904610115,
  "logo" : { },
  "location" : "location",
  "menu" : { },
  "username" : "username"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
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
 
exports.getStatistics = function() {
  return new Promise(function(resolve) {
    var examples = {};
    examples['application/json'] = {
      "statisticsfile": "U3RfdzffwG2DFFOJScxc="
      };
      if (Object.keys(examples).length > 0) {
        resolve(examples[Object.keys(examples)[0]]);
      } else {
        resolve();
      }
    });
}

/**
 * Logs user into the system
 * FR2 - User must be able to login with email and password 
 *
 * body User_login_body_1  (optional)
 * returns inline_response_400
 **/
exports.loginUser = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "code" : 0,
  "message" : "message"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieves user's password
 * FR3 - User must be able to retrieve his/her/its password 
 *
 * body User_retrieve_body_1  (optional)
 * returns inline_response_400
 **/
exports.retrievePassword = function(body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "code" : 0,
  "message" : "message"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Search companies by name
 * FR5 - User must be able to search for companies by name 
 *
 * username String The name of the company
 * returns List
 **/
exports.searchCompanies = function(username) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "price" : 0.8008281904610115,
  "logo" : { },
  "location" : "location",
  "menu" : { },
  "username" : "username"
}, {
  "price" : 0.8008281904610115,
  "logo" : { },
  "location" : "location",
  "menu" : { },
  "username" : "username"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

