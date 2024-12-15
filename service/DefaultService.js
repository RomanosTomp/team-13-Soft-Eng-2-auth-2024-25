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

    const requiredKeys = ['date', 'product', 'price', 'company', 'userID'];
    const isValid = requiredKeys.every(key => body.hasOwnProperty(key) && body[key] !== '');
    
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
 * Create a new user account
 * FR1 - User must be able to register as Citizen or Company 
 *
 * body User_body User model
 * returns user_body
 **/
exports.createUser = function(body) {
  return new Promise(function(resolve, reject) {
    
    const requiredKeys = ['username', 'password', 'userType', 'userID', 'email'];
    const isValid = requiredKeys.every(key => body.hasOwnProperty(key) && body[key] !== '');

    if (!isValid) {
      const error = new Error('Invalid user data');
      reject(error); 
    } 
    else {
      resolve(body);
    }
  });
};



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
 * Edit company's profile
 * FR11 - Company must be able to enter and edit its data 
 *
 * body Company_username_body Company model
 * username String The username
 * returns company_username_body
 **/
exports.editCompany = function (body, username) {
  return new Promise(function (resolve, reject) {
    const isValidUsername = typeof username === 'string' && username.length > 0;

    if (isValidUsername) {
      const isValidBody =
        body &&
        "price" in body &&
        "logo" in body &&
        "location" in body &&
        "menu" in body &&
        "username" in body &&
        body.username === username;

      if (isValidBody) {
        // Return the exact payload to reflect successful data update
        resolve({
          price: body.price,
          logo: body.logo,
          location: body.location,
          menu: body.menu,
          username: body.username
        });
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
 * Get company's profile
 * FR6 - User must be able to view company's details 
 *
 * username String The username
 * returns inline_response_200
 **/
exports.getCompany = function(username, query = {}) {
  return new Promise(function(resolve, reject) {
    const isValid = typeof username === 'string' && username.length > 0;

    if (isValid) {
      resolve({
        price: 0.8008281904610115,
        logo: {},
        location: 'location',
        menu: {},
        username: query.username || username
      });
    } else {
      const error = new Error('Invalid username');
      error.statusCode = 400;
      reject(error);
    }
  });
};


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
	  const required = ['email', 'password'];
	  const isValid = required.every(key => body.hasOwnProperty(key) && body[key] !== '');

	  if(!isValid) {
		  const error = new Error('Missing email or password');
	  	  reject(error);
	  } else {
		  resolve({ message: 'Login successful' });
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
  	const required = ['email'];
	const isValid = required.every(key => body.hasOwnProperty(key) && body[key] !== '');

	if(!isValid) {
		const error = new Error('Missing email');
		reject(error);
	} else {
		const { email } = body;

		const data = {
		  email: email,
		  password: "password123"
		};
		
		resolve(data);
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
exports.searchCompanies = function (username) {
  return new Promise(function (resolve, reject) {
    if (!username || typeof username !== 'string' || username.trim() === '') {
      const error = new Error('Invalid username'); // Updated error message
      error.statusCode = 400;
      console.error('Service rejected: Invalid username');
      reject(error);
      return;
    }

    const examples = {
      'application/json': [
        {
          price: 0.8,
          logo: { url: 'logo.png' },
          location: 'New York',
          menu: { items: ['Coffee', 'Bagel'] },
          username: 'validCompany',
        },
      ],
    };

    const result = examples['application/json'].filter(
      (company) => company.username === username
    );

    console.log('Service result:', result); // Log filtered result
    resolve(result);
  });
};










