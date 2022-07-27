https://nodejs.org/api/crypto.html

https://stackoverflow.com/questions/17201450/salt-and-hash-password-in-nodejs-w-crypto

https://blog.logrocket.com/node-js-crypto-module-a-tutorial/

https://stackoverflow.com/questions/71867281/how-to-properly-encrypt-passwords-in-nodejs


```js
import crypto,{ randomUUID } from 'crypto';
console.log(randomUUID())
```

```js
import crypto,{ randomUUID } from 'crypto';
const PASSWORD_LENGTH = 256;
const SALT_LENGTH = 64;
const ITERATIONS = 10000;
const DIGEST = "sha256";
const BYTE_TO_STRING_ENCODING = "hex"; // this could be base64, for instance

function generateHashPassword(password,salt){
  return new Promise((accept, reject) => {
    crypto.pbkdf2(password, salt, ITERATIONS, PASSWORD_LENGTH, DIGEST,
      (error, hash) => {
        if (error) {
          console.log("error")
          console.log(error)
          return reject(error);
        }
        console.log(hash.toString('hex'))
        accept(hash.toString('hex'))
      });
  })
}

function verifyPassword(passhash,pass,salt){
  return new Promise((accept, reject) => {
    crypto.pbkdf2(pass, salt, ITERATIONS, PASSWORD_LENGTH, DIGEST,
      (error, hash) => {
        if (error) {
          console.log("error")
          console.log(error)
          return reject(error);
        }
        console.log(hash.toString('hex'))
        //accept(passhash === hash.toString('hex'))
        if(passhash === hash.toString('hex')){
          accept(true)
        }else{
          accept(false)
        }
      });
  })
}

const hash0 = await generateHashPassword("test",salt)
console.log(hash0)

const checkhash = await verifyPassword(hash0,"test",salt)
console.log("checkhash");
console.log(checkhash);

```




https://stackoverflow.com/questions/19822643/what-is-an-alternative-for-bcrypt-to-use-with-node



```js
const password = "12345"
let salt = crypto.randomBytes(16).toString('hex');
salt = "a14ed661ea0aff8ca8fece973d7a6a50"
console.log("salt")
console.log(salt)
let passhash = crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
passhash = "d966522939ba2c9a43a6da3a0a59fa78a1c2f6542dede5e285d15a8642ffd17dbdc927cdfae333e60703924d50800b41026b6d1a757686373de439945774e23c"
console.log("passhash")
console.log(passhash)

//passhash = ""

const password2 = "12341"
const hashv = crypto.pbkdf2Sync(password2, salt, 1000, 64, `sha512`).toString(`hex`);
console.log("hashv")
console.log(hashv)
if(hashv === passhash){
  console.log("PASS")
}else{
  console.log("FAIL")
}
```