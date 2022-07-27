// https://www.geeksforgeeks.org/node-js-password-hashing-crypto-module/
// 

import crypto,{ randomUUID } from 'crypto';

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
 const genRandomString = function(length){
  return crypto.randomBytes(Math.ceil(length/2))
          .toString('hex') /** convert to hexadecimal format */
          .slice(0,length);   /** return required number of characters */
};


const PASSWORD_LENGTH = 256;
const SALT_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = "sha256";
const BYTE_TO_STRING_ENCODING = "hex"; // this could be base64, for instance

// let salt = crypto.randomBytes(16).toString('hex'); //32 len

export function generateHashPassword(password,salt){
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
}

export function verifyPassword(passhash,pass,salt){
  const hash = crypto.pbkdf2Sync(pass, salt, 1000, 64, `sha512`).toString(`hex`);
  return hash === passhash
}

//const pass1 = generateHashPassword("TEST123",salt)
//console.log(pass1)
//const hashpass1 = "4779aedddd8037b0bfceed83295f812712a5e7d06e20ce0925d4539c7687db598072810143d09e77aacebe0ac7629e59c49d5a33930d8172dcba74c205476b2d"

//const isPass = verifyPassword(hashpass1,"TEST125",salt);
//console.log("isPass")
//console.log(isPass)

//JSON WEB TOKEN SIGN KEY

const toBase64 = obj => {
  // converts the obj to a string
  const str = JSON.stringify(obj);
  // returns string converted to base64
  return Buffer.from(str).toString('base64');
};

const replaceSpecialChars = b64string => {
  // create a regex to match any of the characters =,+ or / and replace them with their // substitutes
  return b64string.replace (/[=+/]/g, charToBeReplaced => {
    switch (charToBeReplaced) {
      case '=':
        return '';
      case '+':
        return '-';
      case '/':
        return '_';
    }
  });
};

const createSignature =(jwtB64Header,jwtB64Payload,secret)=>{
  // create a HMAC(hash based message authentication code) using sha256 hashing alg
  let siginature = crypto.createHmac('sha256', secret);

  // use the update method to hash a string formed from our jwtB64Header a period and 
  //jwtB64Payload 
  siginature.update(jwtB64Header + '.' + jwtB64Payload);

  //signature needs to be converted to base64 to make it usable
  siginature = siginature.digest('base64');

  //of course we need to clean the base64 string of URL special characters
  siginature = replaceSpecialChars(siginature);
  return siginature
}

export function createJWT(payLoad, secret, options){
  //HEADER TYPE object to json to base64
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const b64Header = toBase64 (header);
  const jwtB64Header = replaceSpecialChars(b64Header);
  //PAYLOAD object to json to base64
  const b64Payload = toBase64 (payLoad);
  const jwtB64Payload = replaceSpecialChars (b64Payload);
  //console.log ("the payload is: ",jwtB64Payload);
  // CREATE SIGN KEY
  const signature = createSignature(jwtB64Header,jwtB64Payload,secret);
  //console.log ("the signature is: ",signature);
  //we now combine the results of the header,payload and signatue
  const jsonWebToken = jwtB64Header + '.' + jwtB64Payload + '.' + signature;
  //console.log ("the JWT is :",jsonWebToken);
  return jsonWebToken;
}

export function verifyJWT(jwtoken, secret, options){
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };
  const b64Header = toBase64 (header);
  const jwtB64Header = replaceSpecialChars(b64Header);

  const sPayload = jwtoken.split('.')[1];
  const signaturePart = jwtoken.split('.')[2];
  let payload=Buffer.from(sPayload, 'base64').toString('ascii')
  //console.log(payload)
  payload = JSON.parse(payload)
  //console.log("payload")
  //console.log(payload)

  const b64Payload = toBase64(payload);
  const jwtB64Payload = replaceSpecialChars(b64Payload);

  const signature = createSignature(jwtB64Header,jwtB64Payload,secret);

  if(signature === signaturePart){
    console.log("FOUND")
  }else{
    console.log("NOT FOUND")
  }
}

export function JWTtoObj(jwtoken){
  const sPayload = jwtoken.split('.')[1];
  let payload=Buffer.from(sPayload, 'base64').toString('ascii')
  return JSON.parse(payload);
}



//const payload = {
  //iss: 'a_random_server_name',//information about the server that issued the token
  //exp: 872990,// tokens expiry date in milliseconds
  // information about some random user
  //name: 'John Doe',
  //email: 'myemail@test.com',
  //isHuman: true,
//};

//verifyJWT(testtoken, secret)


/*
const header = {
  alg: 'HS256',
  typ: 'JWT',
};
const b64Header = toBase64 (header);
const jwtB64Header = replaceSpecialChars(b64Header);

const payload = {
  iss: 'a_random_server_name',//information about the server that issued the token
  exp: 872990,// tokens expiry date in milliseconds
  // information about some random user
  name: 'John Bobo',
  email: 'myemail@test.com',
  isHuman: true,
};
*/
// converts payload to base64
/*
const b64Payload = toBase64 (payload);
const jwtB64Payload = replaceSpecialChars (b64Payload);
console.log ("the payload is: ",jwtB64Payload);

const secret = 'super_secret_society';
const signature= createSignature(jwtB64Header,jwtB64Payload,secret);
console.log ("the signature is: ",signature);

//we now combine the results of the header,payload and signatue
const jsonWebToken = jwtB64Header + '.' + jwtB64Payload + '.' + signature;
console.log ("the JWT is :",jsonWebToken);
*/

// https://stackoverflow.com/questions/14218925/how-can-i-decrypt-a-hmac
// https://github.com/nginx/njs/issues/390
// https://stackoverflow.com/questions/54062583/how-to-verify-a-signed-jwt-with-subtlecrypto-of-the-web-crypto-api
/*
// key and iv   
var key = crypto.createHash("sha256").update("OMGCAT!", "ascii").digest();
var iv = "1234567890123456";

// this is the string we want to encrypt/decrypt
var secret = "ermagherd";

console.log("Initial: %s", secret);

// create a aes256 cipher based on our password
var cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
// update the cipher with our secret string
cipher.update(secret, "ascii");
// save the encryption as base64-encoded
var encrypted = cipher.final("base64");

console.log("Encrypted: %s", encrypted);

// create a aes267 decipher based on our password
var decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);
// update the decipher with our encrypted string
decipher.update(encrypted, "base64");

console.log("Decrypted: %s", decipher.final("ascii"));
*/
