'use strict';

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