'use strict';

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
    const isValid = requiredKeys.every(key => (key in body) && body[key] !== '');

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
 * Logs user into the system
 * FR2 - User must be able to login with email and password 
 *
 * body User_login_body_1  (optional)
 * returns inline_response_400
 **/
exports.loginUser = function(body) {
  return new Promise(function(resolve, reject) {
    const required = ['email', 'password'];
    const isValid = required.every(key => (key in body) && body[key] !== '');

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
    const isValid = required.every(key => (key in body) && body[key] !== '');

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