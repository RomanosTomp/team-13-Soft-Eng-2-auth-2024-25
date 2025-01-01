var ResponsePayload = function(code, payload) {
  this.code = code;
  this.payload = payload;
}

exports.respondWithCode = function(code, payload) {
  return new ResponsePayload(code, payload);
}

function determineCode(arg1, arg2) {
  if (Number.isInteger(arg2)) {
    return arg2;
  }
  if (Number.isInteger(arg1)) {
    return arg1;
  }
  return 200; // Default code
}

function processPayload(arg1) {
  return typeof arg1 === 'object' ? JSON.stringify(arg1, null, 2) : arg1;
}

exports.writeJson = function(response, arg1, arg2) {
  if (arg1 instanceof ResponsePayload) {
    exports.writeJson(response, arg1.payload, arg1.code);
    return;
  }

  const code = determineCode(arg1, arg2);
  const payload = processPayload(arg1);

  response.writeHead(code, { 'Content-Type': 'application/json' });
  response.end(payload);
}

