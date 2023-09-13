const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid');

// Generate a UUID
const uuid = uuidv4();
const K_ID = "0b9b5827-da80-4063-b607-e7df7c2e92d1";
const issuer = '56817405-96b4-46f5-a540-b5f0771b98bd';
const subEmail = 'mohit.panwar@dtdc.com';
const signature1 = process.env.TABLEAU_CONNECTED_APP_SECRET;
const scopeArray= ["tableau:views:embed","tableau:metrics:embed"];




  const generateToken = async () => {
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

    jwt.verify(token, secretKey, function(err, decoded) {
      console.log
      if (err) {
        console.log(err);
      }
    });
    
    
    console.log('Generated JWT:', token);
    return token;
  };

  

  const getTableauJWT = async (req, res) => {
    const tableauJWT =  generateToken();
    res.json(tableauJWT);
}
  
module.exports = {getTableauJWT};

