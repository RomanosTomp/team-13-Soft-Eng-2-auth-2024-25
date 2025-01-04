// Constructor function for creating a response payload
var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

// Function to create a ResponsePayload object
// Takes an HTTP status code and a payload as arguments
exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

// Helper function to determine the appropriate HTTP status code
// - If the second argument is an integer, it takes precedence as the status code
// - Otherwise, if the first argument is an integer, it is used as the status code
// - Defaults to 200 (OK) if neither is an integer
function determineCode(arg1, arg2) {
  if (Number.isInteger(arg2)) {
    return arg2;
  }
  if (Number.isInteger(arg1)) {
    return arg1;
  }
  return 200; // Default code
}

// Helper function to process the payload
// - Converts objects to a JSON string (with indentation for readability)
// - Returns other data types as-is
function processPayload(arg1) {
  return typeof arg1 === 'object' ? JSON.stringify(arg1, null, 2) : arg1;
}

// Main function to write a JSON response
// - Handles various input formats, including ResponsePayload objects
exports.writeJson = function(response, arg1, arg2) {
  if (arg1 instanceof ResponsePayload) {
    exports.writeJson(response, arg1.payload, arg1.code);
    return;
  }

  // Determine the HTTP status code using the helper function
  const code = determineCode(arg1, arg2);
  //Process the payload (convert to JSON if necessary)
  const payload = processPayload(arg1);

  // Set the response headers with the determined status code and JSON content type
  response.writeHead(code, { 'Content-Type': 'application/json' });
  //Send the payload as the response body
  response.end(payload);
}

