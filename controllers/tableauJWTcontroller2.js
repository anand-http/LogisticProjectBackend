const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

// Generate a UUID
const uuid = uuidv4();
const issuer = "a2b16d1f-d3a4-4781-81fc-561e7263e0b3";
const K_ID = 'cd162890-6d85-4352-ad53-4e065ba76e14';
const subEmail = 'mohit.panwar@dtdc.com';
const signature1 = process.env.TABLEAU_CONNECTED_APP_SECRET;
const scopeArray= ["tableau:views:embed","tableau:metrics:embed"];


const handleTableauJWT = (req, res) => {

    const secretKey = signature1; // Replace with your actual secret key

    // Custom header
    const customHeader = {
      alg: 'HS256', // The hashing algorithm used
      typ: 'JWT',   // The type of token (JWT)
      iss: issuer,
      kid: K_ID
    };

    // Payload (claims)
    const payload = {
      sub: subEmail,
      aud: 'tableau',
      jti: uuid,
      iss: issuer,
      scp: scopeArray,
      exp: Math.floor(Date.now() / 1000) + (5 * 60), // Token expires in 5 mins
    };

    // Combine header and payload, and create the signature
    const token = jwt.sign(payload, secretKey, { header: customHeader });
    console.log('Generated JWT:', token);    
    // Send authorization roles and access token to user
    res.json({ token });
    return token;    
}


function returnTableauJWT() {

  const secretKey = signature1; // Replace with your actual secret key

  // Custom header
  const customHeader = {
    alg: 'HS256', // The hashing algorithm used
    typ: 'JWT',   // The type of token (JWT)
    iss: issuer,
    kid: K_ID
  };

  // Payload (claims)
  const payload = {
    sub: subEmail,
    aud: 'tableau',
    jti: uuid,
    iss: issuer,
    scp: scopeArray,
    exp: Math.floor(Date.now() / 1000) + (5 * 60), // Token expires in 5 mins
  };

  // Combine header and payload, and create the signature
  const token = jwt.sign(payload, secretKey, { header: customHeader });
  
  return token;    
}

module.exports = { handleTableauJWT, returnTableauJWT };